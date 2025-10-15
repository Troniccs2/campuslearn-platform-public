// src/pages/PlatformAnalyticsPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Import your Header
import Footer from '../components/Footer'; // Import your Footer
// Assuming FaArrowLeft is available, either imported or defined locally
import { FaArrowLeft } from 'react-icons/fa'; 

// --- ICON MOCK-UPS ---
// Using placeholder icons as in your AdminDashboard example
const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="6" height="8" rx="1"/><rect x="9" y="8" width="6" height="12" rx="1"/><rect x="15" y="4" width="6" height="16" rx="1"/></svg>
);
const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-4 18.5V22h8v-1.5A10 10 0 0 0 12 2z"/><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M12 15h.01"/><path d="M12 9h.01"/><path d="M18 15h.01"/><path d="M6 15h.01"/></svg>
);
// --------------------

// Data structure for the platform metrics displayed in the card
interface MetricProps {
    title: string;
    value: React.ReactNode; // Use React.ReactNode to allow for styled spans/text
    footer?: string;
    colorClass: string; // Tailwind class for color accent
    flexBasisClass?: string; // Optional class for layout (e.g., basis-1/2)
}

// Reusable component for displaying an individual metric block
const MetricBlock: React.FC<MetricProps> = ({ title, value, footer, colorClass, flexBasisClass = 'basis-full sm:basis-1/3' }) => (
    <div className={`p-4 rounded-xl bg-gray-700/50 border-l-4 ${colorClass} shadow-md ${flexBasisClass}`}>
        <p className="text-sm font-light text-gray-300 uppercase tracking-wider">{title}</p>
        <div className={`text-3xl font-bold ${colorClass.replace('border-l-4', 'text')}`}>{value}</div>
        {footer && <p className="text-xs mt-1 text-gray-400">{footer}</p>}
    </div>
);

// Component for the main Platform Analytics Card
const PlatformAnalyticsWidget: React.FC = () => {
    // Mock data based on the image
    const platformData = {
        dateRange: "Last 30 Days (October 1 - October 30, 2025)",
        lastUpdated: "October 30, 2025, 11:45 AM SAST",
        uptime: "99.98%",
        load: "1.8s",
        
        totalActiveUsers: "1,250",
        userBreakdown: "Students: 1,180 | Tutors: 70 (+5% from previous period)",
        
        DAU: "480",
        avgSession: "00:08:32 (+1:03)",
        
        learningMaterials: "155 total",
        mostViewed: '"DIT Best Practices for Team Projects" [890 views]',

        privateMessaging: "490",
        avgPerTutor: "12.7",

        newRegistrations: "120 Students - 5 Tutors",
        registrationChange: "(+10% from previous period)",

        topicsCreated: "285",
        topCategory: "Software Engineering (75)",

        copilotInteractions: "2,130",
        escalations: "Escalations to Tutors: 55",
        topEscalation: "Top escalation reason: Advanced Debugging Techniques"
    };

    const StatusBadge: React.FC<{ uptime: string, load: string }> = ({ uptime, load }) => (
        <div className="flex flex-col items-end text-sm">
            <span className="text-green-400 font-semibold">Uptime: {uptime}</span>
            <span className="text-yellow-400 font-semibold">Load: {load}</span>
        </div>
    );

    return (
        <div className="p-4 rounded-xl bg-purple-900/50 space-y-4 shadow-inner">
            <div className="flex justify-between items-start border-b border-purple-500/30 pb-3">
                <div className="text-sm text-gray-300">
                    <h3 className="text-lg font-semibold text-white mb-1">Platform Analytics — Overview</h3>
                    <p>Date Range: {platformData.dateRange}</p>
                    <p>Last Updated: {platformData.lastUpdated}</p>
                </div>
                <StatusBadge uptime={platformData.uptime} load={platformData.load} />
            </div>

            {/* Grid of Metrics */}
            <div className="flex flex-wrap gap-4">
                
                {/* Row 1 */}
                <MetricBlock 
                    title="Total Active Users" 
                    value={platformData.totalActiveUsers} 
                    footer={platformData.userBreakdown}
                    colorClass="border-l-4 border-teal-400 text-teal-400"
                    flexBasisClass="basis-full sm:basis-[31%]"
                />
                <MetricBlock 
                    title="DAU" 
                    value={platformData.DAU} 
                    footer={`Avg session: ${platformData.avgSession}`}
                    colorClass="border-l-4 border-orange-400 text-orange-400"
                    flexBasisClass="basis-full sm:basis-[31%]"
                />
                <MetricBlock 
                    title="Learning Materials" 
                    value={<>{platformData.learningMaterials} <span className="text-base font-normal">total</span></>} 
                    footer={`Most viewed: ${platformData.mostViewed}`}
                    colorClass="border-l-4 border-pink-400 text-pink-400"
                    flexBasisClass="basis-full sm:basis-[31%]"
                />

                {/* Row 2 */}
                <MetricBlock 
                    title="New Registrations" 
                    value={platformData.newRegistrations} 
                    footer={platformData.registrationChange}
                    colorClass="border-l-4 border-blue-400 text-blue-400"
                    flexBasisClass="basis-full sm:basis-[31%]"
                />
                <MetricBlock 
                    title="Topics Created" 
                    value={platformData.topicsCreated} 
                    footer={`Top category: ${platformData.topCategory}`}
                    colorClass="border-l-4 border-yellow-400 text-yellow-400"
                    flexBasisClass="basis-full sm:basis-[31%]"
                />
                <MetricBlock 
                    title="Private Messaging" 
                    value={platformData.privateMessaging} 
                    footer={`Avg per tutor: ${platformData.avgPerTutor}`}
                    colorClass="border-l-4 border-indigo-400 text-indigo-400"
                    flexBasisClass="basis-full sm:basis-[31%]"
                />
                
                {/* Row 3 - Copilot/Escalations */}
                 <MetricBlock 
                    title="Copilot Interactions" 
                    value={<>{platformData.copilotInteractions} <span className="text-base font-normal">| Escalations to Tutors: {platformData.escalations}</span></>} 
                    footer={platformData.topEscalation}
                    colorClass="border-l-4 border-red-400 text-red-400"
                    flexBasisClass="basis-full"
                />

            </div>
        </div>
    );
};


const PlatformAnalyticsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
            {/* Background elements (reused from AdminDashboard) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
                <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            </div>
            
            <Header />

            <main className="max-w-6xl mx-auto py-4 px-4 space-y-6 relative z-10">
                
                {/* Top Navigation Panel - Mimicking the image structure */}
                <div className="flex justify-between items-center bg-[#512c85] p-3 rounded-t-lg shadow-xl">
                    <div className="flex items-center">
                        {/* Logo and Page Title */}
                        <div className="w-10 h-10 rounded-full bg-white/20 mr-3">
                            {/*  */}
                        </div>
                        <h1 className="text-xl font-semibold text-white">Admin</h1>
                    </div>
                    {/* Top Right Nav Links */}
                    <div className="flex gap-4">
                        {['Home', 'Private Messaging', 'Profile / Settings'].map(item => (
                            <button key={item} className="text-sm font-medium text-white/80 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10">{item}</button>
                        ))}
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-2xl p-6 space-y-6 border border-purple-700/50">
                    
                    {/* Back Button / AdminPanel Link */}
                    <button
                        onClick={() => navigate('/admin-panel')} // Assuming this goes back to the main admin grid
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium text-sm p-2 rounded-lg bg-purple-900/50"
                    >
                        <FaArrowLeft className="w-3 h-3" />
                        <span>AdminPanel</span>
                    </button>

                    {/* Platform Analytics Banner */}
                    <div className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20  z-0"></div>
                        <div className="flex items-center justify-center space-x-6 z-10">
                            <ChartBarIcon className="w-10 h-10 text-white" />
                            <div className="flex flex-col items-center">
                                <h2 className="text-2xl font-bold uppercase tracking-widest">Platform Analytics</h2>
                                <p className="text-sm font-light opacity-80">Performance & Insights</p>
                            </div>
                            <BrainIcon className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    {/* Analytics Widget */}
                    <PlatformAnalyticsWidget />
                    
                </div>
                
            </main>
            
            <Footer />
        </div>
    );
};

export default PlatformAnalyticsPage;