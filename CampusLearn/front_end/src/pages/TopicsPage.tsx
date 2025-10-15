// src/pages/TopicsPage.tsx

import React from 'react';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import TopicCard from '../components/TopicCard';
import CreateNewTopicBanner from '../components/CreateNewTopicBanner';

const TopicsPage: React.FC = () => {
  return (
    <Layout variant="dark">
      <BackButton label="< Dashboard" />

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">Browse Topics</h1>
        
        <CreateNewTopicBanner href="/topics/create" />

        {/* List of Topic Cards */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          <TopicCard 
            topicName="SEN381" 
            author="Eva" 
            lastUpdated="1 hours ago" 
            href="/topics/SEN381" 
          />
          <TopicCard 
            topicName="LPR381" 
            author="Simba" 
            lastUpdated="6 hours ago" 
            href="/topics/LPR381" 
          />
          <TopicCard 
            topicName="DBD271" 
            author="Hanno" 
            lastUpdated="3 hours ago" 
            href="/topics/DBD271" 
          />
          <TopicCard 
            topicName="WPR381" 
            author="Reece" 
            lastUpdated="2 hours ago" 
            href="/topics/WPR381" 
          />
        </div>
    </Layout>
  );
};

export default TopicsPage;