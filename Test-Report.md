# ✅ Test Report

## 🧪 Overview

This test report summarizes the results of automated testing for the **Sweet Shop Management System (Backend)**. The backend was thoroughly tested using unit and integration tests across all modules. The following aspects were covered:

- Endpoint functionality
- Input validation
- Error handling
- Business logic
- Test coverage (line, function, branch, and statement)

---

## ✅ Summary

| Metric                | Value    |
| --------------------- | -------- |
| **Total Test Suites** | 11       |
| **Total Tests**       | 48       |
| **Tests Passed**      | 48 ✅    |
| **Tests Failed**      | 0 ❌     |
| **Snapshots**         | 0        |
| **Test Duration**     | 25.247 s |
| **Code Coverage**     | 100% ✅  |

---

## 📂 Test Suite Breakdown

| 📄 Test File            | 🧪 Description                               | ✅ Passed |
| ----------------------- | -------------------------------------------- | --------- |
| `searchSweet.test.js`   | Search sweets by name, category, price range | 5/5       |
| `sortSweet.test.js`     | Sort sweets by name, price, and category     | 6/6       |
| `addSweet.test.js`      | Add sweet validations and creation           | 7/7       |
| `restockSweet.test.js`  | Restock inventory logic                      | 5/5       |
| `purchaseSweet.test.js` | Purchase validation and stock deduction      | 6/6       |
| `updateSweet.test.js`   | Update validations and partial updates       | 5/5       |
| `viewAllSweets.test.js` | View all sweets in DB                        | 2/2       |
| `getSweet.test.js`      | Get sweet by ID                              | 3/3       |
| `deleteSweet.test.js`   | Delete sweet by ID and validation            | 3/3       |
| `healthCheck.test.js`   | Project health and route fallback            | 4/4       |
| `appError.test.js`      | Custom AppError class validation             | 2/2       |

---

## 🧪 Highlighted Test Scenarios

### ✅ Add Sweet - `POST /api/sweets`

- Handles missing fields and invalid values (e.g., price < 0)
- Valid inputs create a new sweet
- Extra fields are ignored

### ✅ Get Sweet - `GET /api/sweets/:id`

- Returns correct data for valid ID
- Handles invalid or non-existent IDs

### ✅ Sort Sweets - `GET /api/sweets/sort`

- Supports sorting by name, price, category
- Handles multiple sort keys
- Returns error for missing sort fields

### ✅ Purchase Sweet - `PATCH /api/inventory/:id/purchase`

- Reduces stock correctly on purchase
- Validates against missing/invalid/over-limit quantity

### ✅ Health Check - `GET /health`

- Ensures health endpoint is functional
- Handles unknown routes gracefully

---

## 📊 Code Coverage Summary

| File / Module       | 🧪 Statements | 🔁 Branches | 🧩 Functions | 📏 Lines |
| ------------------- | ------------- | ----------- | ------------ | -------- |
| **All Files**       | 100% ✅       | 100% ✅     | 100% ✅      | 100% ✅  |
| `backend/app.js`    | 100%          | 100%        | 100%         | 100%     |
| `controllers/`      | 100%          | 100%        | 100%         | 100%     |
| `models/`           | 100%          | 100%        | 100%         | 100%     |
| `routes/`           | 100%          | 100%        | 100%         | 100%     |
| `utils/appError.js` | 100%          | 100%        | 100%         | 100%     |

📌 **No uncovered lines.** All logic paths, including conditionals, edge cases, and fallbacks, were tested and verified.

---

## 🧪 Tools Used

- **Testing Framework**: Jest
- **Test Runner**: `jest --runInBand`
- **Assertion**: `expect` from Jest
- **Coverage Tool**: `jest --coverage`

---

## 🏁 Final Remarks

The backend system of the Sweet Shop Management System is fully tested with **100% coverage**. All critical business logic and error handling are thoroughly validated.
