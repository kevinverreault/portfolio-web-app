import * as exif from 'exif-parser'
import * as path from 'path'
import * as fs from 'fs'
import { getFlatFileList } from './utilities'

main()

async function main() {
  try {
    const publicPath = path.resolve('../portfolio-app')
    const imagesPath = `${publicPath}\\public\\images\\1x`

    console.log(`generating metadata: ${publicPath}\\images`)

    const allImages = await getFlatFileList(imagesPath)
    const imagesMetadata = getDescriptionFromExif(imagesPath, allImages)

    console.log(`metadata.json: `)
    console.log(imagesMetadata)

    fs.writeFileSync(`${publicPath}/src/metadaja.json`, JSON.stringify(Object.fromEntries(imagesMetadata)), 'utf-8')
  } catch (exception) {
    console.log(exception)
  }
}

function getDescriptionFromExif(imagesPath: string, allImages: string[]): Map<string, string> {
  const imagesMetadata: Map<string, string> = new Map<string, string>()

  for (const image of allImages) {
    const exifdata = exif.create(fs.readFileSync(image))
    try {
      const description = exifdata.parse().tags['ImageDescription']
      if (description) {
        const imageKey = image.replace(imagesPath, '').replace('.jpg', '').replace('\\', '')
        imagesMetadata.set(imageKey, description)
      }
    } catch (error) {
      console.log(`failed to get exif for ${image}, error: ${error}`)
    }
  }

  return imagesMetadata
}