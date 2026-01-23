import pandas as pd
from detect_behavior import ZTADSDetector

def run_tests():
    print("="*60)
    print(" ZTADS MODEL VERIFICATION SUITE")
    print("="*60)
    
    detector = ZTADSDetector()
    
    # Define Test Scenarios
    scenarios = [
        {
            "name": "Normal User (Day Shift)",
            "description": "Standard login at 2 PM, HTTPS, trusted device.",
            "data": {
                'login_hour': 14,
                'session_duration': 45,
                'request_frequency': 30,
                'failed_login_count': 0,
                'packet_size_avg': 850,
                'bytes_transferred': 15,
                'port_number': 443,
                'protocol_encoded': 0,      # TCP
                'device_trust_score': 95
            }
        },
        {
            "name": "Brute Force Attack",
            "description": "High frequency requests, multiple failed logins, untrusted device.",
            "data": {
                'login_hour': 10,
                'session_duration': 5,
                'request_frequency': 120,   # ANOMALY
                'failed_login_count': 15,   # ANOMALY
                'packet_size_avg': 100,
                'bytes_transferred': 2,
                'port_number': 80,
                'protocol_encoded': 0,
                'device_trust_score': 10    # ANOMALY
            }
        },
        {
            "name": "Data Exfiltration (Midnight)",
            "description": "3 AM login, massive data transfer, unusual port.",
            "data": {
                'login_hour': 3,            # ANOMALY
                'session_duration': 120,    # Long session
                'request_frequency': 40,
                'failed_login_count': 0,
                'packet_size_avg': 2500,    # Large packets
                'bytes_transferred': 500,   # ANOMALY (500MB)
                'port_number': 8080,        # Unusual
                'protocol_encoded': 0,
                'device_trust_score': 80    # Trusted device (Insider Threat?)
            }
        },
        {
            "name": "UDP Flood (DoS Like)",
            "description": "Tiny packets, extremely high frequency, UDP protocol.",
            "data": {
                'login_hour': 15,
                'session_duration': 10,
                'request_frequency': 500,   # ANOMALY
                'failed_login_count': 0,
                'packet_size_avg': 50,      # Tiny
                'bytes_transferred': 50,
                'port_number': 53,          # DNS
                'protocol_encoded': 1,      # UDP
                'device_trust_score': 50
            }
        }
    ]
    
    # Run Scenarios
    for i, test in enumerate(scenarios, 1):
        print(f"\nTEST CASE {i}: {test['name']}")
        print(f"Context: {test['description']}")
        
        result = detector.predict(test['data'])
        
        # Formatting Output
        risk = result['risk_score']
        status = result['status']
        
        print(f"[-] Inputs: {test['data']}")
        print(f"[*] Result: Status={status} | Risk Score={risk}/100")
        
        if risk < 30:
            print(">>> VERDICT: ALLOW (Safe)")
        elif risk < 80:
             print(">>> VERDICT: FLAG (Suspicious)")
        else:
             print(">>> VERDICT: BLOCK (Critical Threat)")
        print("-" * 60)

if __name__ == "__main__":
    run_tests()
