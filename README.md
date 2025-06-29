# 🎓 SkillHatch - Learning Management System (LMS)

SkillHatch is a modern, full-stack learning platform where educators can create and sell courses, and learners can buy and study them at their own pace. It is designed with a sleek, minimal UI and scalable backend to deliver a seamless e-learning experience.

---

## Features

###  For Learners
- Browse and enroll in courses
- Learn from video lectures and reading materials
- Track course progress
- Add courses to wishlist or purchase directly

###  For Educators
- Create and manage courses with rich descriptions
- Upload video content and resources
- View enrollments and earnings

### Platform Features
- JWT-based authentication and role-based access
- Admin dashboard for platform management
- Stripe/Payment gateway ready (for production use)
- Responsive, minimal UI with clean UX
- RESTful API integration between frontend and backend

---

## 🛠️ Tech Stack

### Frontend (Client) - `/client`
- React.js (with hooks and component-based architecture)
- React Router DOM for navigation
- Tailwind CSS for styling
- Axios for HTTP requests

### Backend (Server) - `/server`
- Node.js + Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

---

## 📁 Folder Structure

SkillHatch/
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── server/ # Node.js backend
│ ├── src/
│ ├── models/
│ ├── routes/
│ └── package.json
└── README.md
