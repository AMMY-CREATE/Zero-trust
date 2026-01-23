import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import joblib
import os
import preprocess

# Configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "behavior_logs.csv")
MODEL_PATH = os.path.join(BASE_DIR, "model", "unified_iforest.pkl")

def train_model():
    """Trains the Isolation Forest model on normal behavior data."""
    print("="*40)
    print(" ZTADS MODEL TRAINING PIPELINE")
    print("="*40)
    
    # 1. Load Data
    try:
        df = preprocess.load_data(DATA_PATH)
    except FileNotFoundError as e:
        print(f"[ERROR] {e}")
        return

    # 2. Preprocess Data (Scaling)
    print("[INFO] Preprocessing and scaling data...")
    X_train = preprocess.preprocess_data(df, is_training=True)
    
    # 3. Initialize Isolation Forest
    # n_estimators: More trees = more robust
    # contamination: 'auto' lets the model decide threshold, or we can use small value if we assume clean data
    # random_state: For reproducibility
    print("[INFO] Initializing Isolation Forest...")
    model = IsolationForest(
        n_estimators=100, 
        max_samples='auto', 
        contamination='auto', 
        random_state=42,
        verbose=0
    )
    
    # 4. Train Model
    print(f"[INFO] Training model on {X_train.shape[0]} records...")
    model.fit(X_train)
    
    # 5. Save Model
    if not os.path.exists(os.path.dirname(MODEL_PATH)):
        os.makedirs(os.path.dirname(MODEL_PATH))
        
    joblib.dump(model, MODEL_PATH)
    print(f"[SUCCESS] Model saved to {MODEL_PATH}")
    
    # 6. Basic Evaluation (Sanity Check)
    # Predict on training data - should be mostly 1 (Normal)
    preds = model.predict(X_train)
    normal_count = np.sum(preds == 1)
    anomaly_count = np.sum(preds == -1)
    print(f"[EVAL] Training Data Predictions -> Normal: {normal_count}, Anomalies: {anomaly_count}")

if __name__ == "__main__":
    train_model()
