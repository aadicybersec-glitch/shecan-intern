# 🌌 She Can Foundation - Advanced Full-Stack digital NGO platform

A highly engineered, emotionally engaging, and visually unforgettable digital platform for the **She Can Foundation**. This application is structured to transcend standard project expectations, delivering startup-grade MVC backend security, Awwwards-level cinematic micro-interactions, hardware-accelerated momentum scrolling, and a high-fidelity SaaS-style analytical admin dashboard.

---

## 🎨 Visual Language & Experience Philosophy

The She Can platform is designed less like navigating a conventional webpage and more like entering an immersive, cinematic interactive environment.

- **Dark Futuristic Luxury**: Built on deep carbon blacks (`#050505`, `#0a0a0a`), ambient glowing neon blobs, and ultra-premium translucent glassmorphism panels.
- **Atmospheric Lighting Philosophy**: Glow intensities, radial blur sweeps, and edge flares function as subtle navigational guides, steering recruiter attention toward primary CTAs, statistical metrics, and authentication flows.
- **Narrative Progression**: Visitors are guided through a structured 5-step experiential flow:
  1. *Curiosity* — sparked by the keyline logo pre-loader.
  2. *Emotional Engagement* — driven by split-screen mission copy.
  3. *Visual Admiration* — locked in by GSAP staggered reveals and Lenis scrolling momentum.
  4. *Technical Trust* — earned via a dynamic custom cursor and real-time validation checks.
  5. *Satisfaction* — rewarded with confetti cascades on message submissions.

---

## ⚡ Engineered Technology Stack

### Frontend Architecture
- **Vite + React.js** — Lightweight reactive scaffolding for high-speed delivery.
- **Tailwind CSS** — Custom styling tokens, glassmorphism overlays, and neon glow utility classes.
- **Lenis Smooth Scroll** — Butter-smooth, physical-momentum mousewheel scrolling.
- **GSAP & Framer Motion** — GPU-accelerated spring animations, page transitions, and staggered scroll-reveal handlers.
- **React Hook Form + Zod** — Client-side validation ensuring zero layout thrashing or input error leakage.
- **Recharts** — Responsive vector line and bar chart rendering for rich SaaS metrics.

### Backend Infrastructure
- **Node.js + Express.js** — Modular Model-View-Controller REST API environment.
- **Mongoose ODM** — Document database mapping with field index optimizations.
- **Helmet & CORS** — Secure HTTP headers and origin permissions.
- **Express Rate Limit** — Network rate limit guards to block brute-force authorizations and API spam.
- **JWT & BcryptJS** — Encryption layer salting passwords and authorizing protected route cookies.
- **Offline JSON Database Fallback** — Advanced failover database mapping local JSON operations when Mongo clusters are disconnected.

---

## 🔑 Recruiter Evaluation Mode (Zero Friction)

To maximize review efficiency and ensure immediate operational testing out-of-the-box, the system includes:

### 1. Zero-Config Database Failover
If no `MONGO_URI` is provided in environment parameters, the Express backend **automatically fails over to an offline JSON file database** (`server/local_database.json`). You can submit contact messages, log in, delete logs, and filter analytics seamlessly. It acts like a live database with zero setup friction!

### 2. Proactive Database Seeder
Upon backend boot (if MongoDB is connected), the server checks the user collections. If empty, it **automatically hashes, salts, and seeds the default admin credentials** into the database:
- **Admin Email**: `admin@shecan.org`
- **Access Password**: `DemoAccess@2026`

### 3. One-Tap Login Autofill
The administrative Login page contains a glowing evaluation prompt. Clicking it automatically populates the email and password inputs with micro-animations, letting you explore the analytical dashboard instantly.

---

## 🏗️ Clean Scalable Folder Architecture

