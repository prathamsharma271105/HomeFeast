# 🍲 HomeFeast – Premium Homemade Tiffin & Food Service Platform

<div align="center">

![HomeFeast Banner](https://img.shields.io/badge/HomeFeast-Homemade%20Tiffin%20%26%20Food%20Service-ff7a00?style=for-the-badge&logo=fastapi&logoColor=white)

**A full-stack, multi-city homemade meal & subscription management platform built with the MERN stack**

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React%2018-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)

</div>

---

## 🌟 Project Overview

**HomeFeast** is a centralized, web-based platform that connects consumers (students, working professionals, elderly people, and health-conscious foodies) with verified local home cooks and tiffin service providers. It offers authentic, hygienic, home-style meals on both an on-demand order basis and a flexible daily, weekly, or monthly subscription pass model across multiple cities in India.

### 🎯 Problem Statement

Millions of people living away from home struggle to find healthy, hygienic, and affordable meals every day. Existing mainstream food delivery apps prioritize commercial restaurants, resulting in:
- 💸 **High Meal Costs**: Expensive packaging, high platform commissions, and inflated restaurant pricing.
- 🍔 **Unhealthy & Repetitive Food**: Restaurant food is heavily spiced, oily, and unsuitable for continuous daily consumption.
- 🚫 **Lack of Long-Term Subscriptions**: No native options for cost-effective recurring tiffin passes with pause guarantees.
- 👩‍🍳 **Low Visibility for Home Cooks**: Talented local homemakers lack digital storefronts and order management tools.
- 📱 **Manual Coordination Chaos**: Fragmented ordering managed over phone calls and WhatsApp chats with zero tracking.

### 💡 Our Solution

HomeFeast digitizes the entire homemade food & tiffin ecosystem by delivering:
- ✅ **Authentic Homemade Food Discovery**: Multi-city search with rich dietary, pricing, and cuisine filters.
- ✅ **Flexible Subscription Passes**: Daily, Weekly (7-day), and Monthly (30-day) meal plans with up to 25% savings.
- ✅ **Zero-Penalty Pause Guarantee**: Subscribers can pause upcoming delivery dates in 1-tap without losing meal credits.
- ✅ **FSSAI & Hygiene Audits**: Transparent kitchen inspection scores, verified badges, and nutritional breakdowns.
- ✅ **Multi-Role Portals**: Dedicated operational dashboards for Customers, Home Cooks, Delivery Riders, and Admins.
- ✅ **Live Insulated Dabba Tracking**: 5-step interactive delivery tracker with partner contact details.

---

## 🎯 Project Objectives & Scope

### Primary Objectives
- **Digitize Tiffin Operations**: Provide automated ordering, recurring billing, and schedule management.
- **Empower Local Home Cooks**: Give home chefs a digital storefront to monetize their culinary skills.
- **Improve Food Accessibility**: Enable students and professionals to access wholesome, hygienic meals on budget.
- **Faceted Discovery**: Seamless search by meal type (Veg, Satvik Jain, Non-Veg), cuisine, rating, and price.

### Secondary Objectives
- Support local micro-entrepreneurs and women home-cooks.
- Provide full transparency in nutritional values (calories & protein) and ingredients.
- Facilitate scalable multi-city platform onboarding across India.

### Scope of Work
- **In-Scope**: Fully responsive web application, multi-role RBAC, custom thali builder, subscription management with date pause engine, live order tracking, coupon system, dispute management, admin analytics hub, and MongoDB persistence.
- **Out of Scope (Phase 1)**: Native mobile apps (iOS/Android), automated AI meal recommendations, and third-party cloud-kitchen integrations.

---

## ✨ Key Features by Role

