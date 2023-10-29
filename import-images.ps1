
$sourceDirectory = 'C:\Users\Kevin\Pictures\JPEG\Autre\siteweb'
$destinationDirectory = ".\image-sources"
$localPublicPath = ".\portfolio-app\public\images"

if (Test-Path $destinationDirectory) {
  Remove-Item -Path $destinationDirectory -Recurse -Force
}

New-Item -ItemType Directory -Path $destinationDirectory

Copy-Item -Path "$sourceDirectory\*" -Destination $destinationDirectory -Recurse

Start-Process "node" -ArgumentList ".\deployment\dist\metadata.js" -NoNewWindow -Wait
Start-Process "node" -ArgumentList ".\exif-utility\src\exif-overwrite.js" -NoNewWindow -Wait

if (Test-Path $localPublicPath) {
  Remove-Item -Path $localPublicPath -Recurse -Force
}

New-Item -ItemType Directory -Path $localPublicPath

Copy-Item -Path "$destinationDirectory\*" -Destination $localPublicPath -Recurse
