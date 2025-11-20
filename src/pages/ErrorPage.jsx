/**
 * Page: ErrorPage
 * Description:
 *  - Global error fallback page for all routes.
 *  - Handles both 404 (Not Found) errors and unexpected runtime errors.
 *  - Uses React Router's useRouteError() to read error details.
 *  - Provides navigation options to go back or return home.
 *  - Includes a custom broken plate SVG illustration for visual feedback.
 *
 * Shown When:
 *  - A route does not exist (404)
 *  - A loader/action fails
 *  - A component inside a route throws an error
 */

import { useNavigate, useRouteError } from "react-router";
import { ArrowLeft, Home } from "lucide-react";
import Button from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";

export default function ErrorPage() {
  // Retrieve error details supplied by React Router
  const error = useRouteError();

  // Navigation hook to return home or go back
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center customContainer">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* ---------- Error Code (404 or generic) ---------- */}
        <h1 className="text-8xl lg:text-9xl font-bold text-gold tracking-tight">
          {error?.status === 404 ? "404" : "Oops!"}
        </h1>

        {/* ---------- Error Title + Description ---------- */}
        <div className="space-y-4">
          <SectionTitle>
            {error?.status === 404
              ? "Page Not Found"
              : "Something went wrong..."}
          </SectionTitle>

          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            {error?.status === 404
              ? "The page you're looking for has either moved or never existed. But don't worry, delicious food is waiting for you!"
              : error?.statusText ||
                error?.message ||
                "An unknown error occurred."}
          </p>
        </div>

        {/* ---------- Decorative SVG Illustration ---------- */}
        <div>
          <div className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80">
            <svg
              role="img"
              aria-label="Broken plate illustration"
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-2xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="#CA9F5D"
                strokeWidth="8"
                opacity="0.2"
              />

              {/* Cracked plate shape */}
              <path
                d="M60 100 Q100 40 140 100 Q100 160 60 100 Z"
                fill="none"
                stroke="#CA9F5D"
                strokeWidth="6"
                className="animate-pulse"
              />

              {/* Crack lines */}
              <path
                d="M80 80 L90 90 M110 110 L120 120 M80 120 L90 110 M110 90 L120 80"
                stroke="#CA9F5D"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Center pulse animation */}
              <circle cx="100" cy="100" r="15" fill="#CA9F5D" opacity="0.3">
                <animate
                  attributeName="r"
                  values="15;20;15"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </div>

        {/* ---------- Navigation Options ---------- */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center ">
          {/* Go to home */}
          <Button
            mode="link"
            to="/"
            size="xl"
            rounded="full"
            className="flex items-center gap-3"
          >
            <Home size={20} />
            Return to Home Page
          </Button>

          {/* Go back to previous page */}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
