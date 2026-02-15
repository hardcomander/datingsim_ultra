@echo off
echo Building DatingSim Ultra...
call npm run desktop:build
if %errorlevel% equ 0 (
    echo Build complete! Executable is in the release folder.
) else (
    echo Build failed!
    exit /b 1
)
