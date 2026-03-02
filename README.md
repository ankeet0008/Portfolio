<div align="center">
  
# ✨ Ankit Naik - Immersive Interactive Portfolio

**A state-of-the-art personal portfolio demonstrating advanced web capabilities, high-end animations, and integrating an intelligent AI assistant.**

[![React](https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-purple.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black.svg?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Enabled-orange.svg?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

<br />

## 🌟 Overview

Welcome to the open-source repository for my stunningly immersive personal portfolio. Designed to captivate visitors, this project is a hybrid of **cutting-edge visual development** and **artificial intelligence**. 

By blending butter-smooth scroll experiences, high-fidelity entry animations, and a conversational AI agent (powered by the Gemini API), this project pushes the boundaries of what a personal developer/designer portfolio can be.

---

## 🚀 Features

- **🤖 Integrated AI Assistant:** An on-page intelligent chatbot seamlessly powered by Google's latest `@google/genai` models, capable of answering visitor queries dynamically.
- **✨ Butter-Smooth Scrolling:** Implementing **Lenis** for an unparalleled natively-feeling smooth scroll experience globally across all routes.
- **🎨 Cinematic Entry Animations:** Complete with a customized `Preloader` and layout transitions utilizing the raw power of **Framer Motion `AnimatePresence`**.
- **💥 Visual Flair & Effects:** Includes a stylized `Noise` overlay, parallax hero sections, dynamic custom cursors, and a custom clone of premium portfolio marquees (e.g., the "Super Badass Marquee").
- **📱 Fully Responsive:** Carefully optimized cross-platform breakpoints ensuring the "wow factor" happens whether you are browsing on a 4k monitor or an iPhone.
- **⚡ Vite Powered:** Lightning-fast HMR and optimized production builds.

---

## 🛠️ Technology Stack

| Core | Styling & Motion | AI & Capabilities |
| :--- | :--- | :--- |
| **React (v19)** | **Tailwind CSS** | **@google/genai API** |
| **TypeScript** | **Framer Motion** | **Lucide React (Icons)** |
| **Vite** | **Lenis (Smooth Scroll)** | **React Hooks Architecture** |

---

## 📂 Project Structure

A glimpse into the internal component architecture of the portfolio:

```text
📦 components/
 ┣ 💻 AIAssistant.tsx        # In-built Gemini ChatGPT-like interface
 ┣ 👤 About.tsx              # Beautifully crafted About section
 ┣ ✉️ Contact.tsx            # Contact form and details 
 ┣ 🎁 Freebies.tsx           # Staggered Bento grid animations
 ┣ 👑 Header.tsx             # Interactive, dynamic navigation header
 ┣ 🦸‍♂️ Hero.tsx               # Primary cinematic parallax top section
 ┣ 📺 Noise.tsx              # Global cinematic grain overlay
 ┣ ⏳ Preloader.tsx          # Initial loading animation experience
 ┣ 🔍 ProjectDetail.tsx      # Deep dive overlay for individual projects
 ┣ 🌟 SelectedWork.tsx       # Interactive works gallery
 ┣ 🚀 SuperBadassMarquee.tsx # Premium infinite horizontal scroll effect
 ┗ 🙏 ThankYou.tsx           # Call-To-Action / Outro
```

---

## 💻 Running the Project Locally

To run this stunning portfolio on your own machine, simply follow these steps.

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- A **Google Gemini API Key** (Get yours from [Google AI Studio](https://aistudio.google.com/))

### 2. Installation Setup

Clone the repository and install all necessary dependencies:

```bash
git clone https://github.com/your-username/portfolio-main.git
cd portfolio-main
npm install
```

### 3. Environment Variables

In order for the *AI Assistant* to work correctly, you must specify your Gemini API Key in your environment file. Create a file named `.env.local` in the root of the project and add the following:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_goes_here
```
*(Depending on how the API is consumed in the codebase, the key might be mapped directly over `GEMINI_API_KEY`. Be sure to verify your variable imports).*

### 4. Unleash the Magic

Boot up the development server:

```bash
npm run dev
```

Your browser will automatically open up at `http://localhost:5173` demonstrating the live application! 🚀

---

## 🤝 Contribution & License

This is a personal portfolio showcasing my specific skills and style, but feel free to fork, take inspiration, and experiment with the concepts! Because this utilizes an exact replication of a personal brand identity, **if you fork it, please be sure to re-skin it and insert your own identity/projects.**

Built passionately by [Ankit Naik] ⚡
