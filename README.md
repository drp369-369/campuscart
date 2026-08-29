# CampusCart

> **Buy Smart. Sell Easy. Campus Connected.**

CampusCart is a dedicated student-to-student web marketplace built for college communities. It enables university students to buy and sell used textbooks, calculators, electronics, lab equipment, furniture, study materials, and other campus essentials at affordable prices.

---

## 📌 Problem Statement
Students frequently accumulate unused textbooks, calculators, lab coats, and electronics after semesters end. At the same time, incoming and junior students need these exact items at affordable prices. General online marketplaces (like OLX or eBay) are not tailored to campus communities, lack trust verification, and make on-campus meetups difficult to coordinate.

## 💡 Solution
CampusCart provides a secure, streamlined, college-focused web platform where verified students can:
1. Browse available used campus essentials with live search and category filtering.
2. View detailed product specifications, condition, price in INR, and seller location.
3. Authenticate securely with student credentials.
4. List their own items for sale in under a minute with price, condition, and image details.
5. Directly connect with fellow students on campus for safe transactions.

---

## 🚀 Features (Phase 1 MVP)

- **Marketplace & Discovery**:
  - Hero banner with quick action prompts.
  - Interactive category filter chips (*Books, Electronics, Calculators, Lab Equipment, Furniture, Stationery, Other*).
  - Live, case-insensitive keyword search against backend listings.
  - Responsive product grid with pricing, category tags, condition badges, and campus location.
- **Product Details View**:
  - Full-resolution product imagery and complete descriptions.
  - Seller profile card and campus affiliation.
  - Contact Seller action revealing direct communication channels.
  - Dynamic ownership controls (listing owner can delete their listing).
- **Listing Creation**:
  - Protected route requiring student login.
  - Comprehensive form validation (title, description, INR pricing, category, condition, campus, image URL).
  - Instant image suggestions for standard student items.
- **Authentication & Security**:
  - User registration with name, university email, campus, and hashed password.
  - JWT-based authentication with token persistence.
  - Password hashing via `bcryptjs`.
  - Protected API routes and client-side route guards (`<ProtectedRoute>`).
- **Modern Responsive Design**:
  - Polished startup aesthetic with custom CSS tokens, modern typography (*Plus Jakarta Sans* & *Inter*), subtle card elevations, and clear call-to-actions.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Routing**: React Router v6
- **HTTP Client**: Axios (with centralized interceptors & token injection)
- **Icons**: Lucide React
- **Styling**: Custom Modern Vanilla CSS Design System with CSS variables

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **CORS & Middleware**: `cors`, `dotenv`, centralized error handling

---

## 📂 Project Structure

```text
campuscart/
├── client/                      # React/Vite Frontend
│   ├── src/
│   │   ├── assets/              # Static assets
│   │   ├── components/          # Reusable UI components (Navbar, Footer, ProductCard, etc.)
│   │   ├── context/             # AuthContext for global user state
│   │   ├── hooks/               # Custom React hooks
│   │   ├── layouts/             # Page layouts
│   │   ├── pages/               # Marketplace, ProductDetails, CreateListing, Login, Register
│   │   ├── services/            # Axios API service layer (authService, productService)
│   │   ├── utils/               # Formatting and utility helpers
│   │   ├── App.jsx              # Main React route configuration
│   │   ├── index.css            # Global CSS design tokens and component styling
│   │   └── main.jsx             # React DOM root entrypoint
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Express Backend
│   ├── config/                  # MongoDB Mongoose database connection
│   ├── controllers/             # Auth and Product business logic
│   ├── middleware/              # JWT auth guard & centralized error handling
│   ├── models/                  # User and Listing Mongoose schemas
│   ├── routes/                  # REST API routes (/api/auth, /api/products)
│   ├── seeders/                 # Database seed script with realistic campus items
│   ├── utils/                   # Backend helpers
│   ├── server.js                # Express app bootstrap
│   └── package.json
│
├── .gitignore
├── .env.example
├── README.md
└── package.json                 # Monorepo management scripts
```

