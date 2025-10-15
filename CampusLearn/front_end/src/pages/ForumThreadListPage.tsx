// src/pages/ForumThreadListPage.tsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopicCard from '../components/TopicCard'; // Reusing the visual structure
import BrowseThreadsBanner from '../components/BrowseThreadsBanner';

// Reusing FaArrowLeft from previous components
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);


const ForumThreadListPage: React.FC = () => {
  const navigate = useNavigate();
  // We'll use the categoryId to display the selected category name (e.g., Workshops)
  const { categoryId } = useParams<{ categoryId: string }>(); 

  // Basic capitalization for display (In a real app, this would be looked up)
  const categoryName = categoryId ? 
    categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ') : 
    'Forum Category';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements (consistent) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        
        {/* "Back to Categories" Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate('/forums')} // Navigate back to the main forum categories page
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Categories</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">{categoryName}</h1>
        
        <BrowseThreadsBanner />

        {/* List of Thread Cards (Using TopicCard for styling consistency) */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          <TopicCard 
            topicName="SEN381" 
            author="Eva" 
            lastUpdated="1 hours ago" 
            href={`/forums/${categoryId}/sen381-thread`} 
          />
          <TopicCard 
            topicName="PRG381" 
            author="Reece" 
            lastUpdated="3 hours ago" 
            href={`/forums/${categoryId}/prg381-thread`} 
          />
          <TopicCard 
            topicName="MAT281" 
            author="Simba" 
            lastUpdated="1 hours ago" 
            href={`/forums/${categoryId}/mat281-thread`} 
          />
          <TopicCard 
            topicName="MLG381" 
            author="Jeremia" 
            lastUpdated="8 hours ago" 
            href={`/forums/${categoryId}/mlg381-thread`} 
          />
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default ForumThreadListPage;