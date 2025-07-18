import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './dashboard/Sidebar';
import Topbar from './dashboard/Topbar';
import DashboardHome from './dashboard/DashboardHome';
import ApiKeys from './dashboard/ApiKeys';
import PromptPlayground from './dashboard/PromptPlayground';
import UsageLogs from './dashboard/UsageLogs';
import ApiDocs from './dashboard/ApiDocs';
import Settings from './dashboard/Settings';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col">
        <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 lg:p-6">
          <Routes>
            <Route path="/home" element={<DashboardHome />} />
            <Route path="/api-keys" element={<ApiKeys />} />
            <Route path="/playground" element={<PromptPlayground />} />
            <Route path="/logs" element={<UsageLogs />} />
            <Route path="/docs" element={<ApiDocs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;