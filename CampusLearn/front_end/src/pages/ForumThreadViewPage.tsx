// src/pages/ForumThreadViewPage.tsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThreadHeaderBanner from '../components/ThreadHeaderBanner';
import ForumPostCard from '../components/ForumPostCard';

// Reusing FaArrowLeft from previous components
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);


const ForumThreadViewPage: React.FC = () => {
  const navigate = useNavigate();
  // We'll use both categoryId and threadId for full context
  const { categoryId, threadId } = useParams<{ categoryId: string; threadId: string }>(); 

  // Mock data
  const threadTitle = threadId ? threadId.split('-')[0].toUpperCase() : 'SEN381';
  const threadType = threadId ? threadId.split('-').pop()?.toUpperCase() || 'THREAD' : 'WORKSHOP';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements (consistent) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-4 relative z-10">
        
        {/* "Back to Browse" Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate(`/forums/${categoryId}`)} // Go back to the thread list for the category
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Browse</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">View</h1>
        
        <ThreadHeaderBanner title={`${threadTitle} - ${threadType}`} />

        {/* --- Discussion Posts --- */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          
          {/* Main Thread Post (Raymond Hood - Aligned Right) */}
          <ForumPostCard 
            author="Raymond Hood" 
            content="Good day everyone, please note ma'am is hosting a workshop tomorrow at 1:30pm" 
            updatedAt="1 hours ago" 
          />
          
          {/* First Reply (Hanno van Vuuren - Aligned Left in original screenshot, so reverse the component logic) */}
          {/* NOTE: To align the author/content left (like a response card), you'd need a separate component or conditional styling. */}
          {/* For simplicity and consistency with the provided card logic, we keep the right alignment for now. */}
          {/* We will simulate the back-and-forth by styling the component to show the author on the left side of the text block for replies. */}
          <ForumPostCard 
            author="Hanno van Vuuren" 
            content="Where is ma'am hosting the workshop?" 
            updatedAt="1 hours ago" 
          />

          {/* Second Reply (Rodney Ncube) */}
          <ForumPostCard 
            author="Rodney Ncube" 
            content="Most likely at Chi where class is!" 
            updatedAt="1 hours ago" 
          />

          {/* Reply Box/Action (Special Card) */}
          <ForumPostCard isReplyBox={true} author="" content="" updatedAt="" />
          
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default ForumThreadViewPage;