# Sweet Shop Management System

Welcome to the **Sweet Shop Management System**, a full-stack **MERN** web application designed to **manage and purchase sweets efficiently and delightfully**. It features an **admin dashboard** for inventory control and a **customer interface** for browsing and purchasing sweets. Backend APIs are **tested with Jest and Supertest** to ensure reliability.

---

## 📁 Project Structure

```
sweet-shop/
├── backend/                  # Backend server built with Express.js
│   ├── controllers/          # Route handler logic (e.g., business logic)
│   ├── models/               # Mongoose models (database schemas)
│   ├── node_modules/         # Backend dependencies
│   ├── routes/               # API route definitions
│   ├── tests/                # Unit/integration tests for backend
│   ├── utils/                # Utility/helper functions
│   ├── app.js                # Main app configuration file
│   ├── server.js             # Server entry point (starts the Express app)
│   ├── config.env            # Environment configuration variables
│   ├── package.json          # Backend dependencies and scripts
│   └── package-lock.json     # Lockfile for exact versions of dependencies
│
├── frontend/                 # Frontend built with React and Tailwind CSS
│   ├── node_modules/         # Frontend dependencies
│   ├── public/               # Static assets (index.html, favicon, etc.)
│   ├── src/                  # React components, pages, and logic
│   ├── .gitignore            # Ignore files for Git
│   ├── eslint.config.js      # ESLint configuration for linting code
│   ├── index.html            # HTML template for the React app
│   ├── package.json          # Frontend dependencies and scripts
│   ├── package-lock.json     # Lockfile for frontend dependencies
│   ├── postcss.config.js     # PostCSS configuration (usually used with Tailwind)
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── vite.config.js        # Vite configuration (frontend build tool)
│
├── Snapshots/                # UI and test result snapshots
│
├── package.json
├── package-lock.json
└── README.md                 # Project documentation (you are here)
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

## ✅ Test Results

| 📄 Test File                     | 🧪 Test Description                                     | ✅ Passed Tests |
|----------------------------------|---------------------------------------------------------|-----------------|
| `searchSweet.test.js`            | Search sweets by name, category, price range, filters   | 5/5             |
| `sortSweet.test.js`              | Sort sweets by name, price, category                    | 6/6             |
| `addSweet.test.js`               | Validate & add sweets (with invalid/valid data)         | 7/7             |
| `restockSweet.test.js`           | Restock inventory for a sweet                           | 5/5             |
| `purchaseSweet.test.js`          | Simulate sweet purchase and validations                 | 6/6             |
| `updateSweet.test.js`            | Update sweet details with different edge cases          | 5/5             |
| `viewAllSweets.test.js`          | Retrieve all sweets from the database                   | 2/2             |
| `getSweet.test.js`               | Fetch single sweet by ID with validations               | 3/3             |
| `deleteSweet.test.js`            | Delete sweet and handle invalid IDs                     | 3/3             |
| `healthCheck.test.js`            | Check API health route and error fallback               | 4/4             |
| `appError.test.js`               | Custom AppError handling class                          | 2/2             |

---

**🔬 Test Summary**

- **Test Suites:** `11` passed out of `11`
- **Total Tests:** `48` passed
- **Snapshots:** `0`
- **Total Time:** `28.213 s`

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

### Buy Sweet Page

[![Buy Page](Snapshots/Frontend%20UI/Purchase%20Page.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Frontend%20UI/Purchase%20Page.png)

### Admin Dashboard

[![Admin Dashboard](Snapshots/Frontend%20UI/Inventory%20Page.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Frontend%20UI/Inventory%20Page.png)
[![Admin Dashboard](Snapshots/Frontend%20UI/Add%20New%20Sweet%20Form.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Frontend%20UI/Add%20New%20Sweet%20Form.png)
[![Admin Dashboard](Snapshots/Frontend%20UI/Edit%20Sweet(Restock)%20Form.png)](https://github.com/Shreya-1305/Sweet-Shop-Management-System/blob/main/Snapshots/Frontend%20UI/Edit%20Sweet(Restock)%20Form.png)

---

## 💻 Tech Stack

- **Frontend:** React, Tailwind CSS, MUI
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Testing:** Jest, Supertest

---

## 🤖 AI Tools Used

This project was enhanced with the help of:

- [ChatGPT](https://chat.openai.com/)
- [Claude](https://claude.ai/)

---

## 👩‍💻 Developed By

Made with ❤️ by **Shreya**

---
