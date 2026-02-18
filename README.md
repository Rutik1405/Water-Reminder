<p align="center">
  <img src="https://img.icons8.com/fluency/96/water.png" alt="AquaAlert Logo" width="80"/>
</p>

<h1 align="center">💧 AquaAlert</h1>
<h3 align="center">Smart Water Reminder Tracker</h3>

<p align="center">
  <em>Stay hydrated. Stay healthy. Track every drop.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Deploy-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-project-structure">Structure</a>
</p>

---

## 🌟 About

**AquaAlert** is a modern, mobile-first web app designed to help you stay hydrated throughout the day. Set your daily water goal, track every glass, receive timely reminders, and visualize your hydration journey — all in a beautiful glassmorphism UI.

> Built with performance and aesthetics in mind. No backend required — everything runs in your browser with localStorage persistence.

---

## ✨ Features

### 🎯 Daily Water Goal

- Set a personalized daily goal (0.5L to 5L)
- Quick presets for common targets
- Intuitive slider control

### 🥛 Intake Tracker

- **"+ Add Glass"** button for quick logging
- Quick-add buttons: `100ml` · `250ml` · `500ml` · `750ml`
- Undo with **"- Remove"** button
- Customizable glass size (100ml – 500ml)

### 📊 Progress Dashboard

- **Circular SVG progress ring** with gradient glow
- Real-time stats: consumed, remaining, glass count
- **Motivational messages** that change with progress
- Linear progress bar

### 🔔 Smart Reminders

- Configurable intervals: 15min, 30min, 45min, 1hr, 1.5hrs, 2hrs
- **Browser push notifications** (Notification API)
- **In-app toast popups** with smooth animations
- One-tap enable/disable toggle

### 📈 History & Analytics

- **7-day bar chart** with color-coded goal status
- Daily breakdown with progress bars
- Weekly stats: average intake, goals met, streak 🔥
- Week total summary

### 💾 Data Persistence

- All data saved to **localStorage**
- Survives page refreshes and browser restarts
- Settings, intake history, and goals all persisted

### 🎨 Premium Design

- **Glassmorphism** cards with backdrop blur
- Dark theme with blue-purple gradient
- Smooth animations: fade, scale, droplet, shimmer
- **Mobile-first** responsive layout
- Bottom navigation with active indicators
- Google Fonts (Inter)

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI components & state management |
| **Tailwind CSS v4** | Utility-first styling |
| **Vite 6** | Lightning-fast dev server & bundler |
| **localStorage** | Client-side data persistence |
| **Notification API** | Browser push notifications |
| **SVG** | Circular progress ring & icons |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Rutik1405/Water-Reminder.git
cd Water-Reminder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` folder.

---

## ☁️ Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Vercel auto-detects Vite — click **Deploy**
4. Your app is live! 🎉

### Manual Deploy

```bash
npm run build
# Upload the dist/ folder to any static hosting
```

---

## 📁 Project Structure

```
Water-Reminder/
├── 📄 index.html              # Entry HTML with SEO meta
├── 📄 package.json             # Dependencies & scripts
├── 📄 vite.config.js           # Vite + React + Tailwind
├── 📂 public/
│   └── 🎨 vite.svg             # Water droplet favicon
└── 📂 src/
    ├── 📄 main.jsx             # React entry point
    ├── 🎨 index.css            # Tailwind + animations
    ├── 📄 App.jsx              # Main app shell
    ├── 📂 hooks/
    │   ├── useLocalStorage.js  # Persist state
    │   └── useReminder.js      # Notification system
    ├── 📂 utils/
    │   └── helpers.js          # Utilities & constants
    ├── 📂 components/
    │   ├── CircularProgress.jsx
    │   ├── Navigation.jsx
    │   ├── ReminderToast.jsx
    │   └── WeeklyChart.jsx
    └── 📂 pages/
        ├── Dashboard.jsx       # Main tracking view
        ├── History.jsx         # Weekly analytics
        └── Settings.jsx        # Customization
```

---

## 📱 Pages

| Page | Description |
|---|---|
| **Dashboard** | Main view with progress ring, stats, and water logging |
| **History** | 7-day chart, daily breakdown, streaks & averages |
| **Settings** | Goal setup, glass size, reminder config, reset |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with 💙 and lots of 💧
  <br/>
  <strong>Stay Hydrated!</strong>
</p>
