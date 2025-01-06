# Full-Stack E-commerce Application

## Overview
This is a full-stack e-commerce application designed for seamless online shopping experiences. The app includes features such as user authentication, product management, a shopping cart, and payment integration. Docker is used to streamline the development process.

---

## Features

### Frontend (Client)
- **Tech Stack:** React.js, Vite
- **Features:**
  - Responsive user interface
  - Product listing and filtering
  - Shopping cart management
  - User authentication (login, register)
  - Order summary and checkout

### Backend (Server)
- **Tech Stack:** Node.js, Express.js
- **Database:** MongoDB
- **Features:**
  - RESTful API for frontend integration
  - User authentication (JWT-based)
  - Product and order management
  - Payment gateway integration (Stripe is used for payment processing)
  - Logging and error handling
  - **Admin Panel**: Manage products, orders, and users

### Infrastructure
- **Containerization:** Docker, Docker Compose
- **Environment Variables:** Managed via `.env` files
  - **Server .env Variables:**
    ```env
    DATABASE_URL=<your-database-url>
    PORT=<your-server-port>
    CLIENT_SECRET=<your-client-secret>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECERT=<your-cloudinary-api-secret>
    STRIPE_SECRET_KEY=<your-stripe-secret-key>
    CLIENT_URL=<your-client-url>
    ```
  - **Client .env Variables:**
    ```env
    API_URL=<your-api-url>
    STRIPE_URL=<your-stripe-url>
    ```
- **Development:** Docker is used to set up and manage the development environment.

---

## Installation

### Prerequisites
- Docker and Docker Compose installed on your system
- Node.js and npm (optional for local development without Docker)
- MongoDB instance (local or cloud-hosted, e.g., MongoDB Atlas)

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/bilalshabbir31/fullstack-ecommerce-app.git
   cd fullstack-ecommerce-app
   ```

2. Create `.env` files for the backend and frontend based on the variables listed above.

3. Build and run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:8080](http://localhost:8080)

---

## Directory Structure
```
fullstack-ecommerce-app
├── client
│   ├── src
│   ├── public
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── .dockerignore
│   ├── .env.sample
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── docker-compose.yml
└── README.md
```

---

## Development

### Running Locally Without Docker

#### Backend:
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

#### Frontend:
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature name'`)
4. Push the branch (`git push origin feature-name`)
5. Create a pull request

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact
For questions or support, contact:
- **Author:** Bilal Shabbir
- **GitHub:** [bilalshabbir31](https://github.com/bilalshabbir31)
- **Email:** imbilal31@gmail.com

