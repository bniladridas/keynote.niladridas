# Keynote Platform

A modern presentation and learning platform powered by Google Gemini AI.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://keynote-niladridas-ecru.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Overview

This platform combines presentation capabilities with interactive learning features, leveraging Google Gemini AI for dynamic content generation. It offers a unique blend of presentation tools and educational resources, making it ideal for both creating engaging presentations and learning complex concepts.

## Core Features

- **AI-Powered Content**: Dynamic content generation using Google Gemini AI
- **Interactive Interface**: Seamless presentation and learning experience
- **Research Interface**: AI-assisted research and content exploration
- **Image Generation**: AI-powered image generation capabilities
- **Responsive Design**: Optimized for all device sizes
- **Mathematical Support**: KaTeX integration for mathematical formulas

## Technology Stack

### Frontend
- React 18.3
- TypeScript 5.5
- Tailwind CSS
- Framer Motion
- Google Gemini AI

### Key Libraries
- KaTeX for mathematical notation
- React Markdown for content rendering
- React Syntax Highlighter for code examples

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/bniladridas/keynote-niladridas.git
cd keynote-niladridas
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your Google Gemini AI API key to .env
```

4. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - Code linting
- `npm run test` - Run tests
- `npm run preview` - Preview build

## Project Architecture

```
src/
├── components/     # UI components
├── lib/           # Core utilities & AI integration
├── hooks/         # React hooks
├── styles/        # Global styles
└── types/         # TypeScript definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/Enhancement`)
3. Commit changes (`git commit -m 'Add: Enhancement'`)
4. Push to branch (`git push origin feature/Enhancement`)
5. Open a Pull Request

## How to Create a Pull Request

1. Ensure your fork is up to date with the main repository:
```bash
git remote add upstream https://github.com/bniladridas/keynote-niladridas.git
git fetch upstream
git checkout main
git merge upstream/main
```

2. Create and switch to your feature branch:
```bash
git checkout -b feature/YourFeatureName
```

3. Make your changes and stage them:
```bash
git add .
```

4. Commit your changes with a descriptive message:
```bash
git commit -m "feat: add your feature description"
```

5. Push your branch to your fork:
```bash
git push origin feature/YourFeatureName
```

6. Visit the original repository on GitHub and click "New Pull Request"
7. Select your branch from your fork and create the pull request with:
   - A clear title
   - Detailed description of changes
   - Any relevant issue numbers

## Author

Niladri Das
- GitHub: [@bniladridas](https://github.com/bniladridas)
- Twitter: [@bniladridas](https://twitter.com/bniladridas)
- LinkedIn: [Connect](https://linkedin.com/in/bniladridas)

## License

MIT License - see [LICENSE](LICENSE) for details.
