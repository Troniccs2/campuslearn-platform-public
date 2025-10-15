// src/pages/ViewLearningMaterialsPage.tsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopicCard from '../components/TopicCard'; // Reusing the visual structure
import LearningMaterialsBanner from '../components/LearningMaterialsBanner';

// Reusing FaArrowLeft from previous components
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);


const ViewLearningMaterialsPage: React.FC = () => {
  const navigate = useNavigate();
  // We'll use the topicId to display the module code (e.g., SEN381)
  const { topicId } = useParams<{ topicId: string }>(); 

  // Determine where to go back to (the specific topic details page)
  const backPath = topicId ? `/topics/${topicId}` : '/topics';
  
  // Mock data based on the screenshot
  const moduleCode = topicId || 'SEN381';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements (consistent) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        
        {/* "Back to Topic" Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate(backPath)} 
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Topic</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">{moduleCode} - Software Engineering</h1>
        
        <LearningMaterialsBanner />

        {/* List of Material Cards (Using TopicCard for styling consistency) */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          {['1.pdf', '2.pdf', '3.pdf', '4.pdf'].map((file, index) => (
            <TopicCard 
              key={index}
              topicName={`${moduleCode}, Slide ${file}`} 
              author="Eva" 
              lastUpdated="1 hours ago" 
              href={`/material/${moduleCode}/${file}`} 
            />
          ))}
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewLearningMaterialsPage;