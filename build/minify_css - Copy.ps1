
    $libPath = $PSScriptRoot + "\lib\Yahoo.Yui.Compressor.dll"  
    [Reflection.Assembly]::LoadFile($libPath)  
      
    $target = $PSScriptRoot + "\output\src\css\";
    $files = get-childitem "D:\code\tailwind.css" -recurse -force -include *.css
    foreach($file in $files){   
       $content = [IO.File]::ReadAllText($file.FullName)  
       $cssCompressor = New-Object -TypeName Yahoo.Yui.Compressor.CssCompressor  
       $compressedContent = $cssCompressor.Compress($content)  
       $result = $target + $file.Name
       #Set-ItemProperty $result -name IsReadOnly -value $false
       Write-Host "Minifyed css: " $result
       [IO.File]::WriteAllText($result,$compressedContent)  
    }  
          