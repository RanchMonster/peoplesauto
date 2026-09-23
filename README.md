# PeoplesAuto

A [Next.js](https://nextjs.org) (App Router) dealership site for Peoples Auto, built with React, TypeScript, and [Tailwind CSS](https://tailwindcss.com).

## Pages

- `/` — Home page with a hero image of vehicles and the inventory grid.
- `/details/[id]` — Vehicle detail page for a specific listing.
- `/apply` — Credit application page (good credit, bad credit, no problem). Includes a payment calculator.
- `/sell` — "Sell your vehicle" form for submitting a vehicle (VIN, photos, mileage, condition, notes). Includes a photo upload component.

## Components

- `components/header.tsx` — Persistent site header with the PeoplesAuto logo, slogan, and a "Sell your vehicle" button.
- `components/inventory-grid.tsx` — Renders the vehicle inventory grid.
- `components/payment-calculator.tsx` — Payment estimate calculator used on the apply page.
- `components/photo-upload.tsx` — Photo upload input for the sell-your-vehicle form.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (a recent Node version 20+ is recommended)
- npm (bundled with Node.js)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the source files.

### Other scripts

```bash
npm run build   # Create a production build
npm run start   # Serve the production build (run after `npm run build`)
npm run lint    # Run ESLint
```

## Project structure

```
app/                 # App Router pages (layout, home, details/[id], apply, sell)
components/          # Shared UI components
lib/                 # Data / helper modules (inventory, application)
public/              # Static assets
```

## About this build

This site is a template built for a friend's business using Next.js, React, TypeScript, and Tailwind CSS. If you're enjoying what you see, I'd welcome the opportunity to discuss how I could bring this same care and attention to your team on an ongoing basis — happy to talk anytime.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) — an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) — your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
