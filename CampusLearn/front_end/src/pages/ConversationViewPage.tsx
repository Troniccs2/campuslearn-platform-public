// src/pages/ConversationViewPage.tsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConversationHeaderBanner from '../components/ConversationHeaderBanner';
import ForumPostCard from '../components/ForumPostCard'; // Reusing for post structure

// Reusing FaArrowLeft from previous components
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);


const ConversationViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId: string }>(); 

  // Mock data based on the conversationId (e.g., if conversationId is 'eva', name is 'Mrs. Eva')
  const conversationPartner = {
      name: 'Mrs. Eva',
      role: 'Tutor',
      // The current user is '577656' based on the screenshot
      currentUserId: '577656 (You)' 
  };
  
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
            onClick={() => navigate('/messages')} // Go back to the message list
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Browse</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">PM/CV</h1>
        
        <ConversationHeaderBanner name={conversationPartner.name} role={conversationPartner.role} />

        {/* --- Messages --- */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          
          {/* Incoming Message (Mrs. Eva) - Note: ForumPostCard logic makes the author name align right. This is fine for now. */}
          <ForumPostCard 
            author={`${conversationPartner.name} (${conversationPartner.role})`} 
            content="Good afternoon, please find the new uploaded files on DBA381 which is under Topics." 
            updatedAt="" 
          />
          
          {/* Incoming Message (Mrs. Eva) */}
          <ForumPostCard 
            author={`${conversationPartner.name} (${conversationPartner.role})`} 
            content="Please note, that the information pertaining to ACID has been redacted due to redundancy!!!" 
            updatedAt="" 
          />
          
          {/* Outgoing Message (You) */}
          <ForumPostCard 
            author={conversationPartner.currentUserId} 
            content="Thank you for the resources ma'am, and the heads up," 
            updatedAt="" 
          />

          {/* Reply Box/Action (Special Card) */}
          <ForumPostCard isReplyBox={true} author="" content="I'll just use my slides from last year!" updatedAt="" />
          
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default ConversationViewPage;