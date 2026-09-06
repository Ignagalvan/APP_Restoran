param(
    [ValidateRange(1, 65535)]
    [int]$Port = 9749,

    [ValidateRange(5, 120)]
    [int]$StartupTimeoutSeconds = 30,

    [switch]$SkipBrowser
)

$ErrorActionPreference = 'Stop'
$uiUrl = "http://localhost:$Port"
$probeUrl = "http://127.0.0.1:$Port/api/ui-config"

function Show-LauncherError {
    param([string]$Message)

    try {
        Add-Type -AssemblyName System.Windows.Forms
        [void][System.Windows.Forms.MessageBox]::Show(
            $Message,
            'Restaurant OS - Code Graph',
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Error
        )
    }
    catch {
        Write-Error $Message
    }
}

function Test-CodebaseMemoryUi {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri $probeUrl -TimeoutSec 2
        if ($response.StatusCode -ne 200) {
            return $false
        }

        $config = $response.Content | ConvertFrom-Json
        return [string]$config.upstream_issues_url -like '*DeusData/codebase-memory-mcp*'
    }
    catch {
        return $false
    }
}

function Test-LocalPort {
    $client = New-Object System.Net.Sockets.TcpClient
    try {
        $connection = $client.BeginConnect('127.0.0.1', $Port, $null, $null)
        if (-not $connection.AsyncWaitHandle.WaitOne(500)) {
            return $false
        }
        $client.EndConnect($connection)
        return $true
    }
    catch {
        return $false
    }
    finally {
        $client.Close()
    }
}

function Open-CodeGraph {
    if (-not $SkipBrowser) {
        Start-Process $uiUrl
    }
}

if (Test-CodebaseMemoryUi) {
    Open-CodeGraph
    exit 0
}

if (Test-LocalPort) {
    Show-LauncherError "El puerto $Port está ocupado por otro proceso. No se inició Codebase Memory ni se cerró ningún proceso."
    exit 2
}

$configuredAllowedRoot = $env:CBM_ALLOWED_ROOT
if (-not $configuredAllowedRoot) {
    $configuredAllowedRoot = [Environment]::GetEnvironmentVariable('CBM_ALLOWED_ROOT', 'User')
}
if (-not $configuredAllowedRoot) {
    $configuredAllowedRoot = [Environment]::GetEnvironmentVariable('CBM_ALLOWED_ROOT', 'Machine')
}
if (-not $configuredAllowedRoot -or -not (Test-Path -LiteralPath $configuredAllowedRoot -PathType Container)) {
    Show-LauncherError 'Configurá CBM_ALLOWED_ROOT con una raíz autorizada existente antes de iniciar Codebase Memory.'
    exit 7
}
$env:CBM_ALLOWED_ROOT = (Resolve-Path -LiteralPath $configuredAllowedRoot).Path

$command = Get-Command 'codebase-memory-mcp' -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $command) {
    Show-LauncherError 'Codebase Memory no está instalado o no está disponible en PATH. El launcher no instalará ni modificará la herramienta.'
    exit 3
}

try {
    if ($command.Source.EndsWith('.ps1', [System.StringComparison]::OrdinalIgnoreCase)) {
        $server = Start-Process -FilePath 'powershell.exe' -ArgumentList @(
            '-NoProfile',
            '-ExecutionPolicy', 'Bypass',
            '-File', ('"{0}"' -f $command.Source),
            '--ui=true',
            "--port=$Port"
        ) -WindowStyle Hidden -PassThru
    }
    elseif ($command.Source.EndsWith('.cmd', [System.StringComparison]::OrdinalIgnoreCase) -or
            $command.Source.EndsWith('.bat', [System.StringComparison]::OrdinalIgnoreCase)) {
        $arguments = '/d /s /c ""{0}" --ui=true --port={1}"' -f $command.Source, $Port
        $server = Start-Process -FilePath $env:ComSpec -ArgumentList $arguments -WindowStyle Hidden -PassThru
    }
    else {
        $server = Start-Process -FilePath $command.Source -ArgumentList @('--ui=true', "--port=$Port") -WindowStyle Hidden -PassThru
    }
}
catch {
    Show-LauncherError "No se pudo iniciar Codebase Memory: $($_.Exception.Message)"
    exit 4
}

$deadline = [DateTime]::UtcNow.AddSeconds($StartupTimeoutSeconds)
while ([DateTime]::UtcNow -lt $deadline) {
    if (Test-CodebaseMemoryUi) {
        Open-CodeGraph
        exit 0
    }

    if ($server.HasExited) {
        Show-LauncherError "Codebase Memory terminó antes de habilitar la UI (código $($server.ExitCode))."
        exit 5
    }

    Start-Sleep -Milliseconds 500
}

if (Test-LocalPort) {
    Show-LauncherError "El puerto $Port quedó ocupado, pero no responde como Codebase Memory. No se cerró ningún proceso."
}
else {
    Show-LauncherError "Codebase Memory no habilitó $uiUrl dentro de $StartupTimeoutSeconds segundos."
}
exit 6
