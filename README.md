# Wine Store

A modern, elegant e-commerce platform designed for discovering and purchasing minimal intervention wines. Built with a React frontend, Vite build tooling, and an Express backend for secure payment processing.

## Features

- **Storefront:** A curated product catalogue with filtering capabilities.
- **Cart System:** State management to handle item quantities and total calculation.
- **Checkout Flow:** A multi-step process including contact details, delivery address, and secure payment integration via Stripe.
- **Responsive Design:** A clean, mobile-friendly interface built using Tailwind CSS.
- **Form Validation:** Ensures all required fields are correctly completed before progressing.

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **Payments:** Stripe API (React Stripe.js)
- **State Management:** Zustand
- **Icons:** Lucide React

## Getting Started

### Prerequisites

You will need Node.js and npm installed to run the application.

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
4. Create a `.env` file in the root directory and add your Stripe keys:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key
   STRIPE_SECRET_KEY=your_secret_key
   ```

### Running Locally

To run the application locally, you will need to start both the frontend and backend servers.

1. Start the backend server (from the `server` directory):
   ```bash
   npm start
   ```
2. Start the frontend server (from the project root):
   ```bash
   npm run dev
   ```

## Author

Created by Owen J.
