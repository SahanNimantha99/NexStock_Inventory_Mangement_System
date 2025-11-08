# NextStock

**A complete inventory management system** built with **Next.js 15**, **Stack Auth**, **Prisma**, and **PostgreSQL**. From secure authentication to real-time analytics, product CRUD, low stock alerts, and financial tracking — this is a **production-ready full-stack application**.

Perfect for developers learning modern web development, full-stack architecture, or building SaaS business tools.

## Tech Stack

| Technology         | Purpose |
|--------------------|--------|
| **Next.js 15**     | App Router, Server Components, Server Actions |
| **React 19**       | Latest React features and performance |
| **TypeScript**     | Type safety and developer experience |
| **TailwindCSS**    | Rapid, responsive, and maintainable styling |
| **Stack Auth**     | Modern auth (replacement for NextAuth.js) |
| **Prisma**         | Type-safe ORM with schema migrations |
| **PostgreSQL**     | Reliable, scalable relational database |
| **Lucide Icons**   | Beautiful, consistent SVG icons |
| **Recharts**       | Interactive data visualization |
| **Vercel**         | Seamless deployment and hosting |

---

## Features

- **Secure Authentication** – Sign up / Log in with Stack Auth  
- **Real-time Dashboard** – Inventory overview, charts, and KPIs  
- **Full Product CRUD** – Add, edit, delete, and view products  
- **Search & Filter** – Instant search with category/price filters  
- **Smart Pagination** – Efficient loading for large datasets  
- **Low Stock Alerts** – Visual warnings and notifications  
- **Inventory Valuation** – Track total stock value in real-time  
- **Analytics Charts** – Trends, top products, stock movement  
- **Fully Responsive** – Works on mobile, tablet, and desktop  
- **Modern UI/UX** – Clean design with dark mode support  
- **Server Actions** – Mutation handling without API routes  
- **Live Updates** – Instant UI refresh on data changes  

---

## Quick Start

### Prerequisites

- **Node.js** `v18` or higher
- **Git**
- **PostgreSQL** (local or [Neon](https://neon.tech), [Supabase](https://supabase.com), etc.)

---

### Clone and Run

```bash
git clone https://github.com/yourusername/nextjs-fullstack-inventory.git
cd nextjs-fullstack-inventory
npm install
```

### Environment Setup

1. Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/inventory_db"
NEXT_PUBLIC_STACK_PROJECT_ID="your_stack_project_id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your_publishable_key"
STACK_SECRET_SERVER_KEY="your_secret_key"
```

2. Set up your database:

```bash
npx prisma migrate dev
npx prisma generate
```

3. Start the development server:

```bash
npm run dev
```

Your app will be available at: [http://localhost:3000](http://localhost:3000)

---
