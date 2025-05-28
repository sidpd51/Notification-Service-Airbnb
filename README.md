# 📢 Airbnb Notification Service

A scalable notification microservice for Airbnb, built with **Node.js**, **TypeScript**, **Express**, **BullMQ**, and **Redis**. Supports **email** and **SMS** delivery with queue-based job handling, robust validation using **Zod**, centralized error handling, structured logging, and request tracing.

---

## 🚀 Features

-   📬 REST API for sending Email and SMS
-   ⚙️ Queue-based job processing using **BullMQ + Redis**
-   🧑‍💼 Admin UI for queue monitoring with **Bull Board**
-   🧵 Request tracing via Correlation IDs
-   🛑 Centralized error handling
-   🧾 Structured logging with **Winston**
-   ✅ Payload validation via **Zod**
-   🔌 Extensible for additional notification channels (e.g., push)

---

## 🛠️ Prerequisites

-   [Node.js](https://nodejs.org/) (v16+)
-   [Redis](https://redis.io/) (running on port `6379`)
-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/) (optional, for local Redis)

---

## 🐳 Running Redis via Docker

```bash
docker run --name redis -p 6379:6379 -d redis:7
```

---

## 📦 Installation

```bash
git clone https://github.com/sidpd51/Notification-Service-Airbnb.git
cd Notification-Service-Airbnb

npm install
cp .env.example .env
# Edit .env with appropriate values
```

---

## ⚙️ Configuration

Update the `.env` file with the following environment variables:

```env
PORT=3000
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

EMAIL_FROM=your@email.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

SMS_PROVIDER_API_KEY=your_sms_provider_api_key
```

> Redis connection settings are centralized in `src/config/index.ts`.

---

## 🏃 Running the Service

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

### Run Workers

```bash
npm run email-worker
npm run sms-worker
```

---

## 📬 API Endpoints

Base URL: `/api/v1/notification`

### 📧 Send Email

-   **POST** `/api/v1/notification/email`
-   **Sample Payload**:

```json
{
	"to": [
		{ "name": "Alice", "email": "alice@example.com" },
		{ "name": "Bob", "email": "bob@example.com" }
	],
	"cc": ["manager@example.com"],
	"bcc": ["audit@example.com"],
	"subject": "Booking Confirmation",
	"orderId": "ORD_123456",
	"templateType": "BOOKING",
	"attachments": [
		{
			"filename": "itinerary.pdf",
			"url": "https://example.com/docs/itinerary.pdf"
		}
	]
}
```

### 📱 Send SMS

-   **POST** `/api/v1/notification/sms`
-   **Sample Payload**:

```json
{
	"to": "+15551234567",
	"message": "Your Airbnb booking has been confirmed. Check your email for details.",
	"senderId": "Airbnb"
}
```

---

## 🔍 Queue Monitoring

Visit [http://localhost:PORT/admin/queues](http://localhost:PORT/admin/queues) for the **Bull Board UI** to monitor job queues in real-time.

---

## 📂 Project Structure

```
src/
  config/         # App & Redis config, logger setup
  controllers/    # Route handlers for notifications
  middlewares/    # Error handler, request tracing, validation
  queues/         # Queue setup with BullMQ
  routers/        # Express router definitions
  service/        # Business logic for email/SMS
  utils/          # Utility functions & error classes
  validators/     # Zod schemas for request validation
  workers/        # Queue processors
```

---

## 🧠 Why a Notification Microservice?

In complex applications like Airbnb, features such as **Auth**, **Bookingn**, and **Payment processing** are handled by different microservices. However, all of them usually need to send notifications — whether by email or SMS or may be push notification.

### ❌ The Problem

Traditionally, each service would implement its own notification logic:

-   Code duplication: Every service re-implements similar email/SMS logic.
-   Hard to maintain: Changes in template or delivery logic need updates in multiple places.
-   Violates DRY principle: Repeating logic leads to bloated codebases and inconsistent behavior.

### ✅ The Solution

We introduced a **dedicated Notification Microservice** that handles all notification responsibilities:

-   Acts as a **single point of contact** for email and SMS delivery.
-   Accepts HTTP requests from any service with a notification payload.
-   Ensures **clean separation of concerns** — services focus on their core logic.

### 🚀 Why Queues?

Notifications don’t always need to be sent instantly — they just need to be **reliably delivered**.

But consider this:

-   If thousands of users register or book at once, handling all notifications synchronously would block your APIs and overload your servers.
-   This is where **asynchronous processing** comes in.

We use **Redis queues via [BullMQ](https://docs.bullmq.io/)** to offload notification jobs:

-   Services send a payload to the notification API.
-   The payload is pushed to a Redis queue.
-   A worker picks up jobs from the queue and processes them.
-   The API immediately responds:  
    ➜ `"Your notification has been added to the queue and will be sent shortly."`

### 💡 Benefits

-   High scalability and fault tolerance.
-   Faster response times for upstream services.
-   Centralized logic for all templates and delivery channels.
-   Easy to monitor and retry failed jobs via **Bull Board**.

With this setup, our notification service can **handle high loads**, **scale independently**, and **keep our main services clean and DRY**.

---

## 📝 License

MIT

---

## 👨‍💻 Author

**[@sidpd51](https://github.com/sidpd51)**
