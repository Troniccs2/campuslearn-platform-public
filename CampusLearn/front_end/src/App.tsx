import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- Main Pages ---
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";

// 1. ENSURE ALL NEW FORM COMPONENTS ARE IMPORTED
import AuthLoginForm from "./pages/AuthLoginForm";
import AuthRegistrationForm from "./pages/AuthRegistrationForm";
import AuthForgotPasswordForm from "./pages/AuthForgotPasswordForm";

import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashBoard";
import AdminDashboard from "./pages/AdminDashboard";


import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* 2. ENSURE ALL NEW AUTH FORM ROUTES ARE DEFINED AND POINT TO THE CORRECT COMPONENT */}
        <Route path="/auth/login" element={<AuthLoginForm />} />
        <Route path="/auth/register" element={<AuthRegistrationForm />} />
        <Route
          path="/auth/forgot-password"
          element={<AuthForgotPasswordForm />}
        />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/tutor" element={<TutorDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