### Frontend Layout (`src/`)
```
src/
├── assets/                  # Media and brand graphics
├── components/
│   ├── ui/                  # Button, Glow, GlassCard, CustomCursor
│   ├── cards/               # StatCard, FeatureCard, Testimonial
│   ├── loaders/             # Cinematic pre-loader
│   ├── navbar/              # Sticky Glassmorphism Navbar
│   ├── forms/               # Zod contact forms with Toast alerts
│   └── dashboard/           # SaaS Sidebar, charts, tables
├── pages/                   # Home, Login, SaaS Dashboard pages
├── hooks/                   # useLenis smooth scroll, useAuth session hooks
├── services/                # Axios centralized API instance
├── context/                 # AuthContext session states
├── routes/                  # Route maps and ProtectedRoute shields
└── styles/                  # Custom index.css styles and keyframes
```

### MVC Backend Layout (`server/`)
```
server/
├── config/                  # Database connections & fallbacks
├── controllers/             # authController, submitController
├── middleware/              # rateLimiters, JWT guards, error interceptors
├── models/                  # User and Submission mongoose schemas
├── routes/                  # API routing endpoints
├── utils/                   # JWT generation helpers
└── server.js                # Express entrypoint
```

---

## 🚀 Quickstart Local Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 📁 Step 1: Clone and Set Up Environment
Configure your local parameters inside the root `.env.example` file (or copy it to a new file named `.env`):
```bash
# Clone the codebase, open a terminal in the project directory
cp .env.example .env
```

### 🎨 Step 2: Initialize & Launch Frontend
Open a terminal in the root directory to install packages and spin up the Vite development server:
```bash
# Install packages
npm install

# Run the frontend locally (Vite default: http://localhost:5173)
npm run dev
```

### 📡 Step 3: Initialize & Launch Backend REST API
Open a secondary terminal inside the `/server` folder to install dependencies and run the Express engine:
```bash
# Enter server directory
cd server

# Install backend dependencies
npm install

# Start the API server in development mode (Express default: http://localhost:5000)
npm run dev
```

---

## 📘 REST API System Documentation

The backend REST API is constructed as a secure MVC interface.

### 1. Administrative Login Session
- **Endpoint**: `POST /api/auth/login`
- **Security**: Guarded by `loginLimiter` (brute-force defense).
- **Request Body**:
  ```json
  {
    "email": "admin@shecan.org",
    "password": "DemoAccess@2026"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "email": "admin@shecan.org",
      "role": "SuperAdmin",
      "mode": "Live"
    }
  }
  ```

### 2. Submit Encrypted Contact Message
- **Endpoint**: `POST /api/submissions`
- **Security**: Guarded by `submitLimiter` (anti-spam defense).
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Inquiry regarding Technical Cohort",
    "message": "Hello She Can Team, I would love to learn more about..."
  }
  ```
- **Response (210 Created)**:
  ```json
  {
    "success": true,
    "submission": {
      "_id": "664c8d929...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "subject": "Inquiry regarding Technical Cohort",
      "message": "...",
      "createdAt": "2026-05-27T00:30:00.000Z"
    }
  }
  ```

### 3. Fetch Inbox Messages (Admin Only)
- **Endpoint**: `GET /api/submissions`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "submissions": [
      {
        "_id": "664c8d929...",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "subject": "Inquiry regarding Technical Cohort",
        "message": "...",
        "createdAt": "2026-05-27T00:30:00.000Z"
      }
    ]
  }
  ```

### 4. Purge Message Record (Admin Only)
- **Endpoint**: `DELETE /api/submissions/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Record purged successfully."
  }
  ```

---

## ⚡ Performance Optimization & Security Auditing
- **Zero Paint Reflows**: All animations are mapped to GPU-hardware accelerated variables (`opacity`, `transform: translate3d`) avoiding expensive browser reflow processes.
- **Database Index optimization**: Added compound schema indexes on database models to guarantee stable response payloads on scaling records.
- **Request Sanitization**: Implements string sanitization mechanisms to protect endpoints from script sequences, XSS, and SQL/NoSQL injections.
- **Dynamic Render Trimming**: Leverages `useMemo` and `useCallback` inside admin charting dashboards to batch computations and prevent unnecessary component re-renders.

---

## 🚀 Final Objective

This platform represents professional **product-thinking**, Awwwards-level visual storytelling, backend security, and resilient software craftsmanship. It is built to leave an unforgettable technical impression on any senior engineer or CTO who evaluates it.
