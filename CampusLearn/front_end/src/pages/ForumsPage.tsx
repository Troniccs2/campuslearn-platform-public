// src/pages/ForumsPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopicCard from '../components/TopicCard'; // Reusing the visual structure of TopicCard
import ForumCategoriesBanner from '../components/ForumCategoriesBanner';

// Reusing FaArrowLeft from previous components, ensure consistency if using react-icons
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);


const ForumsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements (consistent with other pages) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        
        {/* "Back to Dashboard" Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page (dashboard)
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; DashBoard</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">Forum</h1>
        
        <ForumCategoriesBanner />

        {/* List of Forum Category Cards (Using TopicCard for styling consistency) */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          {/* Note: In a real app, these would link to a ForumDetail Page */}
          <TopicCard 
            topicName="Workshops" 
            author="Eva" 
            lastUpdated="1 hours ago" 
            href="/forums/workshops" 
          />
          <TopicCard 
            topicName="Announcements" 
            author="Simba" 
            lastUpdated="6 hours ago" 
            href="/forums/announcements" 
          />
          <TopicCard 
            topicName="Extra Lessons" 
            author="Hanno" 
            lastUpdated="3 hours ago" 
            href="/forums/lessons" 
          />
          <TopicCard 
            topicName="School Uniform" 
            author="Reece" 
            lastUpdated="2 hours ago" 
            href="/forums/uniform" 
          />
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default ForumsPage;