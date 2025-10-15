// src/pages/PrivateMessagingPage.tsx

import React from 'react';
import { FaEdit } from 'react-icons/fa';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import TopicCard from '../components/TopicCard';
import InboxBanner from '../components/InboxBanner';
import ActionBanner from '../components/ActionBanner';


const PrivateMessagingPage: React.FC = () => {
  return (
    <Layout variant="dark">
      <BackButton label="< Dashboard" />

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">Browse Messages</h1>
        
        <InboxBanner />

        {/* List of Conversation Cards (Using TopicCard for styling) */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          {/* Note: In a real app, the topicName would be the sender's name/ID, and the author/update would be the last message snippet/time */}
          <TopicCard 
            topicName="Eva" 
            author="Please check your marks on Moodle!" 
            lastUpdated="" // Leaving lastUpdated empty to show only the message snippet
            href="/messages/eva" 
          />
          <TopicCard 
            topicName="577656" 
            author="Hey bro, could you please help me with MAT281" 
            lastUpdated=""
            href="/messages/577656" 
          />
          <TopicCard 
            topicName="644532" 
            author="Good luck for writing tomorrow, you've got the notes!" 
            lastUpdated=""
            href="/messages/644532" 
          />
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