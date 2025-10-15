// src/pages/SearchComposePage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserSearchCard from '../components/UserSearchCard';

// Reusing FaArrowLeft from previous components
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);


const SearchComposePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const mockUsers = [
    { id: 'eva', name: 'Mrs. Eva', role: 'Tutor' },
    { id: 'raymond', name: 'Mr. Raymond', role: 'Tutor' },
    { id: '655243', name: '655243', role: 'Student' },
  ];
  
  const handleUserClick = (userId: string) => {
      // Logic to start a conversation, usually navigating to the conversation view
      navigate(`/messages/${userId}`);
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

        <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">Student/Tutor - Name</h1>
        
        {/* Search Input */}
        <input
            type="text"
            placeholder="Name or Student Number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors mb-8"
        />

        {/* Search Results / Default Prompt */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
            <h2 className="text-white text-center text-xl font-semibold mb-6">Click on a person to start a new conversation</h2>
            
            <div className="flex justify-center gap-8 flex-wrap">
                {mockUsers.map((user) => (
                    <UserSearchCard 
                        key={user.id}
                        name={user.name}
                        role={user.role}
                        onClick={() => handleUserClick(user.id)}
                    />
                ))}
            </div>
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchComposePage;