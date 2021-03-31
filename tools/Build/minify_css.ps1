Param(    
    [string]$source, [string]$destination  
)

$libPath = $PSScriptRoot + "\lib\Yahoo.Yui.Compressor.dll"  
[Reflection.Assembly]::LoadFile($libPath)  
      
$target = $source + "common.css";
$files = get-childitem $target -recurse -force -include *.css
foreach($file in $files){   
    $content = [IO.File]::ReadAllText($file.FullName)  
    $cssCompressor = New-Object -TypeName Yahoo.Yui.Compressor.CssCompressor  
    $compressedContent = $cssCompressor.Compress($content)  
    $result = $destination + $file.Name
    #Set-ItemProperty $result -name IsReadOnly -value $false
    Write-Host "Minifyed css: " $result
    [IO.File]::WriteAllText($result, $compressedContent)  
}  
          