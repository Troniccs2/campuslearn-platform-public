// src/pages/ConversationViewPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConversationHeaderBanner from '../components/ConversationHeaderBanner';
import ForumPostCard from '../components/ForumPostCard';
import ForumPostDisplayCard from '../components/ForumPostDisplayCard';
import api from '../services/api';

// Reusing FaArrowLeft from previous components
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);


const ConversationViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId: string }>(); 

  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!conversationId) return;
      try {
        const r = await api.get(`/messages/${conversationId}/messages`);
        setMessages(r.data || []);
        // Get conversation details (participants) via conversations/me list
        const convs = await api.get('/messages/conversations/me');
  const conv = (convs.data || []).find((c: any) => String(c.id) === String(conversationId));
        setConversation(conv || null);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [conversationId]);

  const handlePost = async (content: string) => {
    if (!conversationId) return;
    try {
      await api.post('/messages/send', { conversationId: Number(conversationId), content });
      const r = await api.get(`/messages/${conversationId}/messages`);
      setMessages(r.data || []);
    } catch (e) {
      console.error('send failed', e);
      const status = (e as any)?.response?.status;
      if (status === 401) {
        // not authenticated
        alert('You must be signed in to send messages. Redirecting to login...');
        navigate('/auth/login');
        return;
      }
      if (status === 403) {
        alert('You are not a participant in this conversation. Returning to inbox.');
        navigate('/messages');
        return;
      }
      alert('Failed to send message. See console for details.');
    }
  };

  const conversationPartner = (conversation?.participants && (conversation.participants as any)[0]) ?? { name: 'Unknown', role: '' };

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
        
        <ConversationHeaderBanner name={conversationPartner.firstName ? `${conversationPartner.firstName} ${conversationPartner.lastName ?? ''}` : conversationPartner.name} role={conversationPartner.role} />

        {/* --- Messages --- */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          {messages.map((m) => (
            <ForumPostDisplayCard
              key={m.id}
              post={{
                id: m.id,
                authorName: m.sender?.firstName
                  ? `${m.sender.firstName} ${m.sender.lastName ?? ''}`.trim()
                  : m.sender?.email ?? 'Unknown sender',
                content: m.content,
                postedDate: m.sentAt,
              }}
            />
          ))}

          <ForumPostCard onSubmit={handlePost} />
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default ConversationViewPage;