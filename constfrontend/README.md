# Royalty Calculation Web App - Frontend

## Overview

The **Rock Royalty Calculation Web App** is a specialized tool designed for the **Geological Survey and Mines Bureau (GSMB)** of Sri Lanka. It helps automate the calculation of royalties for metal quarry operations using various input parameters. This repository contains the frontend of the application, built with **Next.js** for a fast, modern, and responsive user experience.

## Tech Stack

- **Next.js** - React-based framework for SSR and SSG
- **TypeScript** - Strongly typed JavaScript for better maintainability
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - For making API requests to the Flask backend
- **React Hook Form** - For handling form inputs and validation
- **Recharts** (Optional) - For data visualization

## Features

✅ **User Input Form** - Users can enter data such as Water Gel, NH₄NO₃, and Powder Factor.
✅ **Real-Time Calculations** - API calls to Flask backend for immediate royalty calculations.
✅ **Dynamic UI** - Updates values as users modify inputs.
✅ **Download Reports** - Option to generate PDF/Excel reports.
✅ **History Tracking** - Stores previous calculations for future reference.

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm, yarn, or pnpm

### Clone the Repository

```sh
git clone https://github.com/your-repo/rock-royalty-frontend.git
cd rock-royalty-frontend
```

### Install Dependencies

Using npm:

```sh
npm install
```

Using yarn:

```sh
yarn install
```

Using pnpm:

```sh
pnpm install
```

### Run the Development Server

```sh
npm run dev  # or yarn dev, pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Folder Structure

```
rock-royalty-frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Next.js pages
│   ├── styles/      # Tailwind CSS global styles
│   ├── utils/       # Utility functions
│   ├── hooks/       # Custom React hooks
│   ├── services/    # API request functions
│   ├── config/      # Environment variables and constants
│   ├── types/       # TypeScript interfaces
├── .env.local       # Environment variables
├── package.json     # Project dependencies and scripts
├── tsconfig.json    # TypeScript configuration
└── README.md        # Project documentation
```

## Environment Variables

Create a `.env.local` file to store API keys and backend URLs:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Deployment

The recommended way to deploy a Next.js application is through **Vercel**.

### Deploy on Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project directory and follow the prompts.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a Pull Request

---

### 📌 Developed for **GSMB Sri Lanka** to streamline royalty calculations efficiently. 🚀


