// src/pages/TopicDetailsPage.tsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopicContentCard from '../components/TopicContentCard';
import ResponseCard from '../components/ResponseCard';
import ActionBanner from '../components/ActionBanner';

// Placeholder Icons
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);
const AddResponseIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>);
const LearningMaterialIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v10z"/></svg>);


const TopicDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>(); // Assuming the route uses /topics/:topicId

  // Mock data for display
  const topicData = {
    subject: topicId || 'SEN381',
    fullTitle: topicId === 'SEN381' ? 'Software Engineering' : 'Topic Detail',
    creator: 'Tutor',
    date: 'October 5, 2025',
    content: 'Best Practices for Code Review in Agile Sprints. We want us to establish a strong foundation for high-quality code. Should we focus on timeboxing, or use metrics like cyclomatic complexity? We need your input.',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-4 relative z-10">
        
        {/* Back to Browse Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate('/topics')} // Navigate back to the topic list
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Browse</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
          {topicData.subject} - {topicData.fullTitle}
        </h1>
        
        {/* Topic Details Card */}
        <TopicContentCard 
          title={`${topicData.subject} - ${topicData.fullTitle}`}
          creator={topicData.creator}
          date={topicData.date}
          content={topicData.content}
        />

        {/* Responses Section */}
        <div className="mb-8">
            <ResponseCard 
                isFirst={true} // Triggers the "RESPONSES" banner
                name="Sipho N." 
                studentId="2023051" 
                date="6 October 2025" 
                content="Professor, I think the most important rule is Timeboxing. We have to agree that a review shouldn’t take more than 30 minutes, no matter the size of the pull request. If it’s too big, it usually means the developer needs to break it down. Trying to review a PR with choppy commits is a struggle. It also... [truncated for brevity]"
            />
            <ResponseCard 
                name="Lindiwe P." 
                studentId="2023089" 
                date="6 October 2025" 
                content="I agree with Sipho, but add that the focus needs to be on aesthetics and security, not just syntax. My top three would be: 1. Check coding style. 2. Verify input values. 3. Code complexity."
            />
            {/* ... other responses here ... */}
        </div>

        {/* Action Banners */}
        <ActionBanner
            title="ADD RESPONSE"
            href={`/topics/${topicId}/add-response`}
            Icon={AddResponseIcon}
            gradient="from-[#FF00FF] to-[#8A2BE2]" // Pink to Purple
        />
        <ActionBanner
            title="VIEW LEARNING MATERIAL"
            href={`/topics/${topicId}/materials`}
            Icon={LearningMaterialIcon}
            gradient="from-[#8A2BE2] to-[#4B0082]" // Purple to Darker Purple
        />
        
      </main>
      
      <Footer />
    </div>
  );
};

export default TopicDetailsPage;