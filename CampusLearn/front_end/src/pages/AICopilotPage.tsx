// src/pages/AICopilotPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import ForumPostCard from '../components/ForumPostCard';
import CopilotHeaderBanner from '../components/CopilotHeaderBanner';


// ----------------------------------------------------------------------
// 💡 SIMULATED AI RESPONSE LOGIC
// ----------------------------------------------------------------------

// Interface for a message object
interface Message {
  id: number;
  author: 'You' | 'AI Copilot';
  content: string;
  module?: string;
  isUser: boolean;
}

const generateMockResponse = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('uml') && lowerPrompt.includes('microservices')) {
    return "For illustrating data flow between microservices, a Component Diagram is usually the most effective choice. It shows the structure of the system and the interfaces between components. A Sequence Diagram would be better for showing the time-ordered interactions.";
  }
  if (lowerPrompt.includes('define') || lowerPrompt.includes('what is')) {
    return "The term you're asking about is a key concept. It generally refers to the study of systems and structures. If you provide a module code, I can give you a more detailed answer.";
  }
  if (lowerPrompt.includes('agile') || lowerPrompt.includes('scrum')) {
    return "Agile methodologies prioritize iterative development, customer collaboration, and adapting to change. Scrum is a popular framework for implementing Agile, utilizing sprints and daily stand-ups.";
  }
  
  return "That's an interesting question! I don't have a specific answer for that in my current knowledge base. Would you like me to try rephrasing, or would you like to escalate this question to a Tutor?";
};
// ----------------------------------------------------------------------


const AICopilotPage: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([
    { 
        id: 1, 
        author: 'You', 
        content: "In SEN381, I'm trying to figure out which UML diagram is best for showing how data flows between different services in a microservices architecture. Is it a Sequence, Component, or Deployment diagram?",
        module: 'SEN381',
        isUser: true
    },
    { 
        id: 2, 
        author: 'AI Copilot', 
        content: "For illustrating data flow between microservices, a Component Diagram is usually the most effective choice. It shows the structure of the system and the interfaces between components. A Sequence Diagram would be better for showing the time-ordered interactions.",
        isUser: false
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      author: 'You',
      content: input,
      isUser: true
    };

    // Add user message
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    // Generate and add AI response after a slight delay
    const aiResponseContent = generateMockResponse(input);
    setTimeout(() => {
      const newAIMessage: Message = {
        id: Date.now() + 1,
        author: 'AI Copilot',
        content: aiResponseContent,
        isUser: false
      };
      setMessages(prev => [...prev, newAIMessage]);
    }, 500);
  };

  const handleEscalate = () => {
      // In a real app, this would redirect to the Compose Message page
      // pre-filled with the AI chat history and set to send to a tutor.
      alert('Escalating chat to a Tutor! Redirecting to Private Messaging.');
      navigate('/messages/compose'); 
  };
  
  return (
    <Layout variant="dark">
      {/* Back to Dashboard and Escalate buttons */}
      <div className="flex justify-between items-center mb-6">
        <BackButton label="< Dashboard" />
        <button
          onClick={handleEscalate}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors shadow-lg"
        >
          <FaExclamationTriangle className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase">Escalate to Tutor</span>
        </button>
      </div>

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">AI Copilot</h1>
        
        <CopilotHeaderBanner />

        {/* --- Conversation Area --- */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          
          {messages.map(message => (
            // Reusing ForumPostCard. Note: This component needs more flexibility to handle two-way chat
            // but we'll use the existing structure for consistency. User posts (isUser: true) look like replies.
            <div key={message.id} className={message.isUser ? 'text-right' : 'text-left'}>
                <ForumPostCard 
                    author={message.author === 'You' ? '577656 (You)' : 'AI Copilot'}
                    content={message.content}
                    updatedAt=""
                    // The ForumPostCard is primarily designed for forum replies, so it needs manual styling adjustments 
                    // for a clean two-way chat if you were to continue. We use the existing props.
                />
            </div>
          ))}

          {/* Input/Reply Box */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center p-4 mt-4">
              <input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow p-3 rounded-l-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                  required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-r-lg bg-gradient-to-r from-[#FF00FF] to-[#8A2BE2] text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Send
              </button>
            </div>
          </form>

        </div>
    </Layout>
  );
};

export default AICopilotPage;