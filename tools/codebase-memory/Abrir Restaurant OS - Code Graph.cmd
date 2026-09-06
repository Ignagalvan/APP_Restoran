@echo off
setlocal

powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0Open-CodebaseMemoryUi.ps1"
set "launcher_exit=%ERRORLEVEL%"

if not "%launcher_exit%"=="0" (
  echo.
  echo No se pudo abrir Restaurant OS - Code Graph.
  echo Revisa el mensaje mostrado por el launcher.
  pause
)

exit /b %launcher_exit%
