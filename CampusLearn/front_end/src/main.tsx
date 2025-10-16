import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx"; // Ensure this path and extension is correct for your App file
import "./index.css"; // Your global CSS file (or equivalent)

// --- CRITICAL FIX: Import the AuthProvider ---
// NOTE: Use .tsx extension if that's what solved your previous errors
import { AuthProvider } from "./context/AuthContext.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* This wrapper is essential. It provides the authentication state 
        to all child components (like your TopicsPage and CreateTopicPage).
        This should solve the white page error if it was caused by useAuth() failing.
      */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  // Good practice to handle the case where the root element is missing
  console.error("Root element with ID 'root' not found in the document.");
}
