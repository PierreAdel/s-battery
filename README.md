# Sonnen Battery Dashboard

A modern, production-ready React application for battery analytics and monitoring, built with React Router, TypeScript, TailwindCSS, and Vite.

## Features

- ⚡️ Fast development with Vite
- 🛣️ Routing with React Router
- 🎨 Styled with TailwindCSS
- 🧪 Unit and component testing with Vitest, Jest, and React Testing Library
- 📦 TypeScript for type safety
- 📊 Battery analytics dashboard with charts (Recharts)
- 🧩 Modular UI components (Button, Badge, Card, etc.)
- 🔄 Data loading and async state management
- 🐳 Docker-ready for deployment

## Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 2. Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### 3. Running Tests

Run all unit and component tests:

```bash
npm test
```

### 4. Building for Production

Create a production build:

```bash
npm run build
```

### 5. Production

Start the production server:

```bash
npm run start
```

### 6. Docker Deployment

Build and run the app using Docker:

```bash
docker build -t sonnen-battery .
docker run -p 3000:3000 sonnen-battery
```

### 7. Project Structure

```
├── app/                        # Main app source code
│   ├── features/               # Feature modules (e.g., BatteryDashboard)
│   ├── components/             # App-level or shared components
│   ├── lib/                    # Shared libraries and utilities
│   ├── utils/                  # Utility functions
│   ├── routes/                 # Application routes
│   └── types/                  # TypeScript types
│
├── public/                     # Static assets
├── coverage/                   # Test coverage reports
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # TailwindCSS configuration
├── package.json
└── README.md
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for utility-first styling. You can customize styles in `tailwind.config.js`.

## Contributing

1. Fork the repo and create your branch: `git checkout -b my-feature`
2. Make your changes and add tests
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin my-feature`
5. Open a pull request

## License

MIT
