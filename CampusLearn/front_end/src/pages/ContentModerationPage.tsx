// src/pages/ContentModerationPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Import your Header
import Footer from '../components/Footer'; // Import your Footer
import { FaArrowLeft, FaFileAlt } from 'react-icons/fa'; // Using real icons

// --- ICON MOCK-UPS ---
// Using placeholder icons as in your AdminDashboard example
const AuditIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M16 13l-3 3-2-2"/>
    </svg>
);
const SettingsShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M14.7 9.3l-5.4 5.4"/>
        <path d="M14.7 14.7l-5.4-5.4"/>
    </svg>
);
// --------------------

// Data structure for a content item
interface ContentItem {
    id: number;
    fileName: string;
    uploader: string;
    lastUpdated: string;
    isSelected: boolean;
}

// Reusable component for displaying a single content item
interface ContentItemRowProps {
    item: ContentItem;
    onSelect: (id: number) => void;
}

const ContentItemRow: React.FC<ContentItemRowProps> = ({ item, onSelect }) => (
    <div 
        onClick={() => onSelect(item.id)}
        className={`flex items-center p-4 cursor-pointer transition-all duration-200 
            ${item.isSelected 
                ? 'bg-purple-600/70 border-l-4 border-pink-400 shadow-lg' 
                : 'bg-purple-800/50 hover:bg-purple-700/50 border-l-4 border-transparent'
            } 
            rounded-xl mb-3`}
    >
        {/* Mock Campus Learn Logo/Icon */}
        <div className="w-10 h-10 rounded-full bg-white/20 mr-4 flex items-center justify-center border border-purple-400">
            <FaFileAlt className="w-4 h-4 text-purple-200" />
        </div>
        
        <div className="flex-1">
            <p className="text-lg font-medium text-white">{item.fileName}</p>
            <p className="text-sm text-gray-300">
                By [<span className="font-semibold text-pink-300">{item.uploader}</span>, Last updated: {item.lastUpdated}]
            </p>
        </div>
    </div>
);


const ContentModerationPage: React.FC = () => {
    const navigate = useNavigate();
    
    // Mock Data
    const initialContent: ContentItem[] = [
        { id: 1, fileName: 'SEN381, Slide 1.pdf', uploader: 'Eva', lastUpdated: '1 hours ago', isSelected: false },
        { id: 2, fileName: 'SEN381, Slide 2.pdf', uploader: 'Eva', lastUpdated: '1 hours ago', isSelected: false },
        { id: 3, fileName: 'SEN381, Slide 3.pdf', uploader: 'Eva', lastUpdated: '1 hours ago', isSelected: false },
        { id: 4, fileName: 'SEN381, Slide 4.pdf', uploader: 'Eva', lastUpdated: '1 hours ago', isSelected: false },
        // Add more mock data for scrolling, if needed
        { id: 5, fileName: 'INF245, Chapter 1.pdf', uploader: 'Leo', lastUpdated: '2 days ago', isSelected: false },
    ];

    const [contentList, setContentList] = React.useState<ContentItem[]>(initialContent);
    
    // Toggle selection status
    const handleSelectContent = (id: number) => {
        setContentList(prevList => 
            prevList.map(item => 
                item.id === id ? { ...item, isSelected: !item.isSelected } : item
            )
        );
    };

    // Placeholder actions
    const handleAccept = () => {
        const selectedCount = contentList.filter(item => item.isSelected).length;
        if (selectedCount === 0) {
            alert("Please select content to accept.");
            return;
        }
        console.log(`Accepted ${selectedCount} items.`);
        // In a real app, send API request, then filter list
        setContentList(prevList => prevList.filter(item => !item.isSelected));
    };

    const handleDelete = () => {
        const selectedCount = contentList.filter(item => item.isSelected).length;
        if (selectedCount === 0) {
            alert("Please select content to delete.");
            return;
        }
        if (window.confirm(`Are you sure you want to DELETE ${selectedCount} selected items?`)) {
            console.log(`Deleted ${selectedCount} items.`);
            // In a real app, send API request, then filter list
            setContentList(prevList => prevList.filter(item => !item.isSelected));
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
                        {/* Logo and Page Title */}
                        <div className="w-10 h-10 rounded-full bg-white/20 mr-3">
                            {/*  */}
                        </div>
                        <h1 className="text-xl font-semibold text-white">Profile</h1> {/* Title is 'Profile' in the image */}
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

                    {/* Moderate Content Banner */}
                    <div className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20  z-0"></div>
                        <div className="flex items-center justify-center space-x-6 z-10">
                            <AuditIcon className="w-10 h-10 text-white" />
                            <div className="flex flex-col items-center">
                                <h2 className="text-2xl font-bold uppercase tracking-widest">Moderate Content</h2>
                            </div>
                            <SettingsShieldIcon className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    {/* Content List Section */}
                    <div className="p-4 rounded-xl bg-purple-900/50 space-y-2 shadow-inner max-h-96 overflow-y-auto">
                        {contentList.map(item => (
                            <ContentItemRow 
                                key={item.id} 
                                item={item} 
                                onSelect={handleSelectContent} 
                            />
                        ))}
                        {contentList.length === 0 && (
                             <p className="text-center text-lg text-gray-400 py-8">No content items awaiting moderation.</p>
                        )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-center gap-6 pt-4">
                        <button
                            onClick={handleAccept}
                            className="px-8 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors shadow-lg"
                            disabled={contentList.filter(item => item.isSelected).length === 0}
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors shadow-lg border border-white/20"
                            disabled={contentList.filter(item => item.isSelected).length === 0}
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

export default ContentModerationPage;