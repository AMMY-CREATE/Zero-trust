import pandas as pd
import numpy as np
import joblib
import os
import preprocess

# Configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "model", "unified_iforest.pkl")

class ZTADSDetector:
    def __init__(self):
        self.model = None
        self.load_model()
        
    def load_model(self):
        """Loads the trained Isolation Forest model."""
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model not found at {MODEL_PATH}. Train it first.")
        self.model = joblib.load(MODEL_PATH)
        print(f"[INFO] ZTADS Model loaded from {MODEL_PATH}")

    def calculate_risk_score(self, anomaly_score):
        """
        Converts Isolation Forest decision function score to a 0-100 Risk Score.
        
        Logic:
        - decision_function < 0 : Anomaly (High Risk)
        - decision_function > 0 : Normal (Low Risk)
        
        Mapping:
        - We want low (negative) scores to be High Risk (~100).
        - We want high (positive) scores to be Low Risk (~0).
        - Typical range is roughly -0.5 to 0.5.
        """
        # Invert score: lower decision score = higher risk
        # Approx range of decision_function is [-0.5, 0.5] usually.
        # Let's shift and scale.
        
        # 1. Invert: (So anomalies are positive)
        # raw score: -0.2 (Anomaly) -> inverted: 0.2
        # raw score: 0.2 (Normal) -> inverted: -0.2
        inverted_score = -anomaly_score
        
        # 2. Scale to 0-100
        # Sigmoid-like transformation or linear scaling
        # Let's use a linear scaler assuming range [-0.5, 0.5] roughly covering most points
        # Risk = (inverted_score + 0.5) * 100
        # If score is -0.5 (Strong Anomaly) -> (-(-0.5) + 0.5) * 50 = (1.0) * X... wait.
        
        # Simpler approach:
        # Score 0 is threshold. 
        # Deep anomaly (-0.3) -> High Risk.
        # Normal (0.3) -> Low Risk.
        
        # Linear map:
        # 0.2 -> 0 Risk
        # 0.0 -> 50 Risk
        # -0.2 -> 100 Risk
        
        # Risk = 50 - (score * 250) ? 
        # 0.2 * 250 = 50 -> 50-50 = 0.
        # 0.0 -> 50.
        # -0.2 * 250 = -50 -> 50 - (-50) = 100.
        
        risk = 50 - (anomaly_score * 250)
        risk = np.clip(risk, 0, 100)
        return float(risk)

    def predict(self, input_data):
        """
        Predicts anomaly and risk score for input data.
        
        Args:
            input_data (dict or list): Feature dictionary or list matches training features.
            
        Returns:
            dict: Prediction results.
        """
        # Convert dict to df if necessary
        if isinstance(input_data, dict):
            df = pd.DataFrame([input_data])
        else:
            # Assume it matches feature order
            keys = [
                'login_hour', 'session_duration', 'request_frequency', 
                'failed_login_count', 'packet_size_avg', 'bytes_transferred', 
                'port_number', 'protocol_encoded', 'device_trust_score'
            ]
            df = pd.DataFrame([input_data], columns=keys)
            
        # Preprocess (Scaling)
        X_scaled = preprocess.preprocess_data(df, is_training=False)
        
        # Predict Label (1: Normal, -1: Anomaly)
        label = self.model.predict(X_scaled)[0]
        
        # Get Anomaly Score (decision function)
        score = self.model.decision_function(X_scaled)[0]
        
        # Calculate Risk Score
        risk_score = self.calculate_risk_score(score)
        
        # Interpretation
        status = "NORMAL" if label == 1 else "ANOMALY_DETECTED"
        if risk_score > 80: status = "CRITICAL_THREAT"
        
        return {
            "status": status,
            "anomaly_label": int(label),
            "raw_score": round(score, 4),
            "risk_score": round(risk_score, 2)
        }

if __name__ == "__main__":
    # Test Inference
    detector = ZTADSDetector()
    
    # Test Case 1: Normal Behavior
    normal_event = {
        'login_hour': 14,
        'session_duration': 30,
        'request_frequency': 25,
        'failed_login_count': 0,
        'packet_size_avg': 800,
        'bytes_transferred': 10,
        'port_number': 443,
        'protocol_encoded': 0,
        'device_trust_score': 95
    }
    
    # Test Case 2: Anomaly (Late night, high failed logins, plain HTTP)
    anomaly_event = {
        'login_hour': 3,            # 3 AM
        'session_duration': 5,
        'request_frequency': 100,   # High freq
        'failed_login_count': 5,    # Brute force?
        'packet_size_avg': 200,
        'bytes_transferred': 100,   # High data
        'port_number': 80,
        'protocol_encoded': 0,
        'device_trust_score': 20    # Untrusted device
    }
    
    print("\n--- Inference Test ---")
    res_normal = detector.predict(normal_event)
    print(f"Normal Event: {res_normal}")
    
    res_anomaly = detector.predict(anomaly_event)
    print(f"Anomaly Event: {res_anomaly}")
