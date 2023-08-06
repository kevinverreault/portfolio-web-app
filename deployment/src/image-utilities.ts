import * as path from 'path'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
import { hasProcessArgument } from './utilities.mjs'

const imagesPathRoot = '../portfolio-app/public/images/'
const exportRoot = 'C:\\Users\\Kevin\\Pictures\\JPEG\\Autre\\siteweb\\'

main()

function main() {
  dotenv.config()

  const refreshAll = hasProcessArgument('-a')

  const imagesPath = refreshAll ? path.resolve(`${imagesPathRoot}`) : path.resolve(`${imagesPathRoot}1x`)
  const exportPath = refreshAll ? `${exportRoot}` : `${exportRoot}1x`

  console.log(`refreshing folder into sources: ${imagesPath}`)

  fs.rmSync(imagesPath, { recursive: true, force: true })
  copyDirectory(exportPath, imagesPath)
  
}

function copyDirectory(source: string, destination: string) {
  fs.mkdirSync(destination, { recursive: true });
  let entries = fs.readdirSync(source, { withFileTypes: true });

  for (let entry of entries) {
    let sourcePath = path.join(source, entry.name)
    let destinationPath = path.join(destination, entry.name)

    entry.isDirectory() ?
      copyDirectory(sourcePath, destinationPath) :
      fs.copyFileSync(sourcePath, destinationPath)
  }
}