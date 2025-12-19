## Bitecraft - Modern Online Restaurant Ordering Application

[![View Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Now-%23308d46?style=for-the-badge)](https://bitecraft-demo.netlify.app/)

Bitecraft is a modern and fully-featured web application where users can browse restaurant products and place online orders.
Built with React and Tailwind CSS, Bitecraft delivers a complete online ordering experience with a landing page, interactive cart management, and a smooth ordering workflow.

## Features
* Product Browsing: Users can explore menu items and add them to the cart.
* Cart Management: Update item quantities or remove items from the cart.
* Location-Based Address Selection: Interactive and precise address selection powered by React Leaflet.
* Order Form: Simple checkout form with address and contact details.
* Contact Form: Allows users to send feedback, questions, or complaints.
* Advanced Form Handling: Built using React Hook Form for high-performance validation.
* Optimized Data Fetching: Server state management with React Query (TanStack Query).
---
## Technologies
| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React, Vite | Modern UI development with fast build tools |
| **Styling** | Tailwind CSS | Utility-first CSS framework. |
| **State Management** | Context API | Simple and centralized management of shopping cart transactions |
| **Data Fetching** | React Query | Caching, refetching, and server state synchronization |
| **Routing** | React Router | SPA navigation and routing |
| **Forms** | React Hook Form | High-performance form management and validation. |
| **Database / Backend** | Supabase | Realtime database, authentication, and storage. |
| **Maps & Location** | React Leaflet | Map interaction and location selection. |
---
## Installation and Operation

Follow the steps below to run this project locally.

### Prerequisites
* Node.js (LTS version recommended)
* npm or yarn (or pnpm)
* Supabase account and database schema of your project.
### Steps
1.  Clone the repository
    ```bash
    git clone https://github.com/kadirsahmeran/online-ordering-app-bitecraft.git
    cd online-ordering-app-bitecraft
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Create a .env file in the project root and add the required environment variables:

    ```
    # Environment variables (Vite requires the VITE_ prefix)
    VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
    VITE_SUPABASE_KEY=your-key-here
    ```

    > **Note:** In production, replace these values with your own Supabase project keys.

4.  Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The app will automatically open in your local browser at **`http://localhost:5173/`**.















