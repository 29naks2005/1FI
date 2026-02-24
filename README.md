<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="https://media.licdn.com/dms/image/v2/C560BAQFFTzZlY1lYpQ/company-logo_200_200/company-logo_200_200/0/1630656041189/1fi_logo?e=2147483647&v=beta&t=A30y185J4YJ4s7tW2xZQQeA1R9OeyhL3eK8NZZZ8c" alt="Logo" width="100" height="100">

  <h1 align="center">1FI Full Stack Internship Assignment</h1>

  <p align="center">
    A dynamic full-stack e-commerce web application featuring products, variations, and EMI plans!
    <br />
    <br />
    <a href="#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>

<!-- SHIELDS -->
<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>
<br />

## 📖 Table of Contents
<details>
  <summary>Click to expand</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation--setup">Installation & Setup</a></li>
      </ul>
    </li>
  </ol>
</details>

<br />

---

## 🚀 About The Project
This project is an internship assignment for 1FI, demonstrating a modern, full-stack e-commerce application. It includes a responsive frontend built with React and Vite, beautifully structured with custom CSS and Lucide React icons. On the backend, an Express server connects to a PostgreSQL database via Prisma ORM to serve product data, specific variant configurations (e.g., color, storage), and dynamic EMI plans.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Routing:** React Router DOM
- **Data Fetching:** Axios
- **Icons:** Lucide React
- **Styling:** CSS (Flexbox/Grid, Custom CSS vars)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database ORM:** Prisma
- **Database:** PostgreSQL (via Supabase/Neon)

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🗄 Database Schema

The database relies on three core entities: **Product**, **ProductVariant**, and **EmiPlan**.

### 1. `Product` Model
Stores base product information.
- `id` (Int, Primary Key)
- `name` (String)
- `slug` (String, Unique)
- `description` (String)
- `mrp` (Float)
- `basePrice` (Float)
- `specs` (JSON Optional)
- *Relations:* One-to-Many with `ProductVariant` and `EmiPlan`

### 2. `ProductVariant` Model
Stores specific product configurations (e.g. iPhone 15 Pink 128GB vs iPhone 15 Blue 256GB).
- `id` (Int, Primary Key)
- `slug` (String, Unique)
- `color` (String)
- `storage` (String)
- `imageUrl` (String)
- `price` (Float)
- `isDefault` (Boolean)
- *Relations:* Belongs to `Product`

### 3. `EmiPlan` Model
Stores financing/EMI plan options for products.
- `id` (Int, Primary Key)
- `tenureMonths` (Int)
- `interestRate` (Float)
- `monthlyAmount` (Float)
- `cashback` (Float)
- *Relations:* Belongs to `Product`

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🌐 API Endpoints

The backend Express server currently exposes a robust `products` API endpoint. Base URL: `http://localhost:3000/api`

### `GET /products`
Fetches a list of all products, including their variants and EMI plans.

**Example Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Smartphone X",
    "slug": "smartphone-x",
    "description": "The ultimate smartphone.",
    "mrp": 79999,
    "basePrice": 69999,
    "specs": { "screen": "6.1inch", "battery": "4000mAh" },
    "variants": [
      {
        "id": 1,
        "color": "Midnight Black",
        "storage": "128GB",
        "price": 69999,
        "isDefault": true
      }
    ],
    "emiPlans": [
      {
        "id": 1,
        "tenureMonths": 6,
        "interestRate": 0,
        "monthlyAmount": 11666.50
      }
    ]
  }
]
```

### `GET /products/:slug`
Fetches detailed information about a specific product retrieved by its unique slug, including its variants and EMI options.

**Example Response (200 OK):**
```json
{
  "id": 1,
  "name": "Smartphone X",
  "slug": "smartphone-x",
  "basePrice": 69999,
  "variants": [...],
  "emiPlans": [...]
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
* npm and Node.js installed (> v18.0)
* A PostgreSQL database instance

### Installation & Setup

1. **Clone the repository** (if you haven't already):
   ```sh
   git clone <YOUR_REPO_URL>
   cd 1FI
   ```

2. **Backend Setup**:
   Navigate to the backend directory and install dependencies:
   ```sh
   cd backend
   npm install
   ```

3. **Environment Variables**:
   In the `backend` directory, create a `.env` file and add your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"
   DIRECT_URL="postgresql://user:password@host:port/dbname?schema=public"
   PORT=3000
   ```

4. **Initialize Database via Prisma**:
   Push the schema to your database and generate the Prisma Client:
   ```sh
   npx prisma generate
   npx prisma db push
   ```
   Seed the database with initial products, variants, and EMI plans:
   ```sh
   npm run seed
   ```

5. **Start the Backend Server**:
   ```sh
   npm run dev
   ```
   *The server should now be running on `http://localhost:3000`.*

6. **Frontend Setup**:
   Open a new terminal window/tab, navigate to the frontend folder, and install dependencies:
   ```sh
   cd ../frontend
   npm install
   ```

7. **Start the Frontend Application**:
   ```sh
   npm run dev
   ```
   *The frontend should now be running! Open your browser to the local address provided by Vite (usually `http://localhost:5173`).*

<p align="right">(<a href="#top">back to top</a>)</p>

---
*Created by Nakul Sharma for the 1FI Internship Assignment.*
