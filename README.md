# RBAC assignment

## Overview
This project provides a simple API for user authentication using **Node.js**, **Express.js**, and **MongoDB**. It includes the following features:
- User signup, singout and signin functionality.
- Role-based user management (admin, superadmin, developer, and user).
- Password encryption using **bcrypt**.
- Token-based authentication using **JWT** (JSON Web Token).

## Installation

### Steps backend
1. Clone the repository:
   ```bash
   git clone [<repository_url>](https://github.com/Nakshatrrra/RBAC-MERN)
   cd api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and set the following environment variables:
   ```env
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET_KEY=<your_jwt_secret>
   PORT=<port_number>
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:<port_number>`.


### Steps
1. Install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Start the server:
   ```bash
   npm run dev
   ```

## Endpoints

  {
    "username": "developer",
    "email": "developer@example.com",
    "password": "developer",
    "role": "developer"
  }
  {
    "username": "admin",
    "email": "admin@example.com",
    "password": "developer",
    "role": "admin"
  }.....


same way you can use any role

I've set passwords for all developer in my db.


## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **bcrypt** for password hashing.
- **jsonwebtoken** for token-based authentication.

