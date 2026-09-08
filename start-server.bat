@echo off
cd /d "%~dp0"
echo Marvel D&D - lokalny serwer
start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:8000"
where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 8000
) else (
  python -m http.server 8000
)
