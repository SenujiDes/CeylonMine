# Royalty Calculator

A Next.js application for calculating royalties for users.

## Project Structure

```
/royalty-calculator
├── /app
│   ├── /api
│   │   └── calculateRoyalty.js
│   └── /calculate
│       └── page.jsx
├── package.json
├── README.md
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the calculation page by modifying `app/calculate/page.jsx`.

## Features

- Calculate royalties based on user input
- API endpoint for royalty calculations at `/api/calculateRoyalty`

## API Usage

The royalty calculation API can be accessed at:
```
/api/calculateRoyalty
```

## Technologies Used

- Next.js
- React
- JavaScript/JSX

## License

[MIT](https://choosealicense.com/licenses/mit/)
