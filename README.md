# Sweet Shop Management System

Welcome to the **Sweet Shop Management System**, a full-stack **MERN** web application designed to **manage and purchase sweets efficiently and delightfully**. It features an **admin dashboard** for inventory control and a **customer interface** for browsing and purchasing sweets. Backend APIs are **tested with Jest and Supertest** to ensure reliability.

---

## 📁 Project Structure

```
sweet-shop/
├── frontend/        # React-based UI
├── backend/         # Express.js + MongoDB API
└── README.md
```

---

## ⚙️ Setup Instructions

### 🧑‍💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

### 🛠️ Backend Setup

```bash
cd backend
npm install
npm start
```

Backend will run at: `http://localhost:5000`

👉 **Don't forget to create a `config.env` file inside the `backend/` folder**:

```
MONGO_URI=your_mongodb_connection_string
```

---

### 🧪 Run Backend Tests

```bash
cd backend
npm test
```

This runs backend tests using **Jest** and **Supertest**. It covers:
- Sweet routes
- CRUD operations
- Edge cases and validations

---

## ✨ Features

### 👩‍💼 Admin Inventory Dashboard
- Add, edit, delete sweets
- Filter by name, category, price range
- Sort by name/category/price
- UI powered by Material UI (MUI)

### 🛍️ Customer Buy Page
- Browse sweets with images and prices
- Adjust quantity and simulate purchase
- Live filtering and sorting
- Fully responsive with Tailwind CSS

---

## 🖼️ Screenshots


## 🧪 Backend Test Screenshot

[![Test Results](Snapshots/Tests/All%20Tests%201.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Tests/All%20Tests%201.png)
[![Test Results](Snapshots/Tests/All%20Tests%202.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Tests/All%20Tests%202.png)
[![Test Results](Snapshots/Tests/All%20Tests%203.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Tests/All%20Tests%203.png)

### Buy Sweet Page

[![Buy Page](Snapshots/Frontend%20UI/Purchase%20Page.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Frontend%20UI/Purchase%20Page.png)



### Admin Dashboard

[![Admin Dashboard](Snapshots/Frontend%20UI/Inventory%20Page.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Frontend%20UI/Inventory%20Page.png)
[![Admin Dashboard](Snapshots/Frontend%20UI/Add%20New%20Sweet%20Form.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Frontend%20UI/Add%20New%20Sweet%20Form.png)
[![Admin Dashboard](Snapshots/Frontend%20UI/Edit%20Sweet(Restock)%20Form.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Frontend%20UI/Edit%20Sweet(Restock)%20Form.png)


---


---

## 💻 Tech Stack

- **Frontend:** React, Tailwind CSS, MUI
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Testing:** Jest, Supertest

---

## 👩‍💻 Developed By

Made with ❤️ by Shreya

---
