# Comment System – Fullstack Project

A complete fullstack Comment System built using Express.js (Backend) and React.js (Frontend).

## Features

- User authentication (JWT)
- Create, update, delete comments
- Nested replies
- Like / dislike on comments
- Secure REST API backend
- Modern React UI with Redux
- sort by most liked, most disliked, and newest comments
- pagination

## Tech Stack

### Frontend

- React.js
- Redux Toolkit
- Axios
- React Router

### Backend

- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt.js

## Project Structure

project/
│
├── backend/ # Express.js API
└── frontend/ # React UI

## Installation Guide

### 1. Clone the Repository

git clone https://github.com/your-username/comment-system.git
cd comment-system

## Backend Setup (Express.js)

### 2. Navigate to Backend Folder

cd backend

### 3. Install Dependencies

npm install

### 4. Create .env File

PORT=5000
DB=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=http://localhost:3000

### 5. Start Backend Server

Development:
npm run dev

Production:
npm start

## Frontend Setup (React.js)

### 6. Navigate to Frontend Folder

cd ../frontend

### 7. Install Dependencies

npm install

### 8. Start Frontend Server

npm start

## Running the Entire Project

Start Backend:
cd backend
npm run dev

Start Frontend:
cd ../frontend
npm start

## Build Frontend

npm run build

## Example API Routes

### Authentication

POST /api/auth/signup - signup
POST /api/auth/signin - signin
GET /api/auth/signout - signout

### Users

GET /api//user/:id - get user by id

### Comments

POST /api/comment - create comment
GET /api/comments - get all comments
PUT /api/comment/:id - update comment
DELETE /api/comment/:id - delete comment
PUT /api/comment/:id/like - like comment
PUT /api/comment/:id/dislike - dislike comment
PUT /api/comment/:id/reply - create reply

## Script Summary

Backend:
npm run dev
npm start

Frontend:
npm start
npm run build

## License

MIT License
