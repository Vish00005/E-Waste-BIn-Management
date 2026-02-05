# ♻️ E-Waste Management System

A web-based **E-Waste Management System** designed to promote responsible electronic waste disposal by enabling efficient collection, monitoring, and management of e-waste through a centralized platform.

---

## 📌 Problem Statement
Electronic waste (e-waste) is one of the fastest-growing waste streams, causing serious environmental and health hazards. Lack of proper monitoring and management leads to inefficient collection and recycling.

This system aims to **digitize e-waste bin management** and **simplify the collection process**.

---

## 🎯 Objectives
- Promote safe and responsible e-waste disposal
- Enable centralized monitoring of e-waste bins
- Improve efficiency in collection and recycling
- Create awareness about e-waste management

---

## 🚀 Features
- 📊 Admin/Dashboard view
- 🗑️ E-waste bin tracking (manual or future IoT-based)
- 👤 User signup & authentication
- 📝 Waste submission records
- 📍 Location-based bin information (future scope)
- 📦 Database-backed storage using MongoDB

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS (Embedded JavaScript Templates)

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Tools
- Git & GitHub
- VS Code
- Nodemon

---

## 📂 Project Structure

```text
HAXplore/
│
├── assets/
│   ├── css/
│   ├── js/
│   ├── about.jpg
│   ├── bg.jpeg
│   ├── member2.jpeg
│   ├── Vishal.jpeg
│   ├── vraj.jpeg
│   └── wastes-570x570.jpeg
│
├── Backened/
│   ├── controller/
│   │   ├── user.js
│   │   └── web.js
│   │
│   ├── models/
│   │   ├── binModel.js
│   │   ├── recycledItemsModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── webRoutes.js
│   │
│   ├── utils/
│   │   ├── isAuthenticated.js
│   │   └── sendOtp.js
│   │
│   ├── cloudConfig.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── Frontened/
│   ├── about.ejs
│   ├── dashboard.ejs
│   ├── find-bin.ejs
│   ├── footer.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── navbar.ejs
│   ├── otp.ejs
│   ├── recycle.ejs
│   ├── rewards.ejs
│   └── scan.ejs
│
├── .env
├── .gitignore
└── README.md
```
## Authentication Flow
	•	User registers or logs in
	•	Passwords are securely hashed using bcrypt
	•	User session is maintained using HTTP-only cookies
	•	Protected routes use isAuthenticated middleware
	•	OTP verification supported via sendOtp.js

⸻

##  Core Modules
```text
👤 User Management
	•	Signup & Login
	•	Secure password hashing
	•	Session-based authentication
	•	OTP verification (email-based)

♻️ Recycling Records
	•	Track recycled items per user
	•	Store recycling history in MongoDB
	•	Display data on dashboard

🗑️ Bin Management
	•	Display available bins (location-based support)
```