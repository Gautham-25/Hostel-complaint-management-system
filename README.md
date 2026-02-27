# 🏠 HostelCMS — Complaint Management System

A full-stack web application that allows students to submit hostel complaints and admins to manage and resolve them. Built with **Node.js**, **React.js**, and **MongoDB**.

---

## 📌 Features

### Student
- Register and log in securely
- Submit complaints with category, room number, and description
- Track complaint status in real time (Open / In Progress / Resolved)
- View admin remarks and resolution notes
- See full complaint history

### Admin
- Separate secure admin login
- View all student complaints on a dashboard
- Filter complaints by status (Open, In Progress, Resolved)
- Update complaint status and add resolution remarks
- Delete resolved or invalid complaints
- Stats overview (total, open, in progress, resolved)

---

## 🛠️ Tech Stack

Layer -> Technology 
Frontend -> React.js, Vite
Backend -> Node.js, Express.js 
Database -> MongoDB, Mongoose 

---

## 📁 Project Structure

```
hostel-cms/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js                  
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx                 
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚙️ Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hostel-cms.git
cd hostel-cms
```

### 2. Start MongoDB

- **Windows:** Open Services → Start "MongoDB Server"
- **Mac:** `brew services start mongodb-community`

### 3. Start the Backend

Open a terminal and run:

```bash
cd backend
npm install
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

### 4. Start the Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Open your browser at: **http://localhost:3000**

---






