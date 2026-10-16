# 🌟 Aathithyan A — Embedded Engineer Portfolio

A responsive, high-performance portfolio website built for **Aathithyan A** (Entry-Level Embedded Engineer).

**100% of your personal, educational, and project information is managed in a single file: [`content.js`](./content.js)**. You never have to edit HTML or CSS to update your details!

---

## ⚡ Quick Guide: How to Update Your Information Later

To add or update any details in the future, open:
👉 **[`content.js`](./content.js)**

### 1. Adding Your GitHub Link (when ready)
In [`content.js`](./content.js), locate `socials` and update the `github` field:
```javascript
socials: {
  github: "https://github.com/your-username", // Add your URL here
  linkedin: "https://www.linkedin.com/in/aathithyan",
  twitter: "",
  email: "mailto:adhithyana135@gmail.com"
}
```

---

### 2. Adding a Profile Photo & Resume PDF
1. **Profile Photo:** Place your photo in the project directory (e.g., `avatar.jpg`) and update:
   ```javascript
   profilePhoto: "avatar.jpg",
   ```
2. **Resume PDF:** Place your PDF in the project folder (e.g., `resume.pdf`) and update:
   ```javascript
   resumeUrl: "resume.pdf",
   ```

---

### 3. Adding Source / Demo Links to Your Project
Under `projects` in [`content.js`](./content.js):
```javascript
projects: [
  {
    id: 1,
    title: "Machine Learning-Based Inverse Optimization of Mach-Zehnder Modulator Parameters in Silicon Photonic QPSK Communication Systems",
    category: "tools",
    categoryBadge: "Research & Systems",
    description: "...",
    image: "", // Add a diagram or screenshot image path if desired
    technologies: ["Machine Learning", "Silicon Photonics", "QPSK Communications"],
    demoUrl: "https://your-demo-or-paper-link.com", // Add demo link
    githubUrl: "https://github.com/your-username/repo" // Add GitHub link
  }
]
```

---

### 4. Adding New Projects, Skills, or Certifications
- **New Project:** Add a new object inside the `projects` array.
- **New Skill:** Add items to the respective category array in `skills`.
- **New Training / Certification:** Add an entry inside `achievements`.

---

## 🌐 Live Production Website

Your portfolio is deployed and accessible worldwide at your personalized domains:
👉 **[https://aathithyana.vercel.app](https://aathithyana.vercel.app)**
👉 **[https://aathithyan-embedded.vercel.app](https://aathithyan-embedded.vercel.app)**

---

## ⚡ How to Deploy Updates in the Future

Whenever you edit [`content.js`](./content.js), deploy your changes to the live site by running:
```powershell
vercel --prod -y
```

---

## 💻 Running & Testing Locally

Your local development server is also active at:
👉 **[http://localhost:8000](http://localhost:8000)**

Whenever you edit and save [`content.js`](./content.js), simply **refresh your browser** to see the updates immediately.

To start or restart the server in PowerShell:
```powershell
py -m http.server 8000
```

---

## 🌐 Deploying to Vercel or Netlify

- **Vercel (Recommended):**
  1. Push this project folder to your GitHub repository.
  2. Visit [vercel.com](https://vercel.com) and sign in.
  3. Click **Add New Project**, select your repository, and click **Deploy**.
- **Netlify Drop (Instant, Zero Setup):**
  - Drag and drop this folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
