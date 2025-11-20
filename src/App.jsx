/**
 * App.jsx
 * Description:
 *  - Root component of the Bitecraft app.
 *  - Sets up React Query, global CartContext, Router, and Toast notifications.
 *  - Implements lazy loading for pages using React.lazy + Suspense.
 *  - Uses React Router v6+ nested routes with layouts.
 */

import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/CartContext";
import { lazy, Suspense } from "react";
import FullPageSpinner from "./ui/FullPageSpinner";

// ---------- Layouts ----------
import RootLayout from "./ui/RootLayout"; // Global layout (header/footer, theme)
import AppLayout from "./ui/AppLayout"; // Nested layout for specific routes (menu, order)
import ErrorPage from "./pages/ErrorPage"; // Global error fallback page

// ---------- Lazy-loaded Pages ----------
// With React.lazy, we increase performance by loading pages only when needed
const Home = lazy(() => import("./pages/Home"));
const Menu = lazy(() => import("./pages/Menu"));
const Order = lazy(() => import("./pages/Order"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));

// ---------- React Query Client ----------
// Managing API calls and caching across the application with queryClient
// staleTime: 24 hours -> data is considered fresh for 24 hours, it is not re-fetched
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
    },
  },
});

// ---------- Router Configuration ----------
const router = createBrowserRouter([
  {
    path: "/", // Main route
    element: <RootLayout />, // Global layout
    errorElement: <ErrorPage />, // Error page (404 or runtime errors)
    children: [
      {
        index: true, // "/" route
        element: (
          <Suspense fallback={<FullPageSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        element: <AppLayout />, // Nested layout for menu/order routes
        children: [
          {
            path: "menu",
            element: (
              <Suspense fallback={<FullPageSpinner />}>
                <Menu />
              </Suspense>
            ),
          },
          {
            path: "order",
            element: (
              <Suspense fallback={<FullPageSpinner />}>
                <Order />
              </Suspense>
            ),
          },
          {
            path: "order-confirmation/:orderId",
            element: (
              <Suspense fallback={<FullPageSpinner />}>
                <OrderConfirmation />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

// ---------- App Component ----------
// QueryClientProvider -> React Query global provider
// CartProvider -> Global cart state
// RouterProvider -> React Router v6 router
// Toaster -> Global toast notifications
export default function App() {
  return (
    <div className="bg-midnight">
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />

          {/* Global toast notifications */}
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "white",
                color: "black",
              },
            }}
          />
        </CartProvider>
      </QueryClientProvider>
    </div>
  );
}
