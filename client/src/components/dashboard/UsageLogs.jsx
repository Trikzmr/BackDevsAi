import React, { useState } from 'react';
import { 
  Calendar, 
  Filter, 
  Download, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const UsageLogs = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const logs = [
    {
      id: 1,
      timestamp: '2024-01-20 14:32:15',
      endpoint: '/api/users/create',
      method: 'POST',
      status: 200,
      responseTime: 145,
      apiKey: 'Production',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      timestamp: '2024-01-20 14:31:22',
      endpoint: '/api/auth/login',
      method: 'POST',
      status: 401,
      responseTime: 89,
      apiKey: 'Development',
      ip: '192.168.1.101'
    },
    {
      id: 3,
      timestamp: '2024-01-20 14:30:45',
      endpoint: '/api/posts/list',
      method: 'GET',
      status: 200,
      responseTime: 234,
      apiKey: 'Production',
      ip: '192.168.1.102'
    },
    {
      id: 4,
      timestamp: '2024-01-20 14:29:33',
      endpoint: '/api/users/profile',
      method: 'GET',
      status: 500,
      responseTime: 1200,
      apiKey: 'Staging',
      ip: '192.168.1.103'
    },
    {
      id: 5,
      timestamp: '2024-01-20 14:28:18',
      endpoint: '/api/auth/refresh',
      method: 'POST',
      status: 200,
      responseTime: 67,
      apiKey: 'Production',
      ip: '192.168.1.104'
    }
  ];

  const getStatusIcon = (status) => {
    if (status >= 200 && status < 300) {
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    } else if (status >= 400 && status < 500) {
      return <AlertCircle className="w-4 h-4 text-yellow-400" />;
    } else if (status >= 500) {
      return <XCircle className="w-4 h-4 text-red-400" />;
    }
    return <Clock className="w-4 h-4 text-[#9ca3af]" />;
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    if (status >= 500) return 'text-red-400';
    return 'text-[#9ca3af]';
  };

  const stats = [
    { label: 'Total Requests', value: '12,847', change: '+12%' },
    { label: 'Success Rate', value: '99.2%', change: '+0.1%' },
    { label: 'Avg Response Time', value: '156ms', change: '-5ms' },
    { label: 'Error Rate', value: '0.8%', change: '-0.1%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Usage Logs</h2>
          <p className="text-[#9ca3af]">Monitor API requests and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9ca3af]">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-400">{stat.change}</p>
                <TrendingUp className="w-4 h-4 text-green-400 ml-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#9ca3af]" />
            <span className="text-sm text-[#9ca3af]">Filter by:</span>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="200">Success (2xx)</option>
            <option value="400">Client Error (4xx)</option>
            <option value="500">Server Error (5xx)</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[rgba(255,255,255,0.05)] border-b border-[#1f2937]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Timestamp</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Endpoint</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Method</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Response Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">API Key</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-[#9ca3af]" />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <code className="bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded text-xs">
                      {log.endpoint}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      log.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                      log.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                      log.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center">
                      {getStatusIcon(log.status)}
                      <span className={`ml-2 ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={log.responseTime > 1000 ? 'text-red-400' : 'text-[#e5e5e5]'}>
                      {log.responseTime}ms
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-[#9ca3af]">{log.apiKey}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-[#9ca3af]">{log.ip}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsageLogs;