## Clear current version (if it exists)
if (Test-Path -Path core-tools) {
    Remove-Item `
        -Path core-tools `
        -Force `
        -Recurse
}

## Download nuget.exe
$sourceNugetExe = "https://dist.nuget.org/win-x86-commandline/latest/nuget.exe"
$targetNugetExe = ".\nuget.exe"
Invoke-WebRequest `
    -Uri $sourceNugetExe `
    -OutFile $targetNugetExe
Set-Alias `
    -Name nuget `
    -Value $targetNugetExe

## Download CoreTools
nuget install Microsoft.CrmSdk.CoreTools -O temp
New-Item `
    -Name core-tools `
    -ItemType Directory
$coreToolsFolder = Get-ChildItem .\temp | Where-Object {$_.Name -match 'Microsoft.CrmSdk.CoreTools.'}
Move-Item `
    -Path .\temp\$coreToolsFolder\content\bin\coretools\*.* `
    -Destination .\core-tools
Remove-Item `
    -Path temp `
    -Force `
    -Recurse

Remove-Item `
    -Path .\nuget.exe `
    -Force