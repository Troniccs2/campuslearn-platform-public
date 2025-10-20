import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- Main Pages ---
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";

// --- Authentication Forms ---
import AuthLoginForm from "./pages/AuthLoginForm";
import AuthRegistrationForm from "./pages/AuthRegistrationForm";
import AuthForgotPasswordForm from "./pages/AuthForgotPasswordForm";
// 🛑 CRITICAL NEW IMPORT 🛑
import AuthResetPasswordForm from "./pages/AuthResetPasswordForm";

// --- Dashboard Pages ---
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashBoard";
import AdminDashboard from "./pages/AdminDashboard";

// --- Topics Pages ---
import TopicsPage from "./pages/TopicsPage";
import TopicDetailsPage from "./pages/TopicDetailsPage";
import CreateTopicPage from "./pages/CreateTopicPage";
import ViewLearningMaterialsPage from "./pages/ViewLearningMaterialsPage";

// --- Forum Pages ---
import ForumsPage from "./pages/ForumsPage";
import ForumThreadListPage from "./pages/ForumThreadListPage";
import ForumThreadViewPage from "./pages/ForumThreadViewPage";

// --- Private Messaging Page ---
import PrivateMessagingPage from "./pages/PrivateMessagingPage";
import SearchComposePage from "./pages/SearchComposePage";
import ConversationViewPage from "./pages/ConversationViewPage";

// --- Profile Settings Page ---
import ProfileSettingsPage from "./pages/ProfileSettingsPage";

// --- AI Copilot Page ---
import AICopilotPage from "./pages/AICopilotPage";

// --- Admin Panel Page ---
import AdminPanelPage from "./pages/AdminPanelPage";
import ManageAccountsPage from "./pages/ManageAccountsPage";
import AccountManagementViewPage from "./pages/AccountManagementViewPage";
import PlatformAnalyticsPage from "./pages/PlatformAnalyticsPage";
import ContentModerationPage from "./pages/ContentModerationPage";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
           {" "}
      <Routes>
                {/* Main Application Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/about" element={<AboutPage />} />       {" "}
        {/* Authentication Form Routes */}
                <Route path="/auth/login" element={<AuthLoginForm />} />
               {" "}
        <Route path="/auth/register" element={<AuthRegistrationForm />} />
               {" "}
        <Route
          path="/auth/forgot-password"
          element={<AuthForgotPasswordForm />}
        />
        {/* 🛑 CRITICAL NEW ROUTE: For the email link to work 🛑 */}
        <Route
          path="/auth/reset-password"
          element={<AuthResetPasswordForm />}
        />
                {/* Dashboard Routes (Role-Gated) */}
               {" "}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/tutor-dashboard" element={<TutorDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
               {" "}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/dashboard/tutor" element={<TutorDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} /> 
              {/* Topics Routes */}
                <Route path="/topics" element={<TopicsPage />} />
                <Route path="/topics/:topicId" element={<TopicDetailsPage />} />
                <Route path="/topics/create" element={<CreateTopicPage />} />
               {" "}
        <Route
          path="/topics/:topicId/materials"
          element={<ViewLearningMaterialsPage />}
        />
               {" "}
        {/* Forum Routes - CRITICAL FIX: The list route MUST come before the view route */}
                <Route path="/forums" element={<ForumsPage />} />
               {" "}
        <Route path="/forums/:slug/threads" element={<ForumThreadListPage />} />
               {" "}
        <Route
          path="/forums/:slug/:threadId"
          element={<ForumThreadViewPage />}
        />
                {/* Private Messaging Route */}
                <Route path="/messages" element={<PrivateMessagingPage />} />
               {" "}
        <Route path="/messages/compose" element={<SearchComposePage />} />
               {" "}
        <Route
          path="/messages/:conversationId"
          element={<ConversationViewPage />}
        />
                {/* Profile Settings Route */}
                <Route path="/profile" element={<ProfileSettingsPage />} />
               {" "}
        <Route path="/profile/settings" element={<ProfileSettingsPage />} />   
            {/* AI Copilot Route */}
                <Route path="/copilot" element={<AICopilotPage />} />       {" "}
        {/* Admin Panel Route*/}
                <Route path="/admin-panel" element={<AdminPanelPage />} />
               {" "}
        <Route path="/admin/manage-accounts" element={<ManageAccountsPage />} />
               {" "}
        <Route
          path="/admin/manage-user/:accountId"
          element={<AccountManagementViewPage />}
        />
               {" "}
        <Route path="/admin/analytics" element={<PlatformAnalyticsPage />} />
               {" "}
        <Route
          path="/admin/moderate-content"
          element={<ContentModerationPage />}
        />
             {" "}
      </Routes>
         {" "}
    </Router>
  );
};

export default App;
