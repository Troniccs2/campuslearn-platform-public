// src/pages/TutorDashboard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaComments, FaEnvelope, FaCog } from 'react-icons/fa';
import DashboardGridIcon from '../components/DashboardGridIcon';
import MicrosoftCopilotWidget from '../components/MicrosoftCopilotWidget';
import AdminPanelWidget from '../components/AdminPanelWidget';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';


const TutorDashboard: React.FC = () => {
  return (
    <Layout variant="dark">
      <BackButton to="/" label="< Home" />

        {/* Dashboard Grid Icons */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <DashboardGridIcon title="TOPICS" Icon={FaShieldAlt} href="/topics" />
          <DashboardGridIcon title="FORUMS" Icon={FaComments} href="/forums" />
          <DashboardGridIcon title="PRIVATE MESSAGING" Icon={FaEnvelope} href="/messages" />
          <DashboardGridIcon title="PROFILE / SETTINGS" Icon={FaCog} href="/profile" />
        </div>

        {/* 🌟 AI BUTTON / COPILOT LINK ADDED HERE 🌟 */}
        {/* The entire widget is now clickable and acts as the AI button */}
        <Link to="/copilot" className="block w-full">
            <MicrosoftCopilotWidget />
        </Link>
        
        <AdminPanelWidget />
    </Layout>
  );
};

export default TutorDashboard;
