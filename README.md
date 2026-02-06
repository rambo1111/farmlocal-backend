

# FarmLocal Backend

A robust Node.js and TypeScript backend application built with Express. This service manages product data, handles external API integrations with retry logic, and implements performance optimizations like caching and rate limiting.

**Deployed URL:** [https://farmlocal-backend-jh1z.onrender.com](https://farmlocal-backend-jh1z.onrender.com)

## 🚀 Features

* **RESTful API:** Structured endpoints for product management.
* **Database Integration:** Uses **MySQL** for persistent storage.
* **Performance Caching:** Implements **Redis** to cache product queries and reduce database load.
* **Rate Limiting:** Custom middleware using Redis to prevent abuse (IP-based throttling).
* **Webhook Handling:** **Idempotent** webhook processing to handle supplier updates safely (deduplication using Redis).
* **Resiliency:** External API calls feature automatic retry logic with exponential backoff.
* **Type Safety:** Built entirely with **TypeScript**.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MySQL (via `mysql2`)
* **Caching/Queue:** Redis (via `ioredis` and `redis` client)
* **HTTP Client:** Axios
* **Deployment:** Render

## 📂 Project Structure

```bash
src/
├── auth/           # OAuth and Client credential logic
├── config/         # Configuration for Env, MySQL, and Redis
├── external/       # External API integration with retry logic
├── middlewares/    # Custom middlewares (eQP. Rate Limiting)
├── products/       # Product domain (Controller, Service, Repository)
├── webhooks/       # Webhook handlers (Supplier idempotency)
├── app.ts          # App setup
├── route.ts        # Route definitions
└── server.ts       # Server entry point

```

## ⚡ Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* MySQL Instance
* Redis Instance

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/rambo1111/farmlocal-backend.git
cd farmlocal-backend

```


2. **Install dependencies:**
```bash
npm install

```


3. **Environment Configuration:**
Create a `.env` file in the root directory and add the following variables:
```env
PORT=3000
MYSQL_URL=mysql://user:password@host:port/database
REDIS_URL=redis://host:port

# Optional (For OAuth features)
OAUTH_TOKEN_URL=https://...
OAUTH_CLIENT_ID=your_id
OAUTH_CLIENT_SECRET=your_secret

```


4. **Run in Development Mode:**
```bash
npm run dev

```


5. **Build and Run for Production:**
```bash
npm run build
npm start

```



## mb API Endpoints

### 1. Health Check

* **GET** `/`
* **Response:** `{ "status": "ok" }`

### 2. Products

Fetches a list of products with support for pagination, search, and caching.

* **GET** `/products`
* **Query Parameters:**
* `limit` (number): Items per page (default: 10).
* `cursor` (number): ID to start after (for pagination).
* `search` (string): Filter by product name.
* `category` (string): Filter by category.
* `sort` (string): Field to sort by (e.g., `basic_price`).
* `order` (string): `asc` or `desc`.



### 3. External API Proxy

Demonstrates retry logic by fetching data from a public API.

* **GET** `/external-api`

### 4. Supplier Webhook

Handles incoming webhook events with idempotency (prevents processing the same event twice).

* **POST** `/webhooks/supplier`
* **Headers:** `Idempotency-Key` (Required)

## 🚀 Deployment (Render)

This project is configured to deploy on [Render](https://render.com).

**Build Configuration:**

* **Build Command:** `npm install && npm run build`
* **Start Command:** `npm start`

*Note: Ensure you add the environment variables (MYSQL_URL, REDIS_URL) in the Render dashboard settings.*

## 📄 License

This project is licensed under the ISC License.
