# Airbnb Notification Service

A scalable notification microservice for Airbnb, built with Node.js, TypeScript, Express, BullMQ, and Redis. Supports email and SMS notifications with queue-based processing, centralized error handling, request tracing, and structured logging.

---

## 🚀 Features

- **REST API** for sending emails and SMS
- **Queue-based processing** using BullMQ and Redis
- **Admin UI** for monitoring queues via Bull Board
- **Centralized error handling**
- **Request tracing** with Correlation IDs
- **Winston-based logging**
- **Validation** using Zod schemas
- **Extensible** for new notification channels

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Redis](https://redis.io/) (running on port 6379)
- [Git](https://git-scm.com/)

---

## 📦 Installation

```sh
git clone https://github.com/sidpd51/Notification-Service-Airbnb.git
cd Notification-Service-Airbnb

npm install
cp .env.example .env
# Edit .env and set PORT as needed
```

---

## ⚙️ Configuration

- Set your desired `PORT` in the `.env` file.
- Redis connection details are set in [`src/config/index.ts`](src/config/index.ts).

---

## 🏃‍♂️ Running the Service

### Development

```sh
npm run dev
```

### Production

```sh
npm run build
npm start
```

---

## 📬 API Endpoints

Base URL: `/api/v1/notification`

### Send Email

- **POST** `/api/v1/notification/email`
- **Body Example:**
    ```json
    {
      "to": ["user@example.com"],
      "subject": "Welcome!",
      "templateType": "WELCOME"
    }
    ```

### Send SMS

- **POST** `/api/v1/notification/sms`
- **Body Example:**
    ```json
    {
      "to": "+15551234567",
      "message": "Your code is 123456"
    }
    ```

---

## 🛠️ Queue Monitoring

- Visit [http://localhost:PORT/admin/queues](http://localhost:PORT/admin/queues) for Bull Board UI.

---

## 🧩 Project Structure

```
src/
  config/         # Configuration and logger
  controllers/    # Express route handlers
  middlewares/    # Express middlewares
  queues/         # BullMQ queue definitions
  routers/        # API route definitions
  service/        # Business logic
  utils/          # Helpers and error classes
  validators/     # Zod schemas for validation
  workers/        # BullMQ workers for processing jobs
```

---

## 📝 License

MIT

---

## 👨‍💻 Author

sidpd51