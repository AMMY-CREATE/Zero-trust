# Unified Zero-Trust Behavioral Anomaly Detection System (ZTADS)

## Project Overview
ZTADS utilizes unsupervised machine learning (**Isolation Forest**) to continuously monitor and detect anomalous behavior across users, devices, and network patterns. Adhering to Zero-Trust principles ("Never Trust, Always Verify"), it flags deviations from established baselines without relying on labeled attack signatures.

## Directory Structure
```
ZTADS/
├── data/               # Contains behavior_logs.csv (Synthetic Training Data)
├── model/              # Stores the trained unified_iforest.pkl and scaler
├── src/
│   ├── preprocess.py   # Data cleaning and standardization
│   ├── train_model.py  # Model training pipeline
│   ├── detect_behavior.py # Inference and Risk Scoring engine
│   └── generate_data.py # Synthetic data generator
├── requirements.txt    # Python dependencies
└── README.md
```

## Setup & Usage

### 1. Prerequisites
Ensure Python 3.9+ is installed. Install dependencies:
```bash
pip install -r requirements.txt
```

### 2. Generate Data & Train Model
To create the baseline normal behavior and train the Isolation Forest:
```bash
cd src
python generate_data.py  # Generates data/behavior_logs.csv
python train_model.py    # Trains model and saves to model/unified_iforest.pkl
```

### 3. Real-Time Detection
To test the inference engine:
```bash
python detect_behavior.py
```

## Risk Scoring Logic
The model outputs a raw anomaly score which is converted to a **0-100 Risk Score**:
-   **0-20 (Low Risk):** Normal behavior consistent with baseline.
-   **20-80 (Medium Risk):** Slight deviations (e.g., new device, unusual work hours).
-   **80-100 (Critical Risk):** Strong anomalies (e.g., brute force, massive data exfiltration at 3 AM).

## Model Details
-   **Algorithm:** Isolation Forest (Ensemble Learning).
-   **Features:** Login Hour, Session Duration, Request Freq, Failed Logins, Packet Size, Bytes Transferred, Port, Protocol, Trust Score.
-   **Preprocessing:** StandardScaler (Zero mean, unit variance).
