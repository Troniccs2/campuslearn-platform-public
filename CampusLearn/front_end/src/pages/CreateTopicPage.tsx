// src/pages/CreateTopicPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormInputCard from '../components/FormInputCard';
import DragDropBanner from '../components/DragDropBanner';
import ActionBanner from '../components/ActionBanner'; // Reusing the ActionBanner component

// Placeholder Icons
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);
const PostIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19v-7h7"/><path d="M12 12l6.5-6.5L12 12zM5 19l7-7-7-7"/></svg>
);


const CreateTopicPage: React.FC = () => {
  const navigate = useNavigate();
  // State for form fields (to be implemented)
  const [moduleCode, setModuleCode] = React.useState('');
  const [topicTitle, setTopicTitle] = React.useState('');
  const [topicInfo, setTopicInfo] = React.useState('');

  const handlePostTopic = (event: React.FormEvent) => {
      event.preventDefault();
      // 1. Validate inputs
      // 2. Prepare data object
      // 3. Make API call to post the new topic
      console.log('Posting new topic:', { moduleCode, topicTitle, topicInfo });
      // navigate('/topics'); // Redirect to topic list on success
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements (consistent) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        
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

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">Create Topic</h1>
        
        <form onSubmit={handlePostTopic}>
            <FormInputCard title="TOPIC DETAILS">
                {/* Input Fields */}
                <input
                    type="text"
                    placeholder="Enter Module Code:"
                    value={moduleCode}
                    onChange={(e) => setModuleCode(e.target.value)}
                    className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Topic Title:"
                    value={topicTitle}
                    onChange={(e) => setTopicTitle(e.target.value)}
                    className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                    required
                />
                <textarea
                    placeholder="Enter Topic Information:"
                    value={topicInfo}
                    onChange={(e) => setTopicInfo(e.target.value)}
                    rows={5}
                    className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-none"
                    required
                />
            </FormInputCard>

            <DragDropBanner />

            <ActionBanner
                title="POST NEW TOPIC"
                href="#" // Use type="submit" on the button inside ActionBanner for form submission
                Icon={PostIcon}
                gradient="from-[#8A2BE2] to-[#FF00FF]" // Purple to Pink
                // Note: In a real implementation, ActionBanner should be a button when inside a form
            />
            
            {/* Since ActionBanner is an <a> tag, we simulate the submit with a hidden button or by handling the ActionBanner click */}
            <button type="submit" className="hidden" aria-hidden="true"></button>
        </form>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateTopicPage;