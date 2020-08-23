Param(    
[Parameter(Mandatory=$true)]    
[string]$folder  
 )    
  
$libPathEcma = $PSScriptRoot + "\lib\EcmaScript.NET.dll"  
$libPathCompressor = $PSScriptRoot + "\lib\Yahoo.Yui.Compressor.dll"  
  
[Reflection.Assembly]::LoadFile($libPathEcma)  
[Reflection.Assembly]::LoadFile($libPathCompressor)  
  
$target = $PSScriptRoot + "\output\";
$files = get-childitem $folder -recurse -force -include *.js    
foreach($file in $files){   
   $content = [IO.File]::ReadAllText($file.FullName)  
   $cssCompressor = New-Object -TypeName Yahoo.Yui.Compressor.JavaScriptCompressor  
   $compressedContent = $cssCompressor.Compress($content)
   $result = $target + $file.Name
   Write-Host $result
   #Set-ItemProperty $file.FullName -name IsReadOnly -value $false  
   [IO.File]::WriteAllText($result,$compressedContent)  
}  