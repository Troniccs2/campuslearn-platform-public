// src/pages/PrivateMessagingPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopicCard from '../components/TopicCard'; // Reusing for conversation items
import InboxBanner from '../components/InboxBanner';
import ActionBanner from '../components/ActionBanner'; // Reusing for Compose button

// Placeholder Icons
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);
const ComposeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5l4 4L7.5 19H3v-4.5L16.5 3.5z"/></svg>
);


const PrivateMessagingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements (consistent) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        
        {/* "Back to Dashboard" Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate(-1)} // Go back to the dashboard
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; DashBoard</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">Browse Messages</h1>
        
        <InboxBanner />

        {/* List of Conversation Cards (Using TopicCard for styling) */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          {/* Note: In a real app, the topicName would be the sender's name/ID, and the author/update would be the last message snippet/time */}
          <TopicCard 
            topicName="Eva" 
            author="Please check your marks on Moodle!" 
            lastUpdated="" // Leaving lastUpdated empty to show only the message snippet
            href="/messages/eva" 
          />
          <TopicCard 
            topicName="577656" 
            author="Hey bro, could you please help me with MAT281" 
            lastUpdated=""
            href="/messages/577656" 
          />
          <TopicCard 
            topicName="644532" 
            author="Good luck for writing tomorrow, you've got the notes!" 
            lastUpdated=""
            href="/messages/644532" 
          />
        </div>

        {/* Compose New Message Action Banner */}
        <ActionBanner
            title="COMPOSE NEW MESSAGE"
            href="/messages/compose"
            Icon={ComposeIcon}
            gradient="from-[#FF00FF] to-[#8A2BE2]" // Pink to Purple
        />
        
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivateMessagingPage;