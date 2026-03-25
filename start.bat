@echo off
title LiveTile Design - Dev Server
cd /d "%~dp0"

echo ============================================
echo   LiveTile Design - Development Server
echo ============================================
echo.

:: Check for node_modules
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed.
        pause
        exit /b 1
    )
    echo.
)

echo Starting Vite dev server...
echo Press Ctrl+C to stop.
echo.
call npm run dev
