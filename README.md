# ⚡ CodeShift

**CodeShift** is a full-stack web application that allows users to securely convert code between different programming languages and formats with ease. Built with privacy, performance, and developers in mind.

<!-- 🖼️ Screenshots -->

## Visuals
<p align="center">
  <img src="./preview/landing.png" alt="Landing Page" width="80%" />
  <br/>
  <img src="./preview/image.png" alt="Code Conversion Example" width="80%" />
</p>

---

## ✨ Features

- 🔐 JWT-based Authentication (Register/Login)
- 💻 Code Format Converter (e.g., JS → Python)
- 🌐 RESTful API integration
- 📬 Contact form with EmailJS
- ⚙️ Role-based access control (admin/user)
- 🎨 Responsive UI built with Tailwind CSS
- 🚀 Hosted on Render / Vercel / Netlify

---

## 🛠️ Tech Stack

### Frontend (Client)
- ✅ React.js
- 🎨 Tailwind CSS
- ✉️ EmailJS
- 🔁 React Router DOM

### Backend (Server)
- 🖥 Node.js
- ⚙️ Express.js
- 💾 MongoDB (Atlas)
- 📦 Mongoose
- 🔒 bcrypt.js & JWT (for secure authentication)


```bash
codeshift/
├── client/             # React frontend
│   ├── public/
│   ├── src/
│   ├── .env            # Frontend environment variables (EmailJS, API base URL, etc.)
│   └── package.json    # Frontend dependencies
│
├── server/             # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── .env            # Backend environment variables (MONGO_URL, JWT_SECRET_KEY)
│   └── package.json    # Backend dependencies
│
├── .gitignore
└── README.md

## 🚀Setup Instrution


### 📦 Clone the Repo

```bash
git clone https://github.com/Sbikram07/CodeShift.git
cd CodeShift


