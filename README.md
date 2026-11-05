# PortFollow — Your Personal DevOS 🖥️⚡

> **Product Name:** PortFollow  
> **Tagline:** Your Personal DevOS  
> **Owner:** Sudhakar Rathod (B.E - Information Technology | Software Developer | Cybersecurity Enthusiast)  
> **Target Cloud Platform:** AWS Amplify Hosting  

PortFollow is an original, cinematic, interactive developer portfolio website engineered as a futuristic desktop operating system with nostalgic Windows 98-inspired window mechanics. Visitors navigate a living digital workspace where applications open in movable, resizable, and focusable windows to showcase technical skills, software engineering projects, cybersecurity diagnostics, and contact channels.

---

## 🌟 Key Features

### 1. 🪟 Advanced Window Management System
- **Draggable & Bound-Checked:** Move windows using the title bar with viewport boundary protection preventing windows from getting lost off-screen.
- **Controls & States:** Full support for Open, Minimize, Maximize, Restore, and Close actions.
- **Z-Index Layering:** Dynamic focus tracking brings clicked windows to the foreground.
- **Mobile-Responsive Mode:** Automatically adapts to full-screen application cards on touchscreens without awkward window clipping or horizontal scrolling.
- **Accessible & Keyboard Friendly:** Semantic elements and focus management.

### 2. 🎨 3 Distinct System Themes (Instant Switching via CSS Custom Properties)
- **Neon Terminal (Default):** Deep void backdrop (`#080C16`), cyan and cyber purple ambient glows, faint grid lines, and glowing terminal green outputs.
- **Soft Pastel:** Refined modern lavender background (`#F8F5FF`), clean white window surfaces, and vibrant purple/pink highlights.
- **Classic Desktop:** Authentic nostalgic teal wallpaper (`#008080`), 3D beveled silver frames (`#C0C0C0`), and high-contrast navy active titlebars.
- **Persistent Storage:** Theme preference is automatically remembered using `localStorage`.

### 3. 💻 Standout Creative Feature: Interactive Terminal (`terminal.exe`)
An authentic command-line interface featuring:
- Monospaced typography with blinking caret prompt (`sudhakar@devos:~$`).
- Arrow-key command history (Up/Down navigation).
- System execution of commands:
  - `help` — Show all commands
  - `about` — Open About Me window
  - `skills` — Open Skills matrix
  - `projects` — Open Projects folder
  - `contact` — Open Contact console
  - `github` — Open verified GitHub profile
  - `linkedin` — Open LinkedIn profile
  - `theme <neon|pastel|classic>` — Dynamically change system themes
  - `ls` — List available portfolio executable binaries
  - `whoami` — Display developer credentials and role
  - `clear` — Clear terminal screen buffer
  - `date` — Print current system timestamp
  - `history` — List recently typed commands

### 4. 📂 Core Desktop Applications
- **`about_me.exe`:** Developer biography, education in Computer Science, career aspirations, technical interests, current learning focus, and downloadable resume.
- **`skills.sys`:** Categorized competencies (Programming Languages, Frontend, Backend, Databases, Cloud & Tools, Cybersecurity) with practical engineering usage notes and direct links to corresponding projects.
- **`projects.folder`:** Showcase of verified projects with technical architecture, features, engineering challenges overcome, and verified GitHub links:
  - **CyberScan-Pro:** Web security vulnerability scanner (Python, Flask, React, TypeScript, Supabase).
  - **Digital Blood Bank:** Enterprise healthcare management system (Java, Spring Boot, Hibernate, MySQL, REST APIs).
  - **AI Text Summarizer:** AI-driven document summarization application (Node.js, Express, Gemini API).
  - **Fabrici:** Smart clothing e-commerce shopping experience (React, JavaScript, REST APIs).
- **`display_settings.exe`:** Visual theme selector showcasing miniature window previews with real-time palette feedback.
- **`contact.exe`:** Communication terminal with direct channel links, one-click email copy with visual feedback, and a functional message composer that triggers the user's native email client.

