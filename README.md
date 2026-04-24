# Vox Populi: Next-Gen Election Intelligence Platform

![Vox Populi Banner](https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=2000&h=600)

**Live Deployment:** [https://election-process-assistant.pages.dev/](https://election-process-assistant.pages.dev/)

## 🏆 The Problem & Our Solution
**Voter apathy and misinformation are at an all-time high.** Traditional government websites are text-heavy, unengaging, and fail to capture the attention of younger demographics (Gen Z / Millennials). Furthermore, voters are constantly bombarded with conflicting information regarding voting laws and procedures.

**Vox Populi** (Voice of the People) solves this by gamifying and simplifying the democratic process. We transform static election data into an immersive, 3D interactive experience equipped with real-time AI assistance to cut through the noise.

### 🎯 Domain
**Civic Tech / GovTech / Election Awareness**

---

## 🚀 Key Features

1. **Holographic 3D Election Timeline**
   Instead of a static list of dates, users navigate a spatial 3D environment where each node represents a critical phase (Registration, Candidate Research, Voting Day). This interactive approach dramatically increases engagement and information retention.

2. **Omni-Bot: AI Civic Agent**
   A futuristic, floating assistant ready to answer complex questions about the voting process. Omni-Bot uses Google's Gemini AI logic engine to parse queries and deliver accurate, verified civic information instantly.

3. **Misinformation Shield**
   A dedicated module where users can input claims, rumors, or headlines. The shield cross-references the input using advanced LLM reasoning to determine the probability of it being misinformation, returning structured JSON categorization.

---

## 🧠 Approach and Logic

Our approach centered around **"Engagement through Immersion."** 
- **Why 3D?** We chose React Three Fiber because spatial interfaces encourage exploration. By making the timeline a physical object users can rotate and click, they spend more time interacting with the content.
- **Why Dark/Cyber Aesthetics?** To break away from the traditional, sterile look of government portals. We wanted it to feel like a premium, next-generation intelligence tool.
- **Component Architecture:** The application is highly modular. The 3D canvas is isolated from the UI overlays (Tailwind + Framer Motion) and optimized with Code Splitting, ensuring smooth 60fps performance even on lower-end devices.

---

## ⚙️ Technical Architecture

- **Frontend Framework**: React (Vite) for rapid development and optimized builds.
- **AI Integration**: Google Gemini 2.5 Flash API via `@google/genai` for NLP and structured JSON reasoning.
- **3D Rendering**: `three.js` via `@react-three/fiber` and `@react-three/drei` for declarative 3D scenes.
- **Animations**: `framer-motion` for cinematic page transitions and UI micro-interactions.
- **Styling**: Tailwind CSS for a custom, glassmorphic design system.

### Installation & Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Dixit-Khushi/election-process-assistant.git
   ```
2. Navigate to the project directory:
   ```bash
   cd election-process-assistant
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Setup Environment Variables:
   Create a `.env.local` file in the root directory and add your Google Gemini API Key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

## ⚠️ Assumptions & Limitations

1. **Data Sources**: While the AI is instructed to rely on factual civic data, in a production environment, this system would be strictly grounded to a live Civic API (e.g., Google Civic Information API) using Retrieval-Augmented Generation (RAG) to prevent any hallucinations.
2. **Target Audience Tech Literacy**: We assume the target demographic has modern web browsers capable of rendering WebGL/Three.js environments. Graceful fallbacks (Error Boundaries) are provided for legacy systems or strict privacy browsers (e.g., Brave).

---

Built with ❤️ for Democracy.
