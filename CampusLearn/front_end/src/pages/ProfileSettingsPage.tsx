// src/pages/ProfileSettingsPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileSettingsBanner from '../components/ProfileSettingsBanner';
import SettingsRow from '../components/SettingsRow';
import FormInputCard from '../components/FormInputCard'; // Reusing FormInputCard for the main container

// Reusing FaArrowLeft from previous components
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);

// Mock profile state (for demonstration)
const initialSettings = {
    emailAlert: 'Enabled',
    replyAlert: 'Enabled',
    copilotSummary: 'Disabled',
} as const;

const ProfileSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = React.useState(initialSettings);
  
  // Example of toggling a setting
  const handleToggle = (key: keyof typeof initialSettings) => {
    setSettings(prev => ({
        ...prev,
        [key]: prev[key] === 'Enabled' ? 'Disabled' : 'Enabled'
    }));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements (consistent) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        
        {/* "Back to Home" Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate('/dashboard/student')} // Go back to Home (or a dashboard)
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Dashboard</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">Profile</h1>
        
        <ProfileSettingsBanner />

        {/* --- Profile Details and Settings Card --- */}
        <div className="rounded-2xl shadow-xl overflow-hidden mb-8 bg-purple-900 bg-opacity-40 border border-purple-800 border-opacity-50 backdrop-blur-md p-6 space-y-8">

            {/* Profile Details Section */}
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-center text-white pb-2 border-b border-purple-600">Profile Details</h2>
                
                {/* Inputs for Details */}
                <input
                    type="text"
                    readOnly
                    value="Full Name: Lindiwe Palesa Sibiya"
                    className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white font-medium focus:outline-none"
                />
                <input
                    type="text"
                    readOnly
                    value="Student ID: 577873"
                    className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white font-medium focus:outline-none"
                />
                <input
                    type="text"
                    readOnly
                    value="Certification: BCOM 3rd Year"
                    className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white font-medium focus:outline-none"
                />
            </div>
            
            {/* Settings Section */}
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-center text-white pb-2 border-b border-purple-600">Settings</h2>
                
                <SettingsRow 
                    label="Email & In-App Alert" 
                    status={settings.emailAlert} 
                    onClick={() => handleToggle('emailAlert')}
                />
                <SettingsRow 
                    label="Reply to my Topic: In-App Alert Only" 
                    status={settings.replyAlert} 
                    onClick={() => handleToggle('replyAlert')}
                />
                <SettingsRow 
                    label="Copilot Activity Summary: Weekly Email" 
                    status={settings.copilotSummary} 
                    onClick={() => handleToggle('copilotSummary')}
                />
            </div>

        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfileSettingsPage;