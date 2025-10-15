import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Reusable Button Component based on Admin Panel Design ---
interface AdminButtonProps {
  title: string;
  subtitle: string;
  href: string;
  IconLeft: React.FC<React.SVGProps<SVGSVGElement>>;
  IconRight: React.FC<React.SVGProps<SVGSVGElement>>;
  size: 'large' | 'medium' | 'small';
}

const AdminPanelButton: React.FC<AdminButtonProps> = ({ title, subtitle, href, IconLeft, IconRight, size }) => {
    let sizeClasses = '';
    let textClasses = '';
    let paddingClasses = 'p-6';
    let gradient = 'bg-gradient-to-r from-purple-800 via-indigo-800 to-teal-700';
    let shadow = 'shadow-2xl';

    switch (size) {
        case 'large':
            sizeClasses = 'h-36';
            textClasses = 'text-xl font-extrabold';
            gradient = 'bg-gradient-to-r from-purple-800 via-indigo-800 to-teal-700';
            break;
        case 'medium':
            sizeClasses = 'h-24';
            textClasses = 'text-lg font-bold';
            gradient = 'bg-gradient-to-r from-pink-600 to-red-600';
            break;
        case 'small':
            sizeClasses = 'h-16';
            textClasses = 'text-md font-bold';
            paddingClasses = 'p-3';
            gradient = 'bg-gradient-to-r from-teal-500 to-green-500';
            shadow = 'shadow-lg';
            break;
    }

    return (
        <Link
            to={href}
            className={`
                ${sizeClasses} ${paddingClasses} w-full flex justify-between items-center rounded-2xl ${shadow}
                ${gradient} text-white transition-transform duration-300 transform hover:scale-[1.02]
                border border-opacity-30 border-white
            `}
        >
            <div className="flex items-center gap-4">
                <IconLeft className={`w-8 h-8 ${size === 'small' ? 'w-6 h-6' : 'w-8 h-8'}`} />
                <div>
                    <h2 className={`${textClasses} uppercase tracking-wider`}>{title}</h2>
                    {subtitle && <p className="text-sm font-light opacity-80">{subtitle}</p>}
                </div>
            </div>
            <IconRight className={`w-10 h-10 ${size === 'small' ? 'w-6 h-6' : 'w-10 h-10'}`} />
        </Link>
    );
};

// --- ICON Definitions ---
// User Management Icon (Left: Users, Right: Shield)
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
);

// Analytics Icon (Left: Chart, Right: Brain)
const ChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="4" y1="20" x2="20" y2="20"/></svg>
);
const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10V4a2 2 0 0 1 4 0v2"/><path d="M12 10V4a2 2 0 0 0-4 0v2"/><path d="M12 10v12"/><path d="M16 12a2 2 0 0 0-4-4-2 2 0 0 0-4 4v4a2 2 0 0 0 4 4 2 2 0 0 0 4-4z"/></svg>
);

// Moderation Icon (Left: Clipboard/List, Right: Lock/Content)
const ClipboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v1h8V3a1 1 0 0 0-1-1z"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg>
);
const ContentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="10" y2="9"/></svg>
);

// Back Arrow
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);

// --- AdminPanelPage Component ---
const AdminPanelPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            </div>

            <Header />

            <main className="max-w-4xl mx-auto py-4 px-4 space-y-8 relative z-10">
                
                {/* Header Title and Back Button */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => navigate(-1)} // Go back to the previous page (TutorDashboard)
                        className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        <span>&lt; Dashboard</span>
                    </button>
                    <h1 className="text-3xl font-extrabold text-white text-right">Admin Panel</h1>
                </div>

                {/* Main Content Area */}
                <div className="space-y-6">
                    
                    {/* MANAGE ACCOUNTS */}
                    <AdminPanelButton
                        title="MANAGE STUDENT AND TUTOR ACCOUNTS"
                        subtitle="Administration & User Roles"
                        href="/admin/manage-accounts"
                        IconLeft={UsersIcon}
                        IconRight={ShieldIcon}
                        size="large"
                    />

                    {/* PLATFORM ANALYTICS */}
                    <AdminPanelButton
                        title="PLATFORM ANALYTICS"
                        subtitle="Performance & Insights"
                        href="/admin/analytics"
                        IconLeft={ChartIcon}
                        IconRight={BrainIcon}
                        size="large"
                    />
                    
                    {/* MODERATE CONTENT */}
                    <AdminPanelButton
                        title="MODERATE CONTENT"
                        subtitle="Content Review & Safety"
                        href="/admin/moderate-content"
                        IconLeft={ClipboardIcon}
                        IconRight={ContentIcon}
                        size="large"
                    />

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminPanelPage;
