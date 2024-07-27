param (
    [string]$Action
)

function CreateLink {
    param (
        [string]$PublicPath,
        [string]$SourcePath
    )

    if (-not (Test-Path $PublicPath)) {
        New-Item -Path $PublicPath -ItemType SymbolicLink -Value $SourcePath
    }
}

function RemoveLink {
    param (
      [string]$PublicPath
    )

    if (Test-Path $PublicPath) {
      (Get-Item $PublicPath).Delete()
    }
}

$PublicPath = "./public/images"
$SourcePath = "../image-sources"

switch ($Action) {
    'Create' {
      CreateLink -PublicPath $PublicPath -SourcePath $SourcePath
    }
    'Remove' {
      RemoveLink -PublicPath $PublicPath
    }
    default {
        Write-Output "Invalid action. Use 'Create' or 'Remove'."
    }
}
