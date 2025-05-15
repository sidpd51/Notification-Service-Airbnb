# Airbnb Booking Service 🏨

This is a Node.js-based booking service API built using Express, Sequelize (MySQL), and TypeScript. It includes features like correlation ID middleware, centralized error handling, and a basic logging system with Winston.

---

## 🚀 Features

- Express REST API
- Sequelize ORM with MySQL
- TypeScript support
- Centralized error handling
- Request tracing via Correlation IDs
- Winston-based logging

---

## 🛠️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) >= 18.x
- [MySQL](https://www.postgresql.org/) >= 13.x
- [Git](https://git-scm.com/)

---

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd airbnb-booking-service

# Install dependencies
npm install

# Create .env file
touch .env

# Add variables present in .env.example to .env