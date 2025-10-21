// src/pages/StudentDashboard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaComments, FaEnvelope } from 'react-icons/fa';
import DashboardGridIcon from '../components/DashboardGridIcon';
import MicrosoftCopilotWidget from '../components/MicrosoftCopilotWidget';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';


const StudentDashboard: React.FC = () => {
  return (
    <Layout variant="dark">
      <BackButton to="/" label="< Home" />

        {/* Dashboard Grid Icons */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <DashboardGridIcon title="TOPICS" Icon={FaShieldAlt} href="/topics" />
          <DashboardGridIcon title="FORUMS" Icon={FaComments} href="/forums" />
          <div className="col-span-2">
            <DashboardGridIcon title="PRIVATE MESSAGING" Icon={FaEnvelope} href="/messages" />
          </div>
        </div>

        {/* 🌟 WRAPPING THE WIDGET IN A LINK TO MAKE IT CLICKABLE 🌟 */}
        <Link to="/copilot" className="block w-full">
            <MicrosoftCopilotWidget />
        </Link>
    </Layout>
  );
};

export default StudentDashboard;
