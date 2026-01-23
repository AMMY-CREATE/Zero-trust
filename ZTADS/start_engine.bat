@echo off
echo ==========================================
echo    ZTADS Engine Startup Script
echo ==========================================

cd /d "%~dp0"

echo [1/3] Checking dependencies...
pip install -r requirements.txt

echo [2/3] Checking for trained model...
if not exist "model/isolation_forest_model.joblib" (
    echo [!] Model not found. Training model now...
    python src/train_model.py
) else (
    echo [OK] Model found.
)

echo [3/3] Starting ZTADS API Engine...
python src/api.py

pause
