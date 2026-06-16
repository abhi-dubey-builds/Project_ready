# Executive Workspace — Task Management Dashboard

A full-stack task management application with a cyberpunk/retro terminal aesthetic. Features a dark-themed, neon-accented UI with multiple operational views, real-time analytics visualizations, and a MongoDB-backed REST API.

## Description

Executive Workspace is a task management dashboard designed with a high-fidelity retro terminal interface. It combines an Express.js backend with a richly styled single-page frontend to deliver an immersive project tracking experience. The application features a persistent task API, dynamic theme customization, interactive project cards, and animated data visualizations.

### Key Features

- **Cyberpunk Terminal UI**: Dark theme with neon glow effects, scanline overlays, and CRT aesthetics
- **Dynamic Theme System**: Switch between phosphor green, amber, cyan, and error red accent palettes with persistent localStorage state
- **Multi-View Dashboard**: Dashboard, Analytics, Portfolio, and Reports views with smooth navigation
- **Interactive Project Cards**: Clickable cards with progress bars, priority badges, and detail drawers
- **REST API**: Full CRUD operations for task management via Express.js and MongoDB
- **Animated Analytics**: Real-time latency grid and resource utilization charts with ping animations
- **Side Drawer**: Detailed project view with activity stream, timeline, and terminal input
- **Toast Notifications**: System overlay alerts for user actions and feedback
- **Responsive Design**: Tailwind CSS with custom dark-mode color system

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Frontend | HTML5, Tailwind CSS, Vanilla JavaScript |
| Fonts | JetBrains Mono, Space Mono, Hanken Grotesk, Material Symbols |
| Utilities | dotenv for environment configuration |

## Project Structure

```
Project_ready-main/
├── .gitignore          # Ignores .env file
├── package.json        # Node.js dependencies and scripts
├── server.js           # Express server with MongoDB connection
├── models/
│   └── Task.js           # Mongoose schema for tasks
└── public/             # Static frontend assets
    ├── index.html      # Single-page application UI
    ├── script.js       # Frontend interactivity
    └── style.css       # Custom CSS styles and variables
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud database
- npm (comes with Node.js)

## Setup Guide

### 1. Clone and Navigate

```bash
git clone <repository-url>
cd Project_ready-main
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `express` — Web framework
- `mongoose` — MongoDB object modeling
- `dotenv` — Environment variable management

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# .env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

> **For local MongoDB**, use: `MONGO_URI=mongodb://localhost:27017/executive_workspace`

> **For MongoDB Atlas**, get your connection string from the Atlas dashboard and replace the placeholders.

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

### 5. Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Retrieve all tasks |
| `POST` | `/api/tasks` | Create a new task (body: `{ title, description, status }`) |
| `PATCH` | `/api/tasks/:id` | Update task status (body: `{ status }`) |

### Example API Usage

```bash
# Get all tasks
curl http://localhost:3000/api/tasks

# Create a new task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Initiative","description":"Project description","status":"To-Do"}'

# Update task status
curl -X PATCH http://localhost:3000/api/tasks/<task-id> \
  -H "Content-Type: application/json" \
  -d '{"status":"In-Progress"}'
```

## Data Model

### Task Schema

| Field | Type | Required | Default |
|-------|------|----------|---------|
| `title` | String | ✓ | — |
| `description` | String | ✗ | `''` |
| `status` | String (‘To-Do’ | ‘In-Progress’ | ‘Done’) | ‘To-Do’ |
| `createdAt` | Date | — | `Date.now` |

## Frontend Features

### Theme System
Four accent color themes are available via the top navigation:
- **Phosphor** — Classic terminal green (`#c3f400`)
- **Amber** — Retro monitor amber (`#ffba20`)
- **Cyan** — Futuristic cyan (`#7df4ff`)
- **Error** — Alert red (`#ffb4ab`)

Theme preference is persisted in `localStorage`.

### Views
| View | Description |
|------|-------------|
| **Dashboard** | Priority initiatives grid with progress tracking cards |
| **Analytics** | Latency heatmap and resource utilization charts |
| **Portfolio** | Asset status table with health indicators |
| **Reports** | File listing with download actions |

### UI Components
- **Top Navigation Bar** — Branding, theme picker, system icons
- **Side Navigation** — View switcher with glow effects
- **Project Cards** ‒ Status badges, progress bars, priority indicators
- **Detail Drawer** ‒ Slide-out panel with activity stream and terminal input
- **System Overlays** ‒ Toast notifications for user actions

## Development Notes

- The frontend is a single-page application served as static files from the `public/` directory.
- The `index.html` includes both the Tailwind configuration and inline JavaScript for self-contained rendering.
- `script.js` and `style.css` provide additional interactivity and styling.
- The scanline overlay and glow effects are implemented via CSS pseudo-elements and custom properties.
- Analytics visualizations use randomized data for demonstration purposes.

## License

ISC
