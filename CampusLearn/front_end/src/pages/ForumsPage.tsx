// src/pages/ForumsPage.tsx

import React from 'react';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import TopicCard from '../components/TopicCard';
import ForumCategoriesBanner from '../components/ForumCategoriesBanner';


const ForumsPage: React.FC = () => {
  return (
    <Layout variant="dark">
      <BackButton label="< Dashboard" />

        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">Forum</h1>
        
        <ForumCategoriesBanner />

        {/* List of Forum Category Cards (Using TopicCard for styling consistency) */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
          {/* Note: In a real app, these would link to a ForumDetail Page */}
          <TopicCard 
            topicName="Workshops" 
            author="Eva" 
            lastUpdated="1 hours ago" 
            href="/forums/workshops" 
          />
          <TopicCard 
            topicName="Announcements" 
            author="Simba" 
            lastUpdated="6 hours ago" 
            href="/forums/announcements" 
          />
          <TopicCard 
            topicName="Extra Lessons" 
            author="Hanno" 
            lastUpdated="3 hours ago" 
            href="/forums/lessons" 
          />
          <TopicCard 
            topicName="School Uniform" 
            author="Reece" 
            lastUpdated="2 hours ago" 
            href="/forums/uniform" 
          />
        </div>
    </Layout>
  );
};

export default ForumsPage;