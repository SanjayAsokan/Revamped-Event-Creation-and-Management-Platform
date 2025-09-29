🎉 Revamped Event Creation and Management Platform
--

A modern, full-stack platform to create, manage, and attend events with ease. This application offers real-time features, role-based access, and a responsive, user-friendly interface for both event organizers and attendees.

----
🌐 Live Demo

Frontend: https://chimerical-smakager-36e645.netlify.app/

Backend API: https://revamped-event-creation-and-management-1epd.onrender.com

----
✨ Features

👤 Role-based Access: Organizer and attendee experiences

📅 Event Management: Create, update, and delete events

✅ RSVP Tracking: Track attendees and responses

📍 Event Details: Timelines, schedules, and locations

📱 Responsive UI: Works seamlessly on desktop & mobile

🔒 JWT Authentication: Secure login and protected routes

🌐 RESTful API: Easy integration and data fetching

---

🛠️ Tech Stack


Frontend:

React.js

React Router

Redux / Context API

Chakra UI / Tailwind CSS

Axios (API requests)

Vite / Create React App

--

Backend:

Node.js & Express.js

MongoDB & Mongoose

JWT Authentication

RESTful API

---

Deployment:

Frontend: Netlify

Backend: Render


---

📂 Folder Structure
Revamped-Event-Creation-and-Management-Platform/
├─ backend/
│   ├─ package.json
│   ├─ index.js
│   ├─ routes/
│   ├─ controllers/
│   ├─ models/
│   └─ .env
├─ frontend/
│   ├─ package.json
│   ├─ src/
│       ├─ components/
│       ├─ pages/
│       ├─ redux/ or context/
│       └─ App.js
└─ README.md


----

⚡ Getting Started

    Backend Setup

      Navigate to the backend folder:

      cd backend


    Install dependencies:

      npm install


    Create a .env file with the following:

      PORT=5000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_secret_key


    Start the backend server:

      npm start


    Backend runs at: http://localhost:5000

----

  Frontend Setup

    Navigate to the frontend folder:

      cd frontend


    Install dependencies:

      npm install


    Create a .env file for API URLs:

      VITE_API_URL=http://localhost:5000

---

Start the frontend:

npm run dev   # Vite
# or
npm start     # CRA


Frontend runs at: http://localhost:3000

Note: For production, ensure the frontend .env points to the deployed backend URL.

---
🤝 Contributing

Fork the repository

Create a new branch:

git checkout -b feature/your-feature


Commit your changes:

git commit -m "Add new feature"


Push to the branch:

git push origin feature/your-feature


Open a Pull Request
