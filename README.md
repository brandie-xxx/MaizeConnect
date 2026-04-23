# MaizeConnect 🌽

[![Vite](https://img.shields.io/badge/Vite-19%2B-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**AI-Powered Agricultural Platform for Zimbabwean Farmers & Traders**

MaizeConnect leverages Google's Gemini AI to generate professional agricultural blueprints, harvest strategies, market analysis, and logistics plans tailored for Zimbabwe's maize ecosystem. From field planning to USSD-integrated trade protocols.

## ✨ Features

- **AI Blueprint Generation** – Gemini-powered strategies for harvest, markets, risks
- **Farmer Dashboard** – Blueprints, Compose, Inbox, Analytics (Recharts)
- **Secure Auth** – Login/Register with React Hook Form + Zod
- **Premium UI/UX** – shadcn/ui, Tailwind 4, Lucide icons, Sonner toasts
- **Responsive Design** – Mobile-first, Apple HIG compliant
- **Zimbabwe Focus** – Weather risks, local economics, MaizeConnect protocols

## 🛠 Tech Stack

| Frontend   | Backend/AI             | Utils          |
| ---------- | ---------------------- | -------------- |
| React 19   | Google Gemini AI       | shadcn/ui      |
| Vite 6     | @google/genai          | Tailwind CSS 4 |
| TypeScript | React Router           | Recharts       |
| SWR        | Express (server-ready) | Zod Validation |

## 🚀 Quick Start

### Prerequisites

- Node.js 20+

### Setup

```bash
git clone https://github.com/brandie-xxx/MaizeConnect.git
cd MaizeConnect
npm install
```

### Environment Variables

Create `.env.local`:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Run Locally

```bash
npm run dev
```

Opens at `http://localhost:3000` (host: 0.0.0.0)

### Build & Preview

```bash
npm run build
npm run preview
```

## 📱 Routes

| Path                    | Description        |
| ----------------------- | ------------------ |
| `/`                     | Landing Page       |
| `/about`                | About MaizeConnect |
| `/login`                | User Login         |
| `/register`             | Sign Up            |
| `/dashboard`            | Home               |
| `/dashboard/blueprints` | AI Strategies      |
| `/dashboard/compose`    | Create Blueprint   |
| `/dashboard/inbox`      | Messages           |
| `/dashboard/settings`   | Profile            |

## 🤝 Contributing

1. Fork & clone
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit: `git commit -m 'Add AmazingFeature'`
4. Push & PR to `main`

Uses blackboxai/ prefixed branches for AI-assisted changes.

## 📄 License

MIT License - see [LICENSE](LICENSE) (or create one).

## 🙌 Acknowledgments

- [Google Gemini](https://ai.google.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Picsum/Unsplash](https://picsum.photos/) for imagery

**Connect Zimbabwe's maize future with AI. 🌽🇿🇼**
