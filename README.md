# 💒 Wedding Planner Server

Backend REST API for the Wedding Planner Platform built with **Node.js**, **Express.js**, **MongoDB**, and **Stripe**.

This server provides authentication, service management, booking management, payment verification, vendor dashboard, customer dashboard, and admin management APIs.

---

# 🚀 Features

- User Authentication (Better Auth Session)
- Vendor Service Management
- Customer Booking System
- Vendor Dashboard
- Customer Dashboard
- Admin Dashboard
- Stripe Premium Subscription
- MongoDB Database
- Role Based Authorization
- Protected Routes
- Booking Status Management
- Service Approval System
- User Blocking
- Transaction History

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Stripe
- dotenv
- cors

---

# 📁 Project Structure

```
├── index.js
├── package.json
├── .env
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_DB_URI=your_mongodb_connection_string

STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/wedding-planner-server.git
```

Go to project directory

```bash
cd wedding-planner-server
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 🔐 Authentication

This project uses **Better Auth Session** authentication.

Protected routes require

```
Authorization: Bearer <session_token>
```

---

# 👥 User Roles

- Customer
- Vendor
- Admin

---

# 📚 API Endpoints

---

## Public Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Server Status |
| GET | /services | All Services |
| GET | /customer/services | Approved Services |
| GET | /service/:id | Service Details |
| GET | /services/categories | Service Categories |
| GET | /services/featured | Featured Services |

---

## Customer

| Method | Endpoint |
|---------|----------|
| POST | /bookings |
| GET | /my-bookings/:email |
| GET | /bookings/:id |
| DELETE | /bookings/:id |
| GET | /customer/dashboard |
| GET | /customer/statistics |
| GET | /customer/bookings |

---

## Vendor

| Method | Endpoint |
|---------|----------|
| POST | /services |
| PATCH | /services/:id |
| PATCH | /services/:id/availability |
| DELETE | /services/:id |
| GET | /vendor/services/:vendorId |
| GET | /vendor/bookings/:vendorId |
| PATCH | /vendor/bookings/:id/status |
| GET | /vendor/dashboard |

---

## Payments

| Method | Endpoint |
|---------|----------|
| POST | /payments/checkout-verify |

---

## Admin

### Services

| Method | Endpoint |
|---------|----------|
| GET | /admin/services |
| PATCH | /admin/services/:id/status |
| PATCH | /admin/services/:id/toggle |
| DELETE | /admin/services/:id |

### Users

| Method | Endpoint |
|---------|----------|
| GET | /admin/users |
| GET | /admin/users/:id |
| PATCH | /admin/users/:id/block |
| PATCH | /admin/users/:id/unblock |

### Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /admin/dashboard |
| GET | /admin/transactions |

---

# 💳 Stripe Payment

Premium subscription payments are verified using Stripe Checkout Session.

After successful payment:

- Transaction stored in MongoDB
- Vendor upgraded to Premium
- Subscription status activated

---

# 🗄 Database Collections

```
services
bookings
user
transactions
session
```

---

# 🔒 Security

- Better Auth Session Authentication
- Role-based Authorization
- Protected Routes
- Admin-only APIs
- Vendor Ownership Validation
- Customer Ownership Validation
- MongoDB ObjectId Validation

---

# 📈 Dashboards

## Customer Dashboard

- Total Bookings
- Pending Bookings
- Accepted Bookings
- Rejected Bookings
- Recent Bookings

## Vendor Dashboard

- Total Services
- Total Bookings
- Pending Requests
- Accepted Requests
- Rejected Requests

## Admin Dashboard

- Total Users
- Vendors
- Customers
- Services
- Pending Services
- Bookings
- Transactions

---

# 🚀 Deployment

Deploy easily on

- Render
- Railway
- VPS
- DigitalOcean
- Azure
- AWS EC2

Remember to configure all environment variables before deployment.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Md Ridoy**

If you like this project, consider giving it a ⭐ on GitHub.
