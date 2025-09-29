Revamped Event Creation and Management Platform

A modern, full-stack platform for creating, managing, and attending events. This project provides both frontend and backend functionalities with real-time features and a user-friendly interface.

Project Overview

The platform allows users to:

Create and manage events (for organizers)

RSVP to events (for attendees)

View event details with timelines, locations, and schedules

Interact with events through a modern, responsive frontend

Tech Stack

Frontend:

React.js

React Router

Redux / Context API

Chakra UI / Tailwind CSS (for styling)

Axios (for API requests)

Vite or Create React App (depending on setup)

Backend:

Node.js

Express.js

MongoDB / Mongoose

JWT Authentication

RESTful API design

Deployment:

Frontend: Netlify → [Your Netlify URL]

Backend: Render → [Your Render URL]

Folder Structure
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

Getting Started
Backend Setup

Go to the backend folder:

cd backend


Install dependencies:

npm install


Create a .env file with the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start the backend server:

npm start


The backend will run on http://localhost:5000.

Frontend Setup

Go to the frontend folder:

cd frontend


Install dependencies:

npm install


Create a .env file (for API URLs):

VITE_API_URL=http://localhost:5000


Start the frontend:

npm run dev   # Vite
# or
npm start     # CRA


The frontend will run on http://localhost:3000.

Deployment

Frontend: Deployed on Netlify → [Your Netlify URL]

Backend: Deployed on Render → [Your Render URL]

Note: Make sure the frontend .env points to the deployed backend URL for production.

Features

Role-based access (Organizer / Attendee)

Event creation and management

RSVP tracking

Responsive and modern UI

JWT authentication and protected routes

API integration for event data

Contributing

Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m "Add new feature")

Push to branch (git push origin feature/your-feature)

Open a Pull Request