### 👤 1. Customer Features
- 🔐 **Secure Authentication**: JWT-based registration and login with profile management.
- 📍 **Multi-City Discovery**: Explore verified home kitchens across **Jaipur, Ajmer, Delhi NCR, Mumbai, Pune, Bengaluru, and Ahmedabad**.
- 🔍 **Advanced Faceted Filters**:
  - **Meal Types**: Pure Veg, Satvik Jain, Non-Veg / Mixed.
  - **Price Range**: Under ₹50, ₹50–₹100, ₹100–₹150, ₹150+.
  - **Cuisines**: Rajasthani, North Indian, Punjabi, Gujarati, South Indian, Maharashtrian, Bengali, Healthy & Fit.
  - **Meal Passes**: Daily, 7-Day Passes, 30-Day Passes.
  - **Sort By**: Top Rated, Price (Low to High / High to Low), Most Popular, Newest.
- 🍱 **Rich Kitchen Profiles & Menus**:
  - FSSAI registration & Hygiene audit verification badges.
  - Categorized dishes (Thalis, Curries, Rotis & Breads, Rice Bowls, Healthy Combos).
  - Nutritional breakdowns (Calories & Protein values per serving).
  - Weekly rotational menu previews.
- 🥘 **Interactive Thali Builder**: Customize personalized thalis with choice of sabzi, dal, bread, rice, and sweet.
- 🛍️ **Dabba Cart System**: Single-kitchen isolation safeguards, packaging preferences (Steel Tiffin vs Eco Box), delivery time slot selection (Lunch / Dinner), and promotional coupon discounts.
- 📅 **Subscription Meal Passes**:
  - Daily, Weekly (7 meals), and Monthly (30 meals) passes.
  - **Zero-Penalty Date Pause Tool**: Interactive calendar tool allowing customers to pause upcoming deliveries in 1-tap while preserving remaining meal credits.
- 🚚 **Live Insulated Dabba Tracker**:
  - Real-time 5-stage progress pipeline: `Order Confirmed` ➔ `Fresh Homestyle Cooking` ➔ `Packed in Steel Dabba` ➔ `Rider Out for Delivery` ➔ `Delivered at Doorstep`.
  - Delivery partner card with direct call trigger and vehicle details.
- ⭐ **Ratings & Reviews**: Post verified 1–5 star reviews and ratings after receiving orders.
- 🎫 **Dispute / Complaint Desk**: Raise support tickets with urgency levels (`LOW`, `MEDIUM`, `HIGH`) and track administrative resolutions.

---

