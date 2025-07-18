import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Activity, Key, Code, TrendingUp,
  Clock, AlertCircle, CheckCircle
} from 'lucide-react';
import axios from 'axios';

const DashboardHome = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const res = await fetch('https://backdevsai.onrender.com/api/key/getmyapis', {
          method:"GET",
          credentials: "include"
        });
        const data = await res.json();

        setApiKeys(data || []);
        let total = 0; 
        for(let i =0; i<data.length; i++){
          total+=data[i].count;
        }
        setTotalRequests(total);
      } catch (error) {
        console.error('Error fetching API keys:', error);
      }
    };

    fetchKeys();
  }, []);

  const stats = [
    {
      title: 'API Calls',
      value: totalRequests.toLocaleString(),
      change: '+12%',
      icon: Activity,
      color: 'text-[#3b82f6]'
    },
    {
      title: 'Active Keys',
      value: apiKeys.length,
      change: `+${apiKeys.length > 0 ? 1 : 0}`,
      icon: Key,
      color: 'text-green-400'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'info': return <Activity className="w-5 h-5 text-[#3b82f6]" />;
      default: return <Activity className="w-5 h-5 text-[#9ca3af]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-[#9ca3af] mb-4 lg:mb-0">
              Create new api keys and let us do the rest
            </p>
          </div>
          <Link
            to="/dashboard/api-keys"
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#3b82f6]/25 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Generate New API Key
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6 hover:border-[#3b82f6]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-[rgba(255,255,255,0.05)] ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-green-400">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-[#9ca3af] text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {/* <Link to="/dashboard/playground" className="action-card">
              <Code className="w-5 h-5 mr-3 text-[#3b82f6]" />
              <div>
                <p className="font-medium">Try the Playground</p>
                <p className="text-sm text-[#9ca3af]">Test prompts and see responses</p>
              </div>
            </Link> */}
            {/* <Link to="/dashboard/logs" className="action-card">
              <Activity className="w-5 h-5 mr-3 text-purple-400" />
              <div>
                <p className="font-medium">View Usage Logs</p>
                <p className="text-sm text-[#9ca3af]">Monitor API performance</p>
              </div>
            </Link> */}
            <Link to="/dashboard/docs" className="action-card">
              <Key className="w-5 h-5 mr-3 text-green-400" />
              <div>
                <p className="font-medium">API Documentation</p>
                <p className="text-sm text-[#9ca3af]">Learn how to integrate</p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
