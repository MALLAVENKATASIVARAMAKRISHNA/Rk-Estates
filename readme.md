# 🏗️ RK Estates — Real Estate Platform with Auto Plot Division & 3D Viewer

> A full-stack real estate web platform where admins define land dimensions, the system automatically divides land into plots, and buyers explore each plot through an interactive 3D view.

---

## 📌 Project Overview

**RK Estates** is a role-based real estate web application with two distinct user types — **Admin** and **Buyer**.

- **Admin** creates a project by entering land dimensions and the desired number of plots. The system automatically divides the land into equal plots and generates a 3D visualization for each one.
- **Buyers** log in, browse projects, select a plot from an interactive layout, and view a 3D model of that specific plot — no site visit needed.

---

## ✨ Features

### 👤 Buyer Features
- 🔐 Secure login & signup with JWT authentication
- 🏘️ Browse all available real estate projects
- 🗺️ Click a project to see the auto-generated plot grid layout
- 🧊 Select any plot to view its interactive 3D model
- 📋 View plot details — dimensions, area, price, facing, status
- 📩 Submit an enquiry directly from the plot page
- 🔎 Filter plots by size, price, and availability

### 🛠️ Admin Features
- 🔑 Separate admin login with protected dashboard
- ➕ Create a new project by entering:
  - Project name, location, description
  - Total land dimensions (length × width in feet/meters)
  - Number of plots to divide the land into
- ⚙️ **Auto Plot Division** — system calculates and assigns dimensions to each plot automatically
- 🧊 **Auto 3D Generation** — a 3D model is procedurally generated for each plot using its computed dimensions
- 📊 Manage plot status (Available / Booked / Sold)
- 🗑️ Edit or delete projects and plots

---

## 🔄 System Flow

### Admin Flow
```
Admin Login
     ↓
Admin Dashboard
     ↓
Create New Project
  → Enter land dimensions (e.g. 200ft × 150ft)
  → Enter number of plots (e.g. 12)
     ↓
System Auto-Divides Land into Plots
  → Calculates each plot's dimensions
  → Assigns plot number, area, facing direction
     ↓
System Auto-Generates 3D View per Plot
  → Procedural 3D mesh created from plot dimensions
  → Linked to each plot record in SQLite3 database
     ↓
Project Published — Visible to Buyers
```

### Buyer Flow
```
Buyer Login / Signup
     ↓
Dashboard — Browse All Projects
     ↓
Click a Project — View Interactive Plot Grid
     ↓
Click a Plot — See Plot Details + 3D View
     ↓
Submit Enquiry / Contact Agent
```

---

## 🧠 Auto Plot Division Logic

When an admin creates a project, the backend runs a **plot division algorithm**:

1. Takes total land `length × width` (e.g. 200ft × 150ft = 30,000 sq ft)
2. Divides into `N` equal plots (e.g. 12 plots → ~2,500 sq ft each)
3. Arranges plots in a grid layout (rows × columns computed automatically)
4. Assigns each plot:
   - Unique plot number
   - Computed dimensions (length × width)
   - Facing direction (East/West/North/South based on grid position)
   - Default status: `Available`
5. Stores all plot records in SQLite3 linked to the project

---

## 🧊 Auto 3D View Generation

Each plot's 3D model is **procedurally generated** using Three.js based on its stored dimensions — no manual `.glb` file upload needed:

- A 3D rectangular land parcel mesh is rendered from the plot's actual length & width
- Surrounding plots are shown as faded neighboring blocks for spatial context
- Directional compass labels (N / S / E / W) are displayed
- Road and boundary lines drawn based on plot position in the grid
- Orbit controls allow rotate, zoom, and pan
- Models are generated on-the-fly in the browser from dimension data returned by the API

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js / Next.js | UI framework & routing |
| Three.js | Procedural 3D plot generation & rendering |
| Tailwind CSS | Styling & responsive layout |
| Framer Motion | Animations & transitions |

### Backend
| Technology | Purpose |
|------------|---------|
| Python 3.11+ | Backend language |
| FastAPI | REST API framework with automatic docs |
| SQLite3 | Lightweight file-based relational database |
| SQLAlchemy | ORM for database models & queries |
| python-jose | JWT token creation & verification |
| passlib + bcrypt | Password hashing |
| Uvicorn | ASGI server to run FastAPI |

### Dev Tools
- Git & GitHub
- FastAPI Swagger UI (auto-generated at `/docs`)
- Postman (API testing)
- Figma (UI/UX design)
- Vercel (frontend) / Render or Railway (backend deployment)

---

## 🗂️ Folder Structure

