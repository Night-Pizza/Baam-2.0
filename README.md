Baam 2.0: Next-Gen Attendance Management System
# Baam 2.0: Next-Gen Attendance Management System

**Baam 2.0** is an advanced, multi-factor attendance tracking platform designed for higher education institutions. It moves beyond traditional methods by integrating AI-driven verification, geofencing, and hardware-level security to ensure academic integrity.

---

## 🚀 Key Features

### 🛡️ Multi-Factor Verification (MFV)
Professors can dynamically toggle security layers for each session:
* **Dynamic QR Scanning:** Secure, time-limited QR codes for instant student check-in.
* **AI Face Recognition:** Real-time identity verification using computer vision to prevent "proxy" attendance.
* **Geofencing & Location Tracking:** Cross-references GPS data to ensure the student is physically present in the designated classroom.
* **Hardware ID Verification:** Validates device MAC addresses to lock attendance to a single, authorized student device.

### 👨‍🏫 Administrative Powerhouse
* **Granular Controls:** Comprehensive suite to manage classrooms, courses, and recurring sessions.
* **Dynamic Security Levels:** Choose which verification methods (QR, Face ID, Geo, MAC) to apply per class.
* **Advanced Analytics:** Detailed attendance reports with export options (CSV, PDF, Excel) and visual data representation.

### 📱 User-Centric Interface
* **Student Dashboard:** Seamless, one-tap check-in experience with a clean, responsive web interface.
* **Professor Portal:** Functional management interface for real-time monitoring and historical data analysis.

---

## 🛠 Tech Stack

* **Backend:** Java 21, Spring Boot 3+, Spring Security (OAuth2/JWT).
* **Database:** PostgreSQL (Relational data & Attendance logs).
* **Frontend:** React, TypeScript, Vite.
* **AI/ML:** Face recognition integration for identity validation.
* **DevOps:** Docker & Docker Compose for orchestrated deployment, GitHub Actions for CI/CD.
