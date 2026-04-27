@echo off
title Adaptive Design - Dev Server
cd /d "%~dp0"

echo ============================================
echo   Adaptive Design - Development Server
echo ============================================
echo.

:: Check for node_modules
if not exist "node_modules" (
    echo Installing dependencies...
    if exist "package-lock.json" (
        call npm ci
    ) else (
        call npm install
    )
    if errorlevel 1 (
        echo ERROR: dependency installation failed.
        pause
        exit /b 1
    )
    echo.
)

echo Starting Vite dev server...
echo Press Ctrl+C to stop.
echo.
call npm run dev
