# AUTH WITH EVENT MANAGEMENT

An enterprise-grade Authentication Service built with **Node.js**, **TypeScript**, and **Express**, featuring a resilient Event-Driven architecture powered by **PostgreSQL** and **Redis Pub/Sub**.

## 🏗 High-Level Architecture

This project solves the "Distributed Transaction" problem by ensuring that database updates and event notifications (emails) happen atomically. It prevents the common failure where a user is created but the welcome email is never sent, or vice versa.

### Key Architectural Patterns:

- **Transactional Outbox Pattern**: Ensures data consistency between the Database and Redis. Events are first stored in an `EventOutBox` table within the same transaction as the User creation.
- **Outbox Relay Worker**: A background polling process that fetches unprocessed events and publishes them to Redis, ensuring "at-least-once" delivery.
- **Idempotent Subscriber**: The consumer tracks `eventIdentifiers` to ensure that even if a message is received multiple times (due to network retries), the side effect (e.g., sending an email) only happens once.
- **Dead Letter Fallback**: Failed third-party notifications are automatically logged to a local JSONL file system as a safety net.

---

## 🛠 Tech Stack

- **Runtime**: Node.js (v18+)
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Message Broker**: Redis (Pub/Sub)
- **Validation**: Joi
- **Security**: Argon2/Scrypt for password hashing

---

## 🚦 Getting Started

### Prerequisites

- Docker (for Redis & Postgres) or local instances.
- Node.js installed.

### Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASS=your_password
DB_NAME=nexus_auth
REDIS_HOST=localhost
REDIS_PORT=6379
NOTIFICATION_URL=https://api.thirdparty.com/send

```

### Installation

```bash
npm install
npm run build
npm start

```

---

## 🧪 Resilience & Stress Testing

The system was stress-tested using **Autocannon** to ensure high-concurrency stability.

### Stress Test Script

The project includes a custom stress-testing utility that simulates unique user registrations:

```bash
# Run the internal stress test
node dist/test/stress-test.js

```

### Key Metrics Observed:

- **Latency**: Average < 10ms for account creation.
- **Throughput**: Successfully handled ~500+ requests/sec on local hardware.
- **Reliability**: Zero message loss during simulated Redis outages.

---

## 📝 Error Handling & Logs

If the notification service is unreachable, the system writes failures to:
`logs/notifications/failed-notifications.log`

Each entry contains:

- Original message payload.
- Error status code and timestamp.
- Original Event UUID for manual replay.