---

## 📋 Database Models

### 1. `User` Schema
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Required, Trim | Full name of the student |
| `email` | String | Required, Unique, Lowercase | University email address |
| `password` | String | Required, Min 6, Hashed | Bcrypt hashed password |
| `campus` | String | Required | College or campus name |
| `role` | String | Enum: `['student', 'admin']` | User permissions role (default: `student`) |
| `timestamps` | Date | `createdAt`, `updatedAt` | Auto-generated timestamps |

### 2. `Listing` Schema
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Required, Trim | Item title (max 120 chars) |
| `description`| String | Required, Trim | Full item description |
| `price` | Number | Required, Min 0 | Price in INR (₹) |
| `category` | String | Required, Enum | Books, Electronics, Calculators, Lab Equipment, Furniture, Stationery, Other |
| `condition` | String | Required, Enum | New, Like New, Good, Fair |
| `imageUrl` | String | Required | Product image link |
| `campus` | String | Required | Location / Campus |
| `seller` | ObjectId | Ref: `User`, Required | Reference to the student who posted |
| `status` | String | Enum: `['available', 'sold']` | Availability state (default: `available`) |
| `timestamps` | Date | `createdAt`, `updatedAt` | Auto-generated timestamps |

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new student account.
- `POST /api/auth/login` — Authenticate student & receive JWT token.
- `GET /api/auth/me` — *(Protected)* Retrieve current authenticated user profile.

### Products / Listings (`/api/products`)
- `GET /api/products` — Retrieve all available listings (supports `?search=keyword` & `?category=Name`).
- `GET /api/products/:id` — Retrieve single listing details populated with seller details.
- `POST /api/products` — *(Protected)* Create and publish a new item listing.
- `PUT /api/products/:id` — *(Protected)* Update existing listing (owner only).
- `DELETE /api/products/:id` — *(Protected)* Delete a listing (owner only).

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Running locally on default port `27017` or MongoDB Atlas URI)

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone <repository-url>
cd FSD_PROJECT

# Install root, backend, and frontend packages
npm install
npm --prefix campuscart/server install
npm --prefix campuscart/client install
```

### 2. Configure Environment Variables
Copy `.env.example` to `campuscart/server/.env` and `campuscart/client/.env`:

```bash
# In campuscart/server/.env:
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/campuscart
JWT_SECRET=campuscart_super_secret_jwt_key_2026_ci1
CLIENT_URL=http://localhost:5173

# In campuscart/client/.env:
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Seed Realistic Campus Listings
Populate the database with sample student accounts and realistic items:
```bash
npm --prefix campuscart/server run seed
```

### 4. Run the Application
In separate terminal windows:

**Start Backend Server:**
```bash
cd campuscart/server
npm run dev
# Server will start on http://localhost:5000
```

**Start Frontend Client:**
```bash
cd campuscart/client
npm run dev
# Vite client will start on http://localhost:5173
```

---

## 👥 Development Team

| Member | Role | Key Contributions |
| :--- | :--- | :--- |
| **Deep** | Project Lead, Architecture & Authentication | Monorepo scaffolding, Express backend, MongoDB & Mongoose setup, JWT authentication, AuthContext, Protected routes, Integration & Verification |
| **Bhavana** | Marketplace & Discovery | Marketplace UI, Hero section, Product cards, Category filter chips, Search bar UI, Marketplace API integration |
| **Chethan** | Listings & Product APIs | Listing Mongoose schema, Product REST API controllers & routes, Create Listing page, Product Details page, Validation & Ownership checks |
| **Chinmayee** | UI Design, Responsiveness & QA | Reusable UI components (Buttons, Inputs, Spinners, States), Design system in CSS, Responsive layouts, Project documentation |

---

## 📄 License
ISC License. Built for educational and collegiate marketplace demonstration.
