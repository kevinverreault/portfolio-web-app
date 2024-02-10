$dir = ".\portfolio-app\resources"
$images = Get-ChildItem $dir

foreach ($img in $images) {
  $outputName = ".\portfolio-app\public" + "\" + $img.BaseName + ".webp"

  cwebp -q 75 -m 6 -af -f 50 -sharpness 0 -mt -v -progress $img.FullName -o $outputName
}