import jsftp from 'jsftp'
import * as path from 'path'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import { hasProcessArgument, recursiveFileSearch } from './utilities.mjs'

const IMAGE_SET_SIZE = 7
const SERVER_SOURCE_DIRECTORY = './public_html'
const TEMP = '_temp'
const TO_DELETE = '_todelete'
const IMAGES_DIRECTORY = 'images'
const STATIC_DIRECTORY = 'static'
const EXCLUSIONS = ['.htaccess', '.well-known', 'cgi-bin', 'fonts', '1x', '2x', '3x', '4x', '5x', '6x', '7x', 'images', 'images_temp', 'static']

await main()

async function main() {
  try {
    dotenv.config()

    const uploadSourcesOnly = hasProcessArgument('-s')

    await uploadBuildOutput(uploadSourcesOnly)
  } catch (exception) {
    console.log(exception)
  }
}

interface FilePaths {
  source: string;
  destination: string;
}

async function uploadBuildOutput(uploadSourcesOnly: boolean) {
  const sourceFiles : FilePaths[] = []
  const images : FilePaths[] = []
  const buildRelativePath = '../portfolio-app/build'
  const buildPath = path.resolve(buildRelativePath)
  const createPaths = (filePath: string): FilePaths => ({
    source: filePath,
    destination: `${SERVER_SOURCE_DIRECTORY}${filePath
                  .replace(buildPath, '')
                  .replace(IMAGES_DIRECTORY, `${IMAGES_DIRECTORY}${TEMP}`)
                  .split('\\').join('/')}`
  })

  for await (const localFile of recursiveFileSearch(buildRelativePath)) {
    if (localFile.includes(IMAGES_DIRECTORY)) {
      images.push(createPaths(localFile))
    } else {
      sourceFiles.push(createPaths(localFile))
    }
  }

  const ftpClient = new jsftp({
    host: process.env.FTP_HOST,
    port: 21,
    user: process.env.FTP_USERNAME,
    pass: process.env.FTP_PASSWORD
  })

  ftpClient.auth(process.env.FTP_USERNAME, process.env.FTP_PASSWORD, async () => {
    try {
      if (uploadSourcesOnly) {
        await uploadSources(ftpClient, sourceFiles)
      } else {
        await stageTempDirectories(ftpClient)
        await uploadDirectory(ftpClient, images)
  
        await uploadSources(ftpClient, sourceFiles)
  
        await swapImagesDirectories(ftpClient)
        await cleanupOldImages(ftpClient)
      }
    } catch (exception) {
      console.log(`upload build output failed: ${exception}`)
    } finally {
      await quit(ftpClient)
    }
  })
}

async function uploadSources(ftpClient: jsftp, sourceFiles: FilePaths[]) {
  await cleanupSource(ftpClient)
  await uploadDirectory(ftpClient, sourceFiles)
}

async function uploadDirectory(ftpClient: jsftp, files: FilePaths[]) {
  try {
    for (const file of files) {
      await upload(ftpClient, file.source, file.destination)
    }
  } catch (exception) {
    console.log('upload directory error')
    throw exception
  }
}

async function stageTempDirectories(ftpClient: jsftp) {
  console.log('stage temp folders')

  try {
    await createDirectory(ftpClient, `${SERVER_SOURCE_DIRECTORY}/${IMAGES_DIRECTORY}${TEMP}`)
    for (let i = 1; i <= IMAGE_SET_SIZE; ++i) {
      await createDirectory(ftpClient, `${SERVER_SOURCE_DIRECTORY}/${IMAGES_DIRECTORY}${TEMP}/${i}x`)
    }
  } catch (exception){
    console.log('stage failed')
    throw exception
  }
}

async function cleanupSource(ftpClient: jsftp) {
  try {
    console.log('cleanup sources')

    await emptyDirectory(ftpClient, `${SERVER_SOURCE_DIRECTORY}/${STATIC_DIRECTORY}/js`)
    await emptyDirectory(ftpClient, `${SERVER_SOURCE_DIRECTORY}/${STATIC_DIRECTORY}/css`)
    await emptyDirectory(ftpClient, `${SERVER_SOURCE_DIRECTORY}`)
  } catch (exception) {
    console.log('cleanup sources failed')
    throw exception
  }
}

