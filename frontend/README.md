# RecoverX - Campus Lost & Found System - Frontend

A simple, clean frontend for managing lost and found items on campus, built with React and Tailwind CSS.

## Features

- **Public Pages**: properly styled Home, Report Lost, Report Found.
- **Student Features**: Report Lost/Found items, automatic matching suggestions, claim items with verification.
- **Admin Features**: Dashboard with stats, review claims, approve/reject claims, view analytics.
- **Authentication**: Admin login with token-based authentication.

## Setup & Running

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Backend Connection**:
    The frontend is configured to connect to `http://localhost:5000/api`. Ensure your backend server is running on this port.
    You can modify the base URL in `src/services/api.js`.

## Project Structure

- `src/components`: Reusable UI components (Navbar, etc.)
- `src/pages`: Page components (Home, ReportLost, AdminDashboard, etc.)
- `src/services`: API configuration (Axios)
- `src/`: Main entry point (main.jsx, App.jsx, index.css)

## Technologies Used

- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React (Icons)
- Framer Motion (Animations)
