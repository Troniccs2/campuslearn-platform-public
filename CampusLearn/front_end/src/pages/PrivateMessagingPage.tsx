// src/pages/PrivateMessagingPage.tsx

import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
// TopicCard no longer used here; using ConversationPreviewCard instead
import ConversationPreviewCard from '../components/ConversationPreviewCard';
import InboxBanner from '../components/InboxBanner';
import ActionBanner from '../components/ActionBanner';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';


const PrivateMessagingPage: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api.get('/messages/conversations/me');
        setConversations(r.data || []);
      } catch (e) {
        console.error('Failed to load conversations', e);
      }
    };
    load();
  }, []);

  return (
    <Layout variant="dark">
      <BackButton label="< Dashboard" />

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">Browse Messages</h1>
        
        <InboxBanner />

        {/* List of Conversation Cards (Using TopicCard for styling) */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50 space-y-4">
          {conversations.length === 0 && (
            <p className="text-white">No conversations yet. Click compose to start a new one.</p>
          )}

          {conversations.map((c) => {
            const partner = c.participants?.find((p: any) => p.email !== undefined); // best-effort
            const name = partner ? (partner.firstName ? `${partner.firstName} ${partner.lastName ?? ''}` : partner.email) : `Conversation ${c.id}`;
            const lastMsg = c.messages && c.messages.length > 0 ? c.messages[c.messages.length -1].content : '';
            const updatedAt = c.messages && c.messages.length > 0 ? c.messages[c.messages.length -1].sentAt : '';
            return (
              <ConversationPreviewCard
                key={c.id}
                name={name}
                lastMessage={lastMsg}
                updatedAt={updatedAt}
                onClick={() => navigate(`/messages/${c.id}`)}
              />
            )
          })}
        </div>

        {/* Compose New Message Action Banner */}
        <ActionBanner
            title="COMPOSE NEW MESSAGE"
            href="/messages/compose"
            Icon={FaEdit}
            gradient="from-[#FF00FF] to-[#8A2BE2]" // Pink to Purple
        />
    </Layout>
  );
};

export default PrivateMessagingPage;