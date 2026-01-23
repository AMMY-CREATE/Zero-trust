from flask import Flask, request, jsonify
from flask_cors import CORS
from detect_behavior import ZTADSDetector
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize Detector
try:
    detector = ZTADSDetector()
    print("[API] Model loaded successfully.")
except Exception as e:
    print(f"[API] Error loading model: {e}")
    detector = None

@app.route('/api/scan', methods=['POST'])
def scan_behavior():
    """
    Endpoint to scan behavior data.
    Expected JSON: { 'login_hour': 14, ... }
    """
    if not detector:
        return jsonify({"error": "Model not loaded"}), 500
    
    try:
        data = request.json
        print(f"[API] Received scan request: {data}")
        
        # Run prediction
        result = detector.predict(data)
        
        return jsonify(result)
    except Exception as e:
        print(f"[API] Error during prediction: {e}")
        return jsonify({"error": str(e)}), 400

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"status": "ZTADS Engine Running", "model_loaded": detector is not None})

if __name__ == '__main__':
    print("[API] Starting Flask Server on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)
