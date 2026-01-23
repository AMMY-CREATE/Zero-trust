import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "behavior_logs.csv")
MODEL_DIR = os.path.join(BASE_DIR, "model")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")

def load_data(filepath):
    """Loads behavior logs from CSV."""
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Data file not found at {filepath}")
    
    df = pd.read_csv(filepath)
    print(f"[INFO] Loaded {len(df)} records from {filepath}")
    return df

def preprocess_data(df, is_training=True):
    """
    Preprocesses data: handles missing values and scales features.
    
    Args:
        df (pd.DataFrame): Raw data.
        is_training (bool): If True, fits and saves the scaler. If False, loads existing scaler.
        
    Returns:
        np.array: Scaled feature matrix.
    """
    # Features to use for modeling
    features = [
        'login_hour', 
        'session_duration', 
        'request_frequency', 
        'failed_login_count', 
        'packet_size_avg', 
        'bytes_transferred', 
        'port_number', 
        'protocol_encoded', 
        'device_trust_score'
    ]
    
    # Handle missing values (simple inputation)
    df_clean = df[features].fillna(0)
    
    if is_training:
        print("[INFO] Training mode: Fitting new StandardScaler...")
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(df_clean)
        
        # Save the scaler
        if not os.path.exists(MODEL_DIR):
            os.makedirs(MODEL_DIR)
        joblib.dump(scaler, SCALER_PATH)
        print(f"[INFO] Scaler saved to {SCALER_PATH}")
        
    else:
        # Load scaler for inference
        if not os.path.exists(SCALER_PATH):
            raise FileNotFoundError(f"Scaler not found at {SCALER_PATH}. Train the model first.")
            
        print("[INFO] Inference mode: Loading existing scaler...")
        scaler = joblib.load(SCALER_PATH)
        X_scaled = scaler.transform(df_clean)
        
    return X_scaled

if __name__ == "__main__":
    # Test text
    try:
        df = load_data(DATA_PATH)
        X = preprocess_data(df, is_training=True)
        print(f"[SUCCESS] Data processed. Shape: {X.shape}")
        print(f"[Sample] First row scaled: {X[0]}")
    except Exception as e:
        print(f"[ERROR] {e}")
