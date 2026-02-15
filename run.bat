@echo off
setlocal enabledelayedexpansion

echo Looking for DatingSim Ultra installer...
for /f "tokens=*" %%A in ('dir /b /s "release\*.exe" 2^>nul') do (
    set "exe_path=%%A"
    goto :found
)

echo Error: No .exe found in release folder. Run build.bat first.
exit /b 1

:found
echo Found: !exe_path!
echo Launching...
"!exe_path!"
