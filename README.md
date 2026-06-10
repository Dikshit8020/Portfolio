# ⚡ Dikshit Maloo — Electronics & Embedded Systems Portfolio

A multi-page portfolio website built with Vanilla HTML/CSS/JS and Node.js/Express, featuring a cyber-industrial dark theme with particle animations, glassmorphism cards, and Google Drive media integration.

🔗 **Live:** _Coming soon_  
📄 **Resume:** [Download PDF](https://drive.google.com/file/d/1Kr_EZyuNDXRur4HUWlDbZ7njjAU_NwUB/view)

---

## 📸 Preview

| Section | Description |
|---------|-------------|
| **Hero** | Animated particle canvas, glowing orbs, quick-stats card |
| **Skills** | 6 interactive skill cards with progress bars → deep-dive pages |
| **Projects** | 3 featured project cards → full case-study pages with Drive media galleries |
| **Education** | Timeline with certifications (TIFAN, SIH, IEEE, Purdue) |
| **Contact** | Working contact form with Gmail SMTP backend |

---

## 🗂️ Project Structure

```
Portfolio/
├── public/                      ← Frontend (static files)
│   ├── index.html               ← Landing page (hero, skills, projects, education, contact)
│   ├── css/
│   │   ├── design-system.css    ← Core design tokens, components, animations
│   │   └── gallery.css          ← Drive embeds, resource cards, social icons
│   ├── js/
│   │   ├── core.js              ← Navigation, scroll effects, counters, form handling
│   │   ├── particles.js         ← Canvas particle system (hero background)
│   │   └── lightbox.js          ← Image/video lightbox viewer
│   ├── projects/
│   │   ├── robotic-arm.html     ← 6-Axis Vegetable Transplanter (TIFAN 2025)
│   │   ├── emi-system.html      ← Portable EMI/EMC Analyzer (SIH Finalist)
│   │   └── lifi.html            ← Li-Fi Optical Communication System
│   └── skills/
│       ├── embedded-systems.html
│       ├── pcb-design.html
│       ├── robotics.html
│       ├── communications.html
│       ├── ml-python.html
│       └── test-equipment.html
├── api/
│   ├── server.js                ← Express backend (contact form, rate limiting, SMTP)
│   └── package.json             ← Backend dependencies
├── .gitignore
├── .env                         ← Environment variables (not committed)
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone & install

```bash
git clone https://github.com/Dikshit8020/Portfolio.git
cd Portfolio/api
npm install
```

### 2. Configure email (optional)

Create a `.env` file in the project root:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
PORT=3001
```

> **How to get an App Password:**  
> Google Account → Security → 2-Step Verification → App Passwords → Generate for "Mail"

### 3. Run

```bash
# From the project root
node api/server.js
```

### 4. Open

Visit **http://localhost:3001**

---

## 🌐 Deployment

### Option A — Render.com (Recommended, Free Tier)

1. Push to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your repo, configure:
   - **Build Command:** `cd api && npm install`
   - **Start Command:** `node api/server.js`
4. Add Environment Variables: `EMAIL_USER`, `EMAIL_PASS`, `PORT=10000`
5. Get your free `*.onrender.com` URL

### Option B — Railway.app

```bash
npm install -g @railway/cli
railway login && railway init && railway up
```

### Option C — Static Only (GitHub Pages / Netlify)

Upload the `public/` folder. The contact form falls back to `mailto:` when no backend is available.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| **Design** | Custom design system, CSS Grid/Flexbox, CSS animations |
| **Typography** | Outfit + JetBrains Mono (Google Fonts) |
| **Effects** | Canvas particle system, IntersectionObserver scroll reveals |
| **Media** | Google Drive embedded folder views & resource links |
| **Backend** | Node.js + Express |
| **Email** | Nodemailer + Gmail SMTP |
| **Security** | express-rate-limit (5 req/15min), express-validator, input sanitization |

---

## 📄 Pages

| Route | Page | Content |
|-------|------|---------|
| `/` | Landing | Hero, Skills (6), Experience (2), Projects (3), Education, Certifications (4), Contact |
| `/projects/robotic-arm` | Robotic Arm | TIFAN 2025 Finalist · STM32 FreeRTOS · 6-DOF kinematics |
| `/projects/emi-system` | EMI/EMC | SIH Finalist · RPi4 + LPC4300 · TensorFlow ML (94%) |
| `/projects/lifi` | Li-Fi | ESP32 · 650nm laser · OPA388 TIA · 1200 baud @ 5m |
| `/skills/*` | 6 Skill Pages | Embedded Systems, PCB Design, Robotics, Comms, ML, Test Equipment |

---

## 🔗 External Links

| Resource | URL |
|----------|-----|
| GitHub | [github.com/Dikshit8020](https://github.com/Dikshit8020) |
| LinkedIn | [linkedin.com/in/dikshit-maloo](https://www.linkedin.com/in/dikshit-maloo) |
| Resume | [Google Drive PDF](https://drive.google.com/file/d/1Kr_EZyuNDXRur4HUWlDbZ7njjAU_NwUB/view) |
| Certificates | [Google Drive Folder](https://drive.google.com/drive/folders/1tmp2ugoaajI8dbYQlw3XPvgKpgTgOg6w) |

---

## 📬 Contact Form Flow

```
User submits form → POST /api/contact
  → Input validation (express-validator)
  → Rate limit check (5 requests / 15 min per IP)
  → Send email via Gmail SMTP (nodemailer)
  → JSON response { success: true }
  → On network failure: auto-fallback to mailto: link
```

---

## 📝 License

© 2025 Dikshit Maloo · Built with ⚡ in Udaipur, Rajasthan

