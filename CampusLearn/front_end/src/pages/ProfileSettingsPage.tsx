// src/pages/ProfileSettingsPage.tsx

import React from 'react';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import ProfileSettingsBanner from '../components/ProfileSettingsBanner';

const ProfileSettingsPage: React.FC = () => {
  
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
            
            {/* Settings section removed — notification settings are not used */}

        </div>
    </Layout>
  );
};

export default ProfileSettingsPage;