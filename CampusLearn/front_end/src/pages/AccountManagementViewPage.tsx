// src/pages/AccountManagementViewPage.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Assuming this provides the top bar and logo
import Footer from '../components/Footer'; // Assuming this provides the footer
import { FaArrowLeft } from 'react-icons/fa'; // Use real icons for better visuals

// --- Custom Icon/Component Mock-ups (Replace with actual if needed) ---
// Using FaArrowLeft from the reference code for the back button
// Re-using the Header and Footer from your provided code structure.

// Type for the user data displayed on the page
interface UserAccountDetails {
  fullName: string;
  studentId: string;
  certification: string;
  // Settings can be expanded, but for now, simple strings suffice
  emailAlert: 'Enabled' | 'Disabled';
  replyAlert: 'Enabled' | 'Disabled';
  copilotSummary: 'Enabled' | 'Disabled';
}

// Mock Data - In a real app, this would be fetched based on the userId
const mockUserData: UserAccountDetails = {
  fullName: "Lindiwe Palesa Sibiya",
  studentId: "577873",
  certification: "BCOM 3rd Year",
  emailAlert: "Enabled",
  replyAlert: "Enabled",
  copilotSummary: "Disabled",
};
// -------------------------------------------------------------------

// Utility component for the rounded profile detail rows
interface DetailRowProps {
    label: string;
    value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
    <div className="flex flex-col mb-4 p-3 bg-white/10 rounded-lg border border-purple-500/30">
        <span className="text-xs font-light text-gray-300 uppercase tracking-wider">{label}</span>
        <span className="text-base font-medium text-white">{value}</span>
    </div>
);

// Utility component for the settings dropdown/toggle
interface SettingToggleProps {
    label: string;
    status: 'Enabled' | 'Disabled';
    onToggle: () => void; // Function to handle status change
}

const SettingToggle: React.FC<SettingToggleProps> = ({ label, status, onToggle }) => (
    <div className="flex justify-between items-center py-3 border-b border-purple-500/20 last:border-b-0 cursor-pointer" onClick={onToggle}>
        <span className="text-sm text-gray-200">{label}</span>
        <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${status === 'Enabled' ? 'text-green-400' : 'text-red-400'}`}>
                ({status})
            </span>
            {/* Simple Up Arrow icon for visual consistency with the image */}
            <span className="text-white text-lg leading-none transform -translate-y-px">^</span>
        </div>
    </div>
);


const AccountManagementViewPage: React.FC = () => {
    // Assuming the user ID comes from the URL
    const { userId } = useParams<{ userId?: string }>();
    const navigate = useNavigate();
    
    // State for the user data (would be fetched from an API in a real app)
    const [accountDetails, setAccountDetails] = React.useState<UserAccountDetails>(mockUserData);

    // Placeholder for handling setting changes
    const handleToggle = (setting: keyof Pick<UserAccountDetails, 'emailAlert' | 'replyAlert' | 'copilotSummary'>) => {
        // In a real application, you'd send an API request here
        setAccountDetails(prev => ({
            ...prev,
            [setting]: prev[setting] === 'Enabled' ? 'Disabled' : 'Enabled'
        }));
    };

    // Placeholder actions
    const handleAccept = () => {
        console.log(`Accepted/Saved changes for user: ${accountDetails.fullName}`);
        // Navigate back to the management list or dashboard
        navigate('/dashboard/admin'); 
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to DELETE user: ${accountDetails.fullName}?`)) {
            console.log(`Deleted user: ${accountDetails.fullName}`);
            // API call to delete user, then navigate away
            navigate('/dashboard/admin'); 
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
                <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            </div>

            <Header />

            <main className="max-w-xl mx-auto py-4 px-4 space-y-6 relative z-10">
                
                {/* Top Navigation Panel - Mimicking the image structure */}
                <div className="flex justify-between items-center bg-[#512c85] p-3 rounded-t-lg shadow-xl">
                    <div className="flex items-center">
                        {/* Logo and Page Title (AdminPanel/StudentTutorAccountMangement) */}
                        <div className="w-10 h-10 rounded-full bg-white/20 mr-3">
                            {/*  */}
                        </div>
                        <h1 className="text-xl font-semibold text-white">Profile</h1>
                    </div>
                    {/* Top Right Nav Links */}
                    <div className="flex gap-4">
                        {['Home', 'Topics', 'Forums'].map(item => (
                            <button key={item} className="text-sm font-medium text-white/80 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10">{item}</button>
                        ))}
                        <button className="text-sm font-medium text-white bg-pink-600 px-3 py-2 rounded-full shadow-lg">Private Messaging</button>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-2xl p-6 space-y-6 border border-purple-700/50">
                    
                    {/* Back Button / Manage Link */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium text-sm p-2 rounded-lg bg-purple-900/50"
                    >
                        <FaArrowLeft className="w-3 h-3" />
                        <span>Manage</span>
                    </button>

                    {/* Tutor/Student Details Banner - Using similar style to your AdminDashboard */}
                    <div className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20  z-0"></div>
                        <div className="flex flex-col items-center z-10">
                             <div className="flex items-center gap-3">
                                 {/* Mock Icons for visual flair */}
                                 <span className="text-4xl">🎓</span>
                                 <span className="text-4xl">👤</span>
                             </div>
                            <h2 className="text-2xl font-bold uppercase tracking-widest mt-2">Tutor / Student Details</h2>
                            <p className="text-sm font-light opacity-80">User Profiles & Information</p>
                        </div>
                    </div>

                    {/* Profile Details Section */}
                    <div className="p-4 rounded-xl bg-purple-900/50 space-y-4 shadow-inner">
                        <h3 className="text-2xl font-bold text-white text-center mb-6">Profile Details</h3>
                        
                        <DetailRow label="Full Name:" value={accountDetails.fullName} />
                        <DetailRow label="Student ID:" value={accountDetails.studentId} />
                        <DetailRow label="Certification:" value={accountDetails.certification} />
                        
                        {/* Settings Section */}
                        <h3 className="text-2xl font-bold text-white text-center mt-8 mb-4">Settings</h3>
                        
                        <div className="space-y-1">
                            <SettingToggle 
                                label="Email & In-App Alert" 
                                status={accountDetails.emailAlert} 
                                onToggle={() => handleToggle('emailAlert')}
                            />
                            <SettingToggle 
                                label="Reply to my topic: In-App Alert Only" 
                                status={accountDetails.replyAlert} 
                                onToggle={() => handleToggle('replyAlert')}
                            />
                            <SettingToggle 
                                label="Copilot Activity Summary: Weekly Email" 
                                status={accountDetails.copilotSummary} 
                                onToggle={() => handleToggle('copilotSummary')}
                            />
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-center gap-6 pt-4">
                        <button
                            onClick={handleAccept}
                            className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg"
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                        >
                            Delete
                        </button>
                    </div>

                </div>
                
            </main>
            
            <Footer />
        </div>
    );
};

export default AccountManagementViewPage;