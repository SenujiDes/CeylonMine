🛠️ Complaint Web Page Of CeylonMine Web App

Developed for the Geological Survey and Mines Bureau (GSMB) of Sri Lanka, this web-based solution simplifies complaint submissions and tracking for quarry operations. It allows users to report concerns, track complaint progress, and ensures timely resolutions by authorities.

🌟 Project Overview

This platform combines a Next.js frontend and a Flask backend, providing an intuitive interface for users to submit complaints, monitor responses, and download reports for reference.

🛠️ Key Benefits

✔️ Seamless Complaint Submission – Simple & user-friendly form✔️ Real-Time Tracking – Users can monitor complaint status✔️ Admin Dashboard – Staff can review & address complaints✔️ Downloadable Reports – PDF & Excel support✔️ Notifications – Email/SMS updates on status changes

🛠️ Tech Stack

🔹 Frontend (Next.js)

React-based modern UI

Tailwind CSS / Material UI for styling

Axios for API requests

🔹 Backend (Flask)

Flask-RESTful for API endpoints

Flask-CORS for frontend-backend communication

Optional: SQLite/PostgreSQL for data storage

📀 Features

🛠️ Complaint Submission (Frontend - Next.js)

Users can report issues related to:

Environmental concerns

License and compliance violations

Operational hazards

General quarry operation issues

Users must provide:
✅ Complaint Category✅ Description of the Issue✅ Attachments (if any, e.g., images, documents)✅ Contact Information

📊 Complaint Tracking & Resolution

User Dashboard to check complaint progress.

Admin Panel to review, assign, and resolve complaints.

Status Updates: Pending, Under Review, Resolved.

Notifications via email/SMS on status changes.

💡 API Response Example (JSON Format)

{
  "complaint_id": "CMP2024001",
  "status": "Under Review",
  "submitted_on": "2025-03-03",
  "last_updated": "2025-03-04",
  "resolution_notes": "Inspection scheduled for 2025-03-05"
}

📈 Results Display & Reports (Frontend - Next.js)

✅ Users can track complaint status in real-time✅ Admin panel for monitoring & managing cases✅ Download reports (PDF/Excel format)✅ Search & filter past complaints

🚀 Installation & Setup

🖥️ Backend (Flask)

git clone(https://github.com/SenujiDes/CeylonMine/tree/MinsandiDeSilva/complainPage_backend)
cd complaint-management-backend
pip install -r requirements.txt
python app.py

🖥️ Frontend (Next.js)

git clone (https://github.com/SenujiDes/CeylonMine/tree/MinsandiDeSilva/complainPage_frontend)
cd complaint-management-frontend
npm install
npm run dev

🚶 Next Steps & Enhancements

🔹 Implement authentication & user roles (admin/staff)🔹 Enhance UI/UX with interactive elements🔹 Add multi-language support for wider accessibility🔹 AI-powered analysis for complaint trends

🏢 Developed for GSMB Sri Lanka to ensure transparency and efficiency in complaint resolution.

💡 Empowering users with accountability and action! 🚀
