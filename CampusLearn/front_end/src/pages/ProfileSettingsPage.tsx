// src/pages/ProfileSettingsPage.tsx

import React from 'react';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import ProfileSettingsBanner from '../components/ProfileSettingsBanner';
import SettingsRow from '../components/SettingsRow';

// Mock profile state (for demonstration)
const initialSettings = {
    emailAlert: 'Enabled',
    replyAlert: 'Enabled',
    copilotSummary: 'Disabled',
} as const;

const ProfileSettingsPage: React.FC = () => {
  const [settings, setSettings] = React.useState(initialSettings);
  
  // Example of toggling a setting
  const handleToggle = (key: keyof typeof initialSettings) => {
    setSettings(prev => ({
        ...prev,
        [key]: prev[key] === 'Enabled' ? 'Disabled' : 'Enabled'
    }));
  };
  
  return (
    <Layout variant="dark">
      <BackButton label="< Dashboard" />

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
    </Layout>
  );
};

export default ProfileSettingsPage;