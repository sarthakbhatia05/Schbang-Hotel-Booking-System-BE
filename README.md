# Schbang Hotel-Booking API

A simple Node.js + TypeScript + MongoDB backend for hotel searching.
## Features
- User registration and login (JWT auth)
- Add, search, and manage hotels
- Set special prices for hotels
- Role-based access (admin/user)
- API docs with Swagger

## Prerequisites
- Node.js (v18 or above recommended)
- MongoDB (local or cloud)

## Setup
1. **Clone the repo**
   ```sh
   git clone https://github.com/sarthakbhatia05/Schbang-Hotel-Booking-System-BE.git
   cd Schbang-Assessment
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   - Copy `.env.example` to `.env`:
     ```env
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/schbang
     JWT_SECRET=your_jwt_secret
     API_BASE_URL=http://localhost:3000/
     ```
   - Update values as needed.
4. **Start MongoDB** (if running locally)
5. **Run the app**
   ```sh
   npm run start
   ```
   - For development with auto-reload(nodemon):
     ```sh
     npm run dev
     ```

## API Docs
- Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for Swagger UI.
- Use the lock button to authorize with your JWT token.

## Notes
- Only admins can add hotels or set special prices.
- All passwords are hashed before saving.
- For any issues, check your `.env` and MongoDB connection.

--- 
