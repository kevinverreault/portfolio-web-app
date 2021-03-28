$outputPath = "D:\code\portfolio-web\build\output\src"
Write-Host "Cleaning: " $outputPath
Remove-Item $outputPath -Recurse
Copy-Item -Path "D:\code\portfolio-web\src" -Recurse -Destination "D:\code\portfolio-web\build\output" -Container -Exclude "common.js","common.css", "portfolio.code-workspace"
.\minify_css.ps1 -source "D:\code\portfolio-web\src\css\" -destination "D:\code\portfolio-web\build\output\src\css\"
.\minify_js.ps1 -source "D:\code\portfolio-web\src\scripts\" -destination "D:\code\portfolio-web\build\output\src\scripts\"
#$index = $outputPath + "\index-min.html"
#Rename-Item $index "index.html"

Write-Host "Output ready"