async function cleanupOldImages(ftpClient: jsftp) {
  try {
    console.log('cleanup old images')

    for (let directoryIndex = 1; directoryIndex <= IMAGE_SET_SIZE; ++directoryIndex) {
      await emptyDirectory(ftpClient, `${SERVER_SOURCE_DIRECTORY}/${IMAGES_DIRECTORY}${TO_DELETE}/${directoryIndex}x`)
      await deleteDirectory(ftpClient, `${SERVER_SOURCE_DIRECTORY}/${IMAGES_DIRECTORY}${TO_DELETE}/${directoryIndex}x`)
    }

    await emptyDirectory(ftpClient, `${SERVER_SOURCE_DIRECTORY}/${IMAGES_DIRECTORY}${TO_DELETE}`)
    await deleteDirectory(ftpClient, `${SERVER_SOURCE_DIRECTORY}/${IMAGES_DIRECTORY}${TO_DELETE}`)
  } catch (exception) {
    console.log('cleanup old images failed')
    throw exception
  }
}

async function swapImagesDirectories(ftpClient: jsftp) {
  try {
    console.log('swap images directory')

    await rename(ftpClient, `${SERVER_SOURCE_DIRECTORY}/${IMAGES_DIRECTORY}`, `${SERVER_SOURCE_DIRECTORY}/${IMAGES_DIRECTORY}${TO_DELETE}`)
    await rename(ftpClient, `${SERVER_SOURCE_DIRECTORY}/${IMAGES_DIRECTORY}${TEMP}`, `${SERVER_SOURCE_DIRECTORY}/${IMAGES_DIRECTORY}`)
  } catch (exception) {
    console.log('swap images directory failed')
    throw exception
  }
}

async function upload(ftpClient: jsftp, sourcePath: string, destinationPath: string) {
  try {
    console.log(`upload ${sourcePath} to ${destinationPath}`)

    let buffer = fs.readFileSync(sourcePath)

    await runAsyncCommand((callback) => ftpClient.put(buffer, destinationPath, callback))
  } catch (exception) {
    console.log(`upload ${sourcePath} to ${destinationPath} failed`)
    throw exception
  }
}

async function emptyDirectory(ftpClient: jsftp, directory: string) {
  try {
    console.log(`empty directory ${directory}`)

    await runCustomAsyncCommand((callbacks) => {
      ftpClient.ls(directory, async (error: Error, result: [{ name: string }]) => {
        if (error) {
          callbacks.reject(error)
          return
        }

        for (const file of result) {
          if (EXCLUSIONS.findIndex((exlusion) => exlusion === file.name) < 0) {
            await deleteFile(ftpClient, `${directory}/${file.name}`)
         }
        }
  
       callbacks.resolve()
     })
    })
  } catch (exception) {
    console.log('empty directory error: ' + directory)
    throw exception
  }
}

async function createDirectory(ftpClient: jsftp, path:string) {
  try {
    console.log(`create directory ${path}`)

    await runAsyncCommand((callback) => ftpClient.raw('mkd', path, callback))
  } catch (exception) {
    console.log(`mkdir error: ${path}, error: ${exception}`)
    throw exception
  }
}

async function deleteDirectory(ftpClient: jsftp, path:string) {
  try {
    console.log(`delete directory ${path}`)

    await runAsyncCommand((callback) => ftpClient.raw('rmd', path, callback))
  } catch (exception) {
    console.log(`rmdir error: ${path}, error: ${exception}`)
    throw exception
  }
}

async function deleteFile(ftpClient: jsftp, path: string) {
  try {
    console.log(`delete file ${path}`)
    
    await runAsyncCommand((callback) => ftpClient.raw('dele', path, callback))
  } catch (exception) {
    console.log(`delete file error: ${path}`)
    throw exception
  }
}

async function rename(ftpClient: jsftp, from: string, to:string) {
  try {
    console.log(`rename from ${from} to ${to}`)

    await runAsyncCommand((callback) => ftpClient.raw('rnfr', from, callback))
    await runAsyncCommand((callback) => ftpClient.raw('rnto', to, callback))
  } catch (exception) {
    console.log(`rename failed: ${from} to ${to}`)
    throw exception
  }
}

async function quit(ftpClient: jsftp) {
  await runCustomAsyncCommand((callbacks) => {
    ftpClient.raw('quit', (error, data) => {
      if (error) {
        callbacks.reject(error)
        return
      }
    
      callbacks.resolve()
    })
  })

  console.log('ftp connection terminated');
}

type WaitCommandCompletionCallback = (error: Error) => void
type ResolveCallback = (value: void | PromiseLike<void>) => void
type RejectCallback = (reason?: any) => void

interface PromiseCallbacks {
  resolve: ResolveCallback,
  reject: RejectCallback
}

async function runAsyncCommand(command: (callback: WaitCommandCompletionCallback) => void): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    command((error: Error) => { 
      if (error) {
        reject(error)
        return
      }

      resolve()
    })
  })
}

async function runCustomAsyncCommand(command: (callbacks: PromiseCallbacks) => void): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    command({resolve, reject})
  })
}
