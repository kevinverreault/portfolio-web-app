Param(    
    [string]$source, [string]$destination  
)

$libPathEcma = $PSScriptRoot + "\lib\EcmaScript.NET.dll"  
$libPathCompressor = $PSScriptRoot + "\lib\Yahoo.Yui.Compressor.dll"  
  
[Reflection.Assembly]::LoadFile($libPathEcma)  
[Reflection.Assembly]::LoadFile($libPathCompressor)  
  
$target = $source + "common.js";
$files = get-childitem $target -recurse -force -include *.js    
foreach($file in $files){   
   $content = [IO.File]::ReadAllText($file.FullName)  
   $cssCompressor = New-Object -TypeName Yahoo.Yui.Compressor.JavaScriptCompressor  
   $compressedContent = $cssCompressor.Compress($content)
   $result = $destination + $file.Name
   Write-Host "Minified js: " $result
   #Set-ItemProperty $file.FullName -name IsReadOnly -value $false  
   [IO.File]::WriteAllText($result, $compressedContent)  
}  