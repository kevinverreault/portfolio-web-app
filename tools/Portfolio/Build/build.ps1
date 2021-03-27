$outputPath = "D:\code\portfolio-web\build\output\src"
Write-Host "Cleaning: " $outputPath
Remove-Item $outputPath -Recurse
Copy-Item -Path "D:\code\portfolio-web\src" -Recurse -Destination "D:\code\portfolio-web\build\output" -Container -Exclude "common.js","common.css","portfolio.code-workspace"
.\minify_css.ps1 -folder "D:\code\portfolio-web\src\css\common.css"
.\minify_js.ps1 -folder "D:\code\portfolio-web\src\scripts\common.js"

Write-Host "Output ready"