import pandas as pd
import numpy as np
import os

# Configuration
OUTPUT_FILE = r"..\data\behavior_logs.csv"
NUM_SAMPLES = 5000

def generate_synthetic_data():
    """Generates synthetic normal behavior data for ZTADS training."""
    np.random.seed(42)
    
    print(f"[INFO] Generating {NUM_SAMPLES} synthetic records...")
    
    # 1. Login Hour (Normal users work between 9 AM - 6 PM, with some variance)
    # Using a truncated normal distribution centered around 14 (2 PM)
    login_hours = np.random.normal(loc=14, scale=4, size=NUM_SAMPLES).astype(int)
    login_hours = np.clip(login_hours, 0, 23)
    
    # 2. Session Duration (Minutes)
    # Normal sessions are 15-60 mins
    durations = np.random.normal(loc=30, scale=15, size=NUM_SAMPLES)
    durations = np.abs(durations)  # No negative time
    
    # 3. Request Frequency (Requests per minute)
    # Normal usage: 10-50 req/min
    req_freq = np.random.normal(loc=25, scale=10, size=NUM_SAMPLES)
    req_freq = np.abs(req_freq)
    
    # 4. Failed Login Count
    # Mostly 0, rarely 1 or 2
    failed_logins = np.random.choice([0, 1, 2, 3], size=NUM_SAMPLES, p=[0.9, 0.07, 0.02, 0.01])
    
    # 5. Packet Size Avg (Bytes)
    # HTTP packets usually 500-1500 bytes
    packet_size = np.random.normal(loc=800, scale=200, size=NUM_SAMPLES)
    packet_size = np.clip(packet_size, 100, 3000)
    
    # 6. Bytes Transferred (MB)
    # Normal: 1-50 MB
    bytes_transferred = np.random.exponential(scale=10, size=NUM_SAMPLES)
    
    # 7. Port Number
    # Mostly 443 (HTTPS), 80 (HTTP), 22 (SSH)
    ports = np.random.choice([443, 80, 22, 8080], size=NUM_SAMPLES, p=[0.7, 0.2, 0.05, 0.05])
    
    # 8. Protocol Encoded (0: TCP, 1: UDP)
    # Mostly TCP for web
    protocols = np.random.choice([0, 1], size=NUM_SAMPLES, p=[0.9, 0.1])
    
    # 9. Device Trust Score (0-100)
    # Normal devices have high trust (70-100)
    trust_scores = np.random.normal(loc=90, scale=10, size=NUM_SAMPLES)
    trust_scores = np.clip(trust_scores, 0, 100)
    
    # Create DataFrame
    df = pd.DataFrame({
        'login_hour': login_hours,
        'session_duration': durations,
        'request_frequency': req_freq,
        'failed_login_count': failed_logins,
        'packet_size_avg': packet_size,
        'bytes_transferred': bytes_transferred,
        'port_number': ports,
        'protocol_encoded': protocols,
        'device_trust_score': trust_scores
    })
    
    # Ensure dataframe is properly formatted
    df = df.round(2)
    
    # Save to CSV
    if not os.path.exists("../data"):
        os.makedirs("../data")
        
    df.to_csv(OUTPUT_FILE, index=False)
    print(f"[SUCCESS] Synthetic data saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_synthetic_data()
