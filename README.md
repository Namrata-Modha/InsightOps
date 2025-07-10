# 📊 InsightOps

InsightOps is an internal IT and business system monitoring dashboard built with Laravel + Inertia + React. It supports role-based access, log management, KPI visualization, document uploads, and CSV exports — all tailored for IT analysts and administrators.

---

## 🚀 Features

### 🔐 Role-Based Access
- Analyst and Admin roles with separate dashboards
- Middleware enforced at route level (no Kernel aliasing)

### 📈 Analyst Dashboard
- Welcome panel with profile summary
- Recent audit activity (action log)
- Weekly activity line chart (Recharts)
- Navigation cards for Logs, KPIs, Documents

### 📜 Logs (Access + Audit)
- Pagination + keyword + date range filtering
- CSV export of access logs and audit trails

### 📁 Documents
- Secure upload form for PDFs/images
- Title + file_path + uploaded_by fields
- Document list with download links
- CSV export supported

### 📊 KPIs
- Uptime (static or real)
- Active users via sessions
- Logins over past 7 days (chart)

### 📤 CSV Exports
- Analyst can export logs and documents as `.csv`
- Clean headers, timestamped filenames

### 🧑 Profile Editor
- Analyst can update their name directly
- Profile summary always visible

### ⚙️ Built With
- Laravel 12.x (PHP 8.2+)
- PostgreSQL
- Inertia.js + React
- TailwindCSS + Recharts
- Jetstream/Auth scaffolding

---

## 📂 Folder Structure (Relevant)

app/
└── Http/
└── Controllers/
├── AnalystController.php
├── LogController.php
├── DocumentController.php
└── KpiController.php

resources/
└── js/
├── Layouts/
│ └── AuthenticatedLayout.jsx
└── Pages/
├── AnalystDashboard.jsx
└── Analyst/
├── Logs.jsx
├── KPIs.jsx
└── Documents.jsx


## 🧪 Setup Instructions

1. **Clone repo**

git clone https://github.com/your-username/insightops.git
cd insightops
Install dependencies

composer install
npm install
Create .env

cp .env.example .env
php artisan key:generate
Configure DB
Edit .env and set:

ini
DB_CONNECTION=pgsql
DB_DATABASE=insightops
DB_USERNAME=youruser
DB_PASSWORD=yourpassword

Run migrations + seeders

php artisan migrate
php artisan db:seed
Start servers


php artisan serve
npm run dev
👤 Default Roles
You can create users via tinker:

php
\App\Models\User::create([
  'name' => 'Analyst A',
  'email' => 'analyst@example.com',
  'password' => bcrypt('password'),
  'role' => 'analyst'
]);
Admin users should be created with 'role' => 'admin'.

Ready for Production?
Use:


npm run build
php artisan config:cache
Consider:

🐳 Docker setup (coming soon)

☁️ Deploy to Render, Forge, DigitalOcean

💡 License
MIT — open to use, learn, and build from.

✨ Author
Made with ❤️ by Namrata Modha