### 👩‍🍳 2. Home Cook / Provider Features
- 📊 **Executive Kitchen Dashboard**: Real-time KPI summary (Today's Orders, Active Subscribers, Monthly Revenue, Kitchen Rating).
- 🍽️ **Menu Management (CRUD)**:
  - Add, edit, and delete dishes with nutritional info and categories.
  - Real-time 1-click stock toggle (`In Stock` / `Sold Out`).
- 📅 **Meal Plan Builder (CRUD)**: Create and configure daily, weekly, and monthly subscription packages with discount tiers.
- 📦 **Live Orders Pipeline**: Accept/reject incoming orders and update delivery stages in real-time (`ACCEPTED` ➔ `PREPARING` ➔ `OUT_FOR_DELIVERY` ➔ `DELIVERED`).
- 👥 **Subscription Queue**: Review and approve recurring meal pass requests.
- 📍 **Service Area & Timings**: Set operational delivery radius (in km), serviced localities, and lunch/dinner time slots.
- 💬 **Customer Review Replies**: Respond directly to customer feedback and reviews.

---

### 🛵 3. Delivery Rider Features
- 📋 **Live Delivery Dashboard**: View assigned pick-ups and order destinations.
- 🚀 **1-Click Status Updates**: Transition orders from `PICKED_UP` to `DELIVERED`.
- 🗺️ **Turn-by-Turn Route Details**: View customer drop address, special delivery notes, and phone numbers.
- 💵 **Earnings & Trip History**: Monitor daily completed deliveries and payout summaries.

---

### 👑 4. Admin Features (Platform Governance)
- 📈 **Executive Platform Dashboard**:
  - Platform-wide Gross Merchandise Value (GMV), active subscriptions, registered users, and total home kitchens.
  - Visual time-series revenue graphs and city-wise onboarding distribution charts.
- 🛡️ **Home Cook Verification Desk**: Review submitted kitchen registrations, inspect FSSAI details, approve with official **Verified Badge**, reject, or suspend accounts.
- 👥 **User Account Governance**: View all platform users (Customers, Providers, Riders) and toggle account status (`ACTIVE` / `SUSPENDED`).
- ⚖️ **Dispute Resolution Portal**: Review filed complaints, examine order history, take corrective actions, and add resolution notes.
- 🔄 **1-Click Database Reset Tool**: Instant seed reset to restore clean test data during demos and evaluation.

---

## 🛠️ Technology Stack

### Frontend
- **Framework & UI Library:** React 18 (Vite Bundler)
- **Styling Architecture:** Modern Vanilla CSS Design System with responsive mobile-first tokens & CSS Grid/Flexbox
- **Icons & Visuals:** Lucide React (`lucide-react`)
- **Celebration Effects:** Canvas Confetti (`canvas-confetti`)
- **State Management:** React Context API & Custom Reactive Hooks

### Backend
- **Runtime Environment:** Node.js (ES Modules)
- **Web Framework:** Express.js (`express`)
- **Authentication:** JSON Web Tokens (`jsonwebtoken`)
- **Password Security:** Salted Hash Encryption (`bcryptjs`)
- **Cross-Origin Security:** CORS (`cors`)
- **Environment Management:** Dotenv (`dotenv`)

### Database & Storage
- **Database Engine:** MongoDB
- **Object Data Modeling (ODM):** Mongoose (`mongoose`)
- **Resilient Fallback Storage:** File-backed persistent DatabaseStore (`data_store.json`) for seamless zero-config operation
- **Data Schemas:** User, Provider, MenuItem, MealPlan, Order, Subscription, Review, Complaint, Notification, Coupon

### Testing & Tooling
- **Testing Suite:** Custom Node.js Automated Integration & RBAC Test Suite (`tests/api.test.js`, `tests/rbac.test.js`)
- **Development Tool:** Concurrent Dev Runner (`concurrently`)
- **API Testing:** Postman / cURL

---

## 🔑 Demo Login Accounts

The application comes pre-loaded with sample accounts for all 4 roles. You can also use the **1-Click Quick Demo Login** buttons inside the app's Auth modal for instant access:

| Role | Email | Password | Access & Capabilities |
| :--- | :--- | :--- | :--- |
| 👤 **Customer** | `customer@homefeast.test` | `password123` | Browse kitchens, place orders, buy meal passes, pause delivery dates, live track dabbas, write reviews |
| 👩‍🍳 **Provider (Cook)** | `provider@homefeast.test` | `password123` | Kitchen dashboard, manage menu dishes, stock toggle, create meal plans, manage incoming orders |
| 🛵 **Delivery Rider** | `rider@homefeast.test` | `password123` | View assigned pick-ups, navigate delivery routes, update order status to delivered, track earnings |
| 👑 **Admin** | `admin@homefeast.test` | `password123` | Platform analytics & GMV metrics, approve/verify home cooks, user governance, dispute resolution |

---

## 🎟️ Active Promotional Coupon Codes

Test the server-side coupon discount engine during checkout using these codes:

| Coupon Code | Discount | Applicable Criteria |
| :--- | :--- | :--- |
| `FIRSTGHAR50` | **₹50 FLAT OFF** | Valid on first order (Min order ₹99) |
| `BATCH20` | **20% OFF** | Student & Batch special (Max discount ₹150) |
| `RAJASTHAN50` | **₹50 FLAT OFF** | Valid on authentic regional thalis |
| `HEALTHY20` | **20% OFF** | Valid on diet & low-oil healthy meal plans |

---

## 📁 Project Directory Structure

```plaintext
homefeast-tiffin-platform/
├── backend/
│   ├── config/              # Server configuration
│   ├── middleware/          # JWT authentication & RBAC middleware
│   ├── models/              # Mongoose Schemas (User, Provider, Order, etc.)
│   ├── routes/              # Modular Express REST API routes
│   │   ├── admin.js         # Platform governance & metrics
│   │   ├── auth.js          # Authentication & profile endpoints
│   │   ├── complaints.js    # Dispute desk endpoints
│   │   ├── menu.js          # Menu dishes & stock CRUD
│   │   ├── orders.js        # Order lifecycle & pipeline transitions
│   │   ├── plans.js         # Subscription meal passes CRUD
│   │   ├── providers.js     # Kitchen discovery & profiles
│   │   ├── reviews.js       # Verified customer reviews
│   │   ├── riders.js        # Rider dashboard & delivery updates
│   │   └── subscriptions.js # Subscription pass & pause dates engine
│   ├── seed/                # Rich seed dataset & Mongo seeder script
│   ├── tests/               # Automated API & RBAC test assertions
│   ├── db.js                # Mongoose connection & storage manager
│   ├── server.js            # Express application entrypoint
│   └── package.json         # Backend dependencies & scripts
├── frontend/
│   ├── public/              # Static assets & icons
│   ├── src/
│   │   ├── api/             # API client & HTTP request helpers
│   │   ├── components/      # Reusable UI components & modals
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── CheckoutModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OrderTrackerModal.jsx
│   │   │   ├── PlanCheckoutModal.jsx
│   │   │   ├── ProviderDashboard.jsx
│   │   │   ├── RiderDashboard.jsx
│   │   │   └── ThaliBuilder.jsx
│   │   ├── context/         # React Context (Auth, Cart, Location)
│   │   ├── pages/           # Application views (Home, Kitchens, Menu, Plans, etc.)
│   │   ├── styles/          # Design system stylesheet & tokens
│   │   ├── App.jsx          # Root application component
│   │   └── main.jsx         # Vite entrypoint
│   ├── vite.config.js       # Vite build configuration
│   └── package.json         # Frontend dependencies & scripts
├── package.json             # Root monorepo workspace & concurrently scripts
├── .env.example             # Example environment variables
├── API_DOCUMENTATION.md     # Detailed REST API specification
└── ARCHITECTURE.md          # Technical architecture & state machines
```

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (v6.0+) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Cloud Cluster
- **Git**: For version control

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/prathamsharma271105/HomeFeast.git
cd "tiffin service platform"
```

---

### 2️⃣ Environment Configuration

Create a `.env` file in the `backend/` directory (or in the project root) using `.env.example`:

```env
PORT=5000

# Local MongoDB Connection:
MONGODB_URI=mongodb://127.0.0.1:27017/homefeast

# Or MongoDB Atlas Cloud Connection:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/homefeast?retryWrites=true&w=majority

# JWT Authentication Secret:
JWT_SECRET=homefeast_super_secure_jwt_secret_key_2026
```

---

### 3️⃣ Install Dependencies

You can install dependencies for both frontend and backend from the root directory:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root directory
cd ..
```

---

### 4️⃣ Seed Database with Rich Sample Data

Populate MongoDB with sample users, verified home kitchens, categorized dishes, meal passes, and reviews:

```bash
# Option A: From root directory
npm run seed:mongo

# Option B: From backend directory
cd backend
npm run seed:mongo
```

---

### 5️⃣ Run the Application

You can run both backend and frontend concurrently with a single command from the project root:

```bash
# Run both Backend & Frontend simultaneously:
npm run dev
```

Or run them individually in separate terminal tabs:

```bash
# Terminal 1 - Backend Server (Port 5000)
npm run dev:backend
# or: cd backend && npm start

# Terminal 2 - Frontend Application (Port 5173)
npm run dev:frontend
# or: cd frontend && npm run dev
```

- **Frontend App**: Open [http://localhost:5173](http://localhost:5173) in your browser.
- **Backend API**: Accessible at [http://localhost:5000/api](http://localhost:5000/api).
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health).
- **MongoDB Status**: [http://localhost:5000/api/mongodb-status](http://localhost:5000/api/mongodb-status).

---

### 6️⃣ Run Automated Tests

Execute the automated end-to-end API test suite and RBAC verification tests:

```bash
# From project root:
npm test

# Or from backend folder:
cd backend
npm test
```

---

## 📡 REST API Overview

| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new Customer or Home Cook | Public |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile & role | Authenticated |
| `GET` | `/api/providers` | Discover kitchens with search, filters & pagination | Public |
| `GET` | `/api/providers/:id` | Get provider profile, dishes, plans & reviews | Public |
| `GET` | `/api/menu` | List all menu dishes with optional category filter | Public |
| `POST` | `/api/menu` | Create a new dish with nutritional information | Provider |
| `PATCH`| `/api/menu/:id/toggle-stock` | Toggle live item stock availability | Provider |
| `GET` | `/api/plans` | List available subscription meal packages | Public |
| `POST` | `/api/orders` | Place a meal order with coupon validation | Customer |
| `GET` | `/api/orders` | View customer order history / provider orders | Authenticated |
| `PATCH`| `/api/orders/:id/status` | Update live order progress stage | Provider / Admin |
| `POST` | `/api/subscriptions` | Purchase Daily, Weekly, or Monthly meal pass | Customer |
| `POST` | `/api/subscriptions/:id/pause-date` | Toggle zero-penalty pause on specific dates | Customer |
| `POST` | `/api/reviews` | Submit 1–5 star rating & feedback for order | Customer |
| `POST` | `/api/complaints` | Raise dispute ticket with priority level | Customer |
| `GET` | `/api/admin/dashboard` | Fetch platform GMV, charts, and governance stats | Admin |
| `PUT` | `/api/admin/providers/:id/approve` | Approve home cook & award Verified Badge | Admin |
| `POST` | `/api/admin/reset-database` | Reset database to initial pristine seed state | Admin |

> 📖 For full API request/response payloads, headers, and error codes, refer to [API_DOCUMENTATION.md](API_DOCUMENTATION.md).

---

## 📊 Key Performance Indicators (KPIs)

The platform actively aggregates and monitors business metrics for stakeholders:
- 👥 **User Growth**: Total registered customers, onboarded home cooks, and delivery partners.
- 📦 **Order Conversion & Volume**: Today's orders, monthly order velocity, and peak delivery time slots.
- 🔄 **Subscription Retention Rate**: Active recurring passes vs expired passes, pause-rate utilization.
- 💰 **Gross Merchandise Value (GMV)**: Total platform transaction value and monthly kitchen earnings.
- ⭐ **Quality & Hygiene Index**: Average customer rating per kitchen and FSSAI audit compliance rate.
- ⏱️ **Dispute Resolution Time**: Speed of resolving customer complaints and dispute closure rate.

---

## 🔒 Security & Non-Functional Highlights

- **Authentication & Authorization**: Stateless JSON Web Tokens (JWT) with strict Role-Based Access Control (RBAC) middleware verifying `CUSTOMER`, `PROVIDER`, `RIDER`, and `ADMIN` permissions.
- **Password Security**: Passwords salted and hashed with `bcryptjs` (10 rounds).
- **Fast Performance**: Sub-second REST API response times and Vite-powered client bundles loading in < 2 seconds.
- **Cart Isolation Engine**: Prevents cart corruption by ensuring all dishes in a single checkout belong to one home kitchen.
- **Graceful Resilience**: Built-in persistent file store fallback (`data_store.json`) ensuring uninterrupted operation during local development.

---

## 🚀 Future Roadmap & Enhancements

- [ ] **Payment Gateway & In-App Wallet**: Integration with Razorpay, Stripe, and UPI autopay mandates.
- [ ] **Mobile Applications**: Native iOS and Android apps using React Native.
- [ ] **Automated Meal Customization**: Calorie & macronutrient-targeted meal customizer for gym-goers and diabetics.
- [ ] **AI-Powered Meal Recommendations**: Machine learning suggestions based on user taste preferences and order history.
- [ ] **Live GPS Rider Tracking**: WebSocket-based real-time rider location tracking on interactive maps.
- [ ] **Multi-Lingual Interface**: Support for Hindi, Gujarati, Marathi, and other regional languages.

---

## 📄 License

This project is licensed under the ISC License.

---

<div align="center">

Made with ❤️ for homemade food lovers and passionate home cooks across India.

**[HomeFeast](https://github.com/prathamsharma271105/HomeFeast)** • Empowering Local Kitchens, Delivering Pure Homestyle Joy.

</div>
