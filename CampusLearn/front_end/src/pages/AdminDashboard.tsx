// src/pages/AdminDashboard.tsx

import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import DashboardGridIcon from '../components/DashboardGridIcon';
import AdminPanelWidget from '../components/AdminPanelWidget';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';


const AdminDashboard: React.FC = () => {
  return (
    <Layout variant="dark">
      <BackButton to="/" label="< Home" />

        {/* Dashboard Grid Icons */}
        {/* Note: This grid only has 2 items based on the Admin prototype */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="col-span-2">
            <DashboardGridIcon title="PRIVATE MESSAGING" Icon={FaEnvelope} href="/messages" />
          </div>
        </div>

        {/* Widgets */}
        {/* Admin only has the Admin Panel Widget */}
        <AdminPanelWidget />
    </Layout>
  );
};

export default AdminDashboard;
