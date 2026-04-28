# 📦 Sales Order Management App (React + Vite)

A minimal yet powerful **ERP-style Sales Order Form** built using React (Vite).
This application allows users to create, edit, and manage sales orders with dynamic product handling, validation, and local storage persistence.

---

## 🚀 Features

### 🧾 Order Management

* Create new sales orders
* Edit existing saved orders
* Auto-reset form after submission
* View saved order in structured format

### 👤 Customer Handling

* Dropdown selection with mock API data

### 📦 Product Handling

* Dynamic product rows (Add / Remove)
* Prevent duplicate product selection
* Auto-fill product price
* Real-time row total calculation

### 💰 Calculations

* Per-row total
* Grand total using `useMemo`

### ✅ Validation

* Required fields validation
* Quantity must be greater than 0
* Error handling with toast notifications

### 🔔 Notifications

* Success & error alerts using **react-toastify**
* Non-blocking UI feedback

### 💾 Persistence

* Form state saved in `localStorage`
* Saved order stored and reloadable

### ✏️ Edit Functionality

* Load saved order into form
* Update and resubmit

### ⚠️ Dirty State Tracking

* Detect unsaved changes (`isDirty`)
* Warn before leaving page
* Confirm before canceling edits

### 📱 Responsive UI

* Mobile-friendly table layout
* Clean minimal design (no UI libraries)

---

## 🛠️ Tech Stack

* React (Vite)
* JavaScript (JSX)
* CSS (Custom minimal styling)
* LocalStorage (State persistence)
* react-toastify (Notifications)

---

## 📁 Project Structure

```
src/
 ├── components/
 │    ├── CustomerSelect.jsx
 │    ├── ProductRow.jsx
 │    ├── ProductTable.jsx
 │
 ├── hooks/
 │    ├── useLocalStorage.js
 │
 ├── services/
 │    ├── api.js
 │
 ├── styles.css
 ├── App.jsx
 ├── main.jsx
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone from GitHub

```bash
git clone https://github.com/your-username/sales-order-app.git
cd sales-order-app
```

---

### 🔹 2. Install Dependencies

```bash
npm install
```

---

### 🔹 3. Install Toast Library

```bash
npm install react-toastify
```

---

### 🔹 4. Run the Project

```bash
npm run dev
```

---

## 📸 Usage Flow

1. Select a customer
2. Add products dynamically
3. Enter quantity (price auto-filled)
4. View total calculation
5. Submit order
6. See saved order preview
7. Edit order if needed

---

## 🧠 Key Concepts Used

* React Hooks (`useState`, `useEffect`, `useMemo`)
* Custom Hook (`useLocalStorage`)
* Controlled Components
* Derived State Optimization
* Form Validation Logic
* Conditional Rendering
* Dirty State Detection

---

## 👨‍💻 Author

**Kamal Sorathiya**
Frontend Developer (React.js)

---

## 📄 License

This project is open-source and available for learning and evaluation purposes.