```
rk-estates/
├── client/                              # Frontend (React/Next.js)
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Layout.jsx
│       │   ├── ProjectCard.jsx
│       │   ├── PlotCard.jsx
│       │   ├── PlotGrid.jsx             # Visual plot grid with status colours
│       │   ├── PlotInfoPanel.jsx
│       │   └── EnquiryButton.jsx
│       ├── pages/
│       │   ├── login.jsx
│       │   ├── register.jsx
│       │   ├── dashboard.jsx
│       │   ├── projects/
│       │   │   ├── index.jsx            # All projects listing
│       │   │   └── [id].jsx             # Project detail + plot grid
│       │   ├── plot/
│       │   │   └── [id].jsx             # Plot detail + 3D viewer
│       │   └── admin/
│       │       ├── dashboard.jsx        # Admin home
│       │       ├── create-project.jsx   # Create project + plot division form
│       │       └── manage/
│       │           └── [id].jsx         # Edit project / update plot statuses
│       ├── three/
│       │   ├── PlotViewer.jsx           # Three.js canvas component
│       │   ├── generatePlot3D.js        # Procedural 3D mesh from dimensions
│       │   └── controls.js             # Orbit controls setup
│       ├── context/
│       │   └── AuthContext.jsx
│       └── utils/
│           └── plotDivision.js          # Frontend grid calculation helpers
│
├── server/                              # Backend (Python + FastAPI)
│   ├── main.py                          # FastAPI app entry point
│   ├── database.py                      # SQLite3 connection + SQLAlchemy setup
│   ├── models.py                        # SQLAlchemy ORM models (User, Project, Plot)
│   ├── schemas.py                       # Pydantic request/response schemas
│   ├── auth.py                          # JWT creation, verification, password hashing
│   ├── dependencies.py                  # Reusable FastAPI dependencies (get_current_user, admin_only)
│   ├── routers/
│   │   ├── auth.py                      # /api/auth routes
│   │   ├── projects.py                  # /api/projects routes
│   │   └── plots.py                     # /api/plots routes
│   ├── services/
│   │   └── plot_division.py             # Auto plot division algorithm
│   ├── rk_estates.db                    # SQLite3 database file (auto-created)
│   └── requirements.txt
│
├── .env.example
├── README.md
└── .gitignore
```

---

## 🗃️ Database Schema (SQLite3)

### `users` table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| name | TEXT | Full name |
| email | TEXT UNIQUE | Login email |
| hashed_password | TEXT | bcrypt hash |
| role | TEXT | `buyer` or `admin` |
| created_at | DATETIME | Timestamp |

### `projects` table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| name | TEXT | Project name |
| location | TEXT | Project location |
| description | TEXT | Details |
| land_length | REAL | Total land length (ft) |
| land_width | REAL | Total land width (ft) |
| num_plots | INTEGER | Number of plots to divide into |
| created_at | DATETIME | Timestamp |

### `plots` table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| project_id | INTEGER FK | References `projects.id` |
| plot_number | INTEGER | Plot number within project |
| length | REAL | Plot length (ft) |
| width | REAL | Plot width (ft) |
| area | REAL | Computed area (sq ft) |
| row_index | INTEGER | Row position in grid |
| col_index | INTEGER | Column position in grid |
| facing | TEXT | N / S / E / W |
| price | REAL | Price (optional, set by admin) |
| status | TEXT | `Available` / `Booked` / `Sold` |

---

## 📡 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new buyer |
| POST | `/api/auth/login` | Public | Login and receive JWT token |
| GET | `/api/auth/me` | Private | Get current logged-in user |

### Projects — `/api/projects`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/projects` | Public | List all projects |
| GET | `/api/projects/{id}` | Public | Get project + all its plots |
| POST | `/api/projects` | Admin | Create project → triggers auto plot division |
| PUT | `/api/projects/{id}` | Admin | Update project details |
| DELETE | `/api/projects/{id}` | Admin | Delete project and its plots |

### Plots — `/api/plots`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/plots/{id}` | Public | Get single plot details |
| GET | `/api/plots/{id}/dimensions` | Public | Get dimensions for 3D rendering |
| PUT | `/api/plots/{id}/status` | Admin | Update status (Available/Booked/Sold) |

> 📘 Full interactive API docs are available at `http://localhost:8000/docs` (Swagger UI) when the server is running.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js v18+
- pip
- npm or yarn

### Backend Setup

```bash
cd server

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp ../.env.example .env
# Edit .env and set your SECRET_KEY
```

`requirements.txt`:
```
fastapi
uvicorn[standard]
sqlalchemy
python-jose[cryptography]
passlib[bcrypt]
python-multipart
python-dotenv
```

### Start the Backend

```bash
cd server
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

API will be live at `http://localhost:8000`
Swagger docs at `http://localhost:8000/docs`

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file in `/client`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Start the Frontend

```bash
cd client
npm run dev
```

Open `http://localhost:3000` in your browser.
Admin dashboard is at `/admin/dashboard` (requires admin role).

---

### Environment Variables

Create a `.env` file in `/server`:

```env
SECRET_KEY=your_super_secret_jwt_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

> The SQLite3 database file (`rk_estates.db`) is created automatically in the `/server` directory on first run. No database setup required.

---

## 📸 Pages Overview

| Page | Who | Description |
|------|-----|-------------|
| `/login` | All | Login screen |
| `/register` | Buyer | Buyer signup |
| `/dashboard` | Buyer | Browse all projects |
| `/projects/[id]` | Buyer | Project detail with interactive plot grid |
| `/plot/[id]` | Buyer | Plot info + auto-generated 3D viewer |
| `/admin/dashboard` | Admin | Manage all projects |
| `/admin/create-project` | Admin | Enter land dimensions & plot count |
| `/admin/manage/[id]` | Admin | Edit project, update plot statuses |

---

## 🛣️ Roadmap

- [x] Project setup & architecture planning
- [ ] Authentication system (buyer + admin roles)
- [ ] Admin: Create project with land dimensions & plot count
- [ ] Backend: Auto plot division algorithm in Python
- [ ] SQLite3 database schema & SQLAlchemy models
- [ ] Frontend: Interactive plot grid layout
- [ ] Three.js: Procedural 3D plot viewer from dimensions
- [ ] Admin: Plot status management (Available / Booked / Sold)
- [ ] Buyer: Enquiry form on plot page
- [ ] Deployment (Vercel + Render)
- [ ] Payment / booking flow *(future)*
- [ ] Mobile app *(future)*

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 📬 Contact

**RK Estates Team**
- 📧 Email: contact@rkestates.com
- 🌐 Website: [www.rkestates.com](https://www.rkestates.com)
- 📍 Location: India
