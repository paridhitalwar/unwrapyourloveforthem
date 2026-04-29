# Unwrap 🎁

**Because every great gift starts with understanding.**

Unwrap is a thoughtful, AI-powered gifting companion that helps you think clearly about the person before you start searching for gifts. Instead of generic product lists, Unwrap guides you through a short reflection about your recipient and returns three personalized **gift directions** — each with ideas, a DIY option, a customization tip, and links to explore.

🌐 **Live app:** [unwrapyourloveforthem.lovable.app](https://unwrapyourloveforthem.lovable.app)

---

## ✨ Features

- **Two quiz modes**
  - **Quick mode** — 6 questions for a fast, focused reflection
  - **Deep mode** — 15 questions for a richer, more nuanced portrait
- **AI-generated gift directions** — three tailored "territories" instead of a flat product list, each with:
  - Gift ideas
  - A DIY option
  - A customization tip
  - Google search links to explore brands and stores
- **Card note suggestions** — heartfelt, funny, simple, and playful options
- **Share with a friend** — copy a clean, pre-formatted summary of the recipient's gift directions to clipboard
- **Lightweight inline feedback** — a quick 1–5 emoji pulse check on the results
- **Mobile-first, animated UI** — smooth transitions powered by Framer Motion

---

## 🛠 Tech Stack

- **Frontend:** React 18 + Vite 5 + TypeScript 5
- **Styling:** Tailwind CSS v3 with a semantic design token system (HSL-based)
- **UI components:** shadcn/ui + Radix primitives
- **Animations:** Framer Motion
- **Routing:** React Router
- **Data fetching:** TanStack Query
- **Backend:** Lovable Cloud (managed Supabase) — Postgres, Auth, Edge Functions
- **AI:** Lovable AI Gateway (Google Gemini / OpenAI GPT models, no API key required)

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh) (recommended) or Node.js 18+

### Install & run locally

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev
```

The app will be available at [http://localhost:8080](http://localhost:8080).

### Build for production

```bash
bun run build
```

---

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components (Navigation, Confetti, shadcn/ui)
├── pages/             # Route-level pages
│   ├── Landing.tsx    # Marketing landing page
│   ├── Index.tsx      # Recipient details form (name, relationship, occasion, budget)
│   ├── Quiz.tsx       # Quick / Deep mode quiz flow
│   ├── Results.tsx    # Gift directions, card notes, share, feedback
│   └── About.tsx
├── lib/
│   ├── quiz-data.ts       # Question bank + mode logic
│   └── quiz-fallback.ts   # Offline / failure-mode results
├── integrations/supabase/ # Auto-generated Supabase client + types
└── index.css              # Design tokens (HSL semantic variables)

supabase/
└── functions/
    └── generate-gift/     # Edge function calling the AI gateway
```

---

## 🎨 Design System

All colors live as **HSL semantic tokens** in `src/index.css` and `tailwind.config.ts`. Components use semantic classes (`bg-primary`, `text-foreground`, `gradient-purple`, etc.) — never raw color values. This keeps theming consistent across light/dark modes and makes brand updates trivial.

---

## 🤝 Contributing

This project is developed primarily through [Lovable](https://lovable.dev) with a two-way GitHub sync. You can:
- Edit in Lovable — changes auto-push to GitHub
- Edit locally / via PRs — changes auto-sync back to Lovable

---

## 📄 License

All rights reserved © Unwrap.
