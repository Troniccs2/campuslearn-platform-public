// src/pages/TutorDashboard.tsx

import React from 'react';
import DashboardGridIcon from '../components/DashboardGridIcon';
import MicrosoftCopilotWidget from '../components/MicrosoftCopilotWidget';
import AdminPanelWidget from '../components/AdminPanelWidget';
import Header from '../components/Header'; // Import your Header
import Footer from '../components/Footer'; // Import your Footer
import { useNavigate, Link } from 'react-router-dom'; // Import Link

// --- PLACEHOLDER ICONS (Reuse from StudentDashboard) ---
// IMPORTANT: Replace these with your actual icon imports (e.g., from 'react-icons/fa')
const TopicIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
);
const ForumIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
const MessageIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/><path d="M12 13c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
);
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);
// ----------------------------


const TutorDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    // Use the same background style as AuthPage for consistency
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements (optional, can be moved to a Layout component) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        
        {/* Back to Home Link */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Home</span>
          </button>
        </div>

        {/* Dashboard Grid Icons */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <DashboardGridIcon title="TOPICS" Icon={TopicIcon} href="/topics" />
          <DashboardGridIcon title="FORUMS" Icon={ForumIcon} href="/forums" />
          <DashboardGridIcon title="PRIVATE MESSAGING" Icon={MessageIcon} href="/messages" />
          <DashboardGridIcon title="PROFILE / SETTINGS" Icon={SettingsIcon} href="/profile" />
        </div>

        {/* 🌟 AI BUTTON / COPILOT LINK ADDED HERE 🌟 */}
        {/* The entire widget is now clickable and acts as the AI button */}
        <Link to="/copilot" className="block w-full">
            <MicrosoftCopilotWidget />
        </Link>
        
        <AdminPanelWidget />
        
      </main>
      
      <Footer />
    </div>
  );
};

export default TutorDashboard;
