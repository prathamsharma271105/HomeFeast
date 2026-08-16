@echo off
echo ===================================================
echo 🚀 HomeFeast Instant GitHub & Vercel Deploy Sync
echo ===================================================
echo.
echo [1/3] Adding modified and new files...
"C:\Program Files\Git\cmd\git.exe" add .

echo [2/3] Creating commit...
"C:\Program Files\Git\cmd\git.exe" commit -m "update: sync latest HomeFeast updates and fixes"

echo [3/3] Pushing to GitHub (Auto-triggering Vercel deployment)...
"C:\Program Files\Git\cmd\git.exe" push origin main

echo.
echo ===================================================
echo ✨ Sync complete! Vercel is now building the latest changes live.
echo Check live site: https://home-feast-coral.vercel.app/
echo ===================================================
pause
