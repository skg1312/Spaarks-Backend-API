# Spaarks Backend Developer Assignment - Restaurant API

## Overview

This is a Node.js application for managing restaurants with CRUD operations and geospatial queries. The API is secured using JSON Web Tokens (JWT) for user authentication.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete restaurant records.
- **Geospatial Queries**: Find restaurants based on proximity and distance range.
- **User Authentication**: Secure API endpoints with JWT.

## Prerequisites

- Node.js (version 18 or later)
- MongoDB Atlas account
- Docker (optional, for containerized deployment)

## Setup and Installation

### **1. Clone the Repository**

git clone https://github.com/skg1312/spaarks-backend-developer-assignment.git
cd spaarks-backend-developer-assignment

### **2. Install Dependencies**

npm install

### **3. Configure Environment Variables**

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000

- Replace your_mongodb_connection_string and your_jwt_secret_key with your MongoDB connection string and a secret key for JWT, respectively.

### **4. Run the Application Locally**

node index.js

- The application will be running on http://localhost:3000.



## API Endpoints
### **1. User Authentication**
- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Login and receive a JWT.
### **2. Restaurant Operations**
- POST /api/restaurants: Create a new restaurant.
- GET /api/restaurants: Get a list of restaurants.
- GET /api/restaurants/ : Get a restaurant by ID.
- PUT /api/restaurants/ : Update a restaurant by ID.
- DELETE /api/restaurants/ : Delete a restaurant by ID.
### **3. Geospatial Queries**
- GET /api/restaurants/nearby: Get restaurants within a specified radius.
- GET /api/restaurants/range: Get restaurants within a specified distance range.

## Docker Instructions

### **1. Build Docker Image**

docker build -t your-dockerhub-username/spaarks-backend-developer-assignment-restaurant-api .

### **2. Run Docker Container**
docker run -p 3000:3000 your-dockerhub-username/spaarks-backend-developer-assignment-restaurant-api



