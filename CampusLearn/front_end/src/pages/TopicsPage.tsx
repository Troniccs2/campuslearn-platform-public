// src/pages/TopicsPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopicCard from '../components/TopicCard';
import CreateNewTopicBanner from '../components/CreateNewTopicBanner';

// Reusing FaArrowLeft from previous components, ensure consistency if using react-icons
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);

const TopicsPage: React.FC = () => {
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
        {/*WE MUST FIGURE OUT THE DAHBOARD LINK TO REFER TO EITHER STUDENT OR TUTOR OR ADMIN DASH*/}
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

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">Browse Topics</h1>
        
        <CreateNewTopicBanner href="/topics/create" />

        {/* List of Topic Cards */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          <TopicCard 
            topicName="SEN381" 
            author="Eva" 
            lastUpdated="1 hours ago" 
            href="/topics/SEN381" 
          />
          <TopicCard 
            topicName="LPR381" 
            author="Simba" 
            lastUpdated="6 hours ago" 
            href="/topics/LPR381" 
          />
          <TopicCard 
            topicName="DBD271" 
            author="Hanno" 
            lastUpdated="3 hours ago" 
            href="/topics/DBD271" 
          />
          <TopicCard 
            topicName="WPR381" 
            author="Reece" 
            lastUpdated="2 hours ago" 
            href="/topics/WPR381" 
          />
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default TopicsPage;