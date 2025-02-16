# 🏗️ Rock Royalty Calculation Web App

🚀 **Developed for the Geological Survey and Mines Bureau (GSMB) of Sri Lanka**, this application automates the calculation of royalties for metal quarry operations. It streamlines the process by computing royalties based on explosive quantities, powder factor, and applicable taxes.

---

## 🌟 Project Overview

This web-based system consists of a **Next.js** frontend and a **Flask** backend, providing users with an intuitive interface to enter quarry data, perform calculations dynamically, and generate reports.

### 🎯 Key Benefits
✔️ **Automated Royalty Calculation** – No manual errors!  
✔️ **Tax & Compliance Handling** – SSCL & VAT included  
✔️ **User-Friendly Interface** – Easy inputs & instant results  
✔️ **Downloadable Reports** – PDF & Excel export support  

---

## 🛠️ Tech Stack

### 🔹 Frontend (Next.js)
- React-based modern UI
- Tailwind CSS / Material UI for styling
- Axios for API requests

### 🔹 Backend (Flask)
- Flask-RESTful for API endpoints
- Flask-CORS for frontend-backend communication
- Optional: SQLite/PostgreSQL for data storage

---

## 📌 Features

### 🔢 User Input Form (Frontend - Next.js)
Users can enter:  
✅ **Water Gel (kg)**  
✅ **NH₄NO₃ (kg)**  
✅ **Powder Factor (PF)**  

### 🧮 Backend Calculation (Flask API)
- **Total Explosive Quantity (TEQ):**
  - TEQ = (WaterGel × 1.2) + NH₄NO₃
- **Rock Volume Calculation:**
  - Volume = TEQ / PF
  - Blasted Rock Volume = (TEQ × 1.6) / (PF × 2.83)
- **Royalty Calculation:**
  - Royalty = Volume × LKR 240
- **Tax Application:**
  - SSCL (2.56%): Royalty × 1.0256
  - VAT (18%): Total × 1.18

### 📡 API Response (JSON Format)
The backend returns calculations in JSON format:
```json
{
  "teq": 100,
  "volume": 200,
  "blasted_volume": 320,
  "royalty": 48000,
  "royalty_with_sscl": 49228.8,
  "total_with_vat": 58090.78
}
```

### 📊 Results Display (Frontend - Next.js)
- 💡 **Real-time calculations** displayed instantly  
- 📥 **Download reports** in PDF/Excel format  
- 🏗️ **History feature** to store previous calculations  

---

## ⚙️ Installation & Setup

### 🖥️ Backend (Flask)
```sh
git clone https://github.com/your-repo/rock-royalty-backend.git
cd rock-royalty-backend
pip install -r requirements.txt
python app.py
```

### 🖥️ Frontend (Next.js)
```sh
git clone https://github.com/your-repo/rock-royalty-frontend.git
cd rock-royalty-frontend
npm install
npm run dev
```

---

## 🚀 Next Steps & Enhancements
🔹 Implement authentication & user roles (admin/staff)  
🔹 Enhance UI/UX with interactive elements  
🔹 Add multi-language support for wider accessibility  

### 🏛️ Developed for **GSMB Sri Lanka** to simplify and optimize royalty calculations.  
💡 **Ensuring efficiency, accuracy, and compliance!** 🎯