### 5. ⏱️ Functional Taskbar & Start Menu
- Fixed bottom taskbar featuring the PortFollow brand badge.
- Interactive Start Menu with quick-launch access to all six system applications.
- Active window indicators supporting click-to-focus and click-to-minimize.
- Quick terminal launcher and rapid theme cycle button.
- Real-time digital clock updating every second.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS v3, CSS Custom Properties (Theme Engine) |
| **Animations** | Framer Motion & CSS keyframes |
| **Icons** | Lucide React + Custom SVG Brand Badges |
| **Typography** | Space Grotesk, Inter, JetBrains Mono, Press Start 2P |
| **Deployment** | AWS Amplify Hosting (CloudFront CDN + S3 Edge) |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.x, v20.x, or v22.x recommended)
- npm (v9.x or later)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rathodsudhakar/portfollow.git
   cd portfollow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to explore PortFollow.

4. **Run the production build test:**
   ```bash
   npm run build
   ```
   The compiled static files are output to `dist/`.

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## ☁️ Deploying to AWS Amplify Hosting

PortFollow is configured out of the box for continuous deployment with AWS Amplify.

### Fast Track Deployment:
1. Push your repository to GitHub.
2. Sign in to the **AWS Management Console** and search for **AWS Amplify**.
3. Select **Host a web app**, authorize GitHub, and select the `portfollow` repository.
4. AWS Amplify will detect the `amplify.yml` file automatically:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. Click **Save and deploy**.
6. Amplify automatically builds your application, deploys the static files to S3, configures CloudFront CDN, provisions an SSL certificate, and issues a live `amplifyapp.com` URL.

For detailed architecture diagrams and custom domain configurations, see [docs/aws-architecture.md](./docs/aws-architecture.md).

---

## 📁 Project Structure

```text
portfollow/
├── public/
│   ├── _redirects                     # SPA rewrite configuration
│   ├── icon.svg                       # Glowing cyber terminal favicon
│   └── Sudhakar_Rathod_Resume.txt     # Downloadable developer resume
├── src/
│   ├── components/
│   │   ├── applications/              # DevOS Applications
│   │   │   ├── AboutApp.tsx           # about_me.exe
│   │   │   ├── SkillsApp.tsx          # skills.sys
│   │   │   ├── ProjectsApp.tsx        # projects.folder
│   │   │   ├── TerminalApp.tsx        # terminal.exe (Interactive CLI)
│   │   │   ├── SettingsApp.tsx        # display_settings.exe
│   │   │   └── ContactApp.tsx         # contact.exe
│   │   ├── common/
│   │   │   └── Icons.tsx              # Crisp SVG icons (GitHub, LinkedIn)
│   │   ├── desktop/
│   │   │   ├── DesktopIcons.tsx       # Desktop shortcuts & launcher
│   │   │   ├── DesktopWallpaper.tsx   # Atmospheric gradients & grids
│   │   │   └── DesktopWorkspace.tsx   # Desktop manager layout
│   │   ├── start-menu/
│   │   │   └── StartMenu.tsx          # Start Menu program launcher
│   │   ├── taskbar/
│   │   │   └── Taskbar.tsx            # Taskbar, clock & window tabs
│   │   └── window-manager/
│   │       └── WindowFrame.tsx        # Draggable, resizable window frames
│   ├── context/
│   │   ├── ThemeContext.tsx           # Global CSS variables theme switcher
│   │   └── WindowManagerContext.tsx   # Window manager state & z-index
│   ├── data/
│   │   ├── projects.ts                # Verified projects database
│   │   └── skills.ts                  # Categorized skills matrix
│   ├── types/
│   │   └── index.ts                   # Strongly-typed TypeScript interfaces
│   ├── App.tsx                        # Root application container
│   ├── index.css                      # Tailwind & theme custom properties
│   └── main.tsx                       # React DOM entry point
├── docs/
│   └── aws-architecture.md           # AWS Amplify cloud architecture docs
├── amplify.yml                        # AWS Amplify CI/CD build specification
├── index.html                         # HTML5 shell & Google Fonts preconnect
├── package.json                       # Dependencies & scripts
├── tailwind.config.js                 # Tailwind CSS theme extension
├── tsconfig.json                      # TypeScript configuration
└── vite.config.ts                     # Vite build configuration
```

---

## 👤 Developer Profile

**Sudhakar Rathod**  
- **Role:** B.E - Information Technology | Software Developer | Cybersecurity Enthusiast  
- **GitHub:** [@rathodsudhakar](https://github.com/rathodsudhakar)  
- **LinkedIn:** [Sudhakar Rathod](https://www.linkedin.com/in/rathodsudhakar/)  
- **Email:** `rathodsudhakar7821@gmail.com`  

---

## 📜 License
This project is open-source under the MIT License.
