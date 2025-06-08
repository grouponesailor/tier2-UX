import React, { useState } from 'react';
import { 
  Search, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Users, 
  TrendingUp,
  Activity,
  Lock,
  CheckCircle,
  XCircle,
  Zap,
  Shield
} from 'lucide-react';

const HelpDeskDashboard: React.FC = () => {
  const [quickSearch, setQuickSearch] = useState('');

  const stats = [
    {
      name: 'Open Tickets',
      value: '12',
      change: '+3',
      changeType: 'neutral',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      name: 'Locked Files',
      value: '8',
      change: '-2',
      changeType: 'positive',
      icon: Lock,
      color: 'yellow'
    },
    {
      name: 'Emergency Access',
      value: '3',
      change: '+1',
      changeType: 'neutral',
      icon: Zap,
      color: 'orange'
    },
    {
      name: 'Resolved Today',
      value: '24',
      change: '+8',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'green'
    },
  ];

  const urgentIssues = [
    {
      id: 1,
      type: 'File Locked',
      title: 'Budget file locked for 2 days',
      user: 'Sarah Wilson',
      file: '/finance/budget-2024.xlsx',
      priority: 'urgent',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'Access Denied',
      title: 'Cannot access project files',
      user: 'Mike Johnson',
      file: '/projects/alpha/',
      priority: 'high',
      time: '45 minutes ago'
    },
    {
      id: 3,
      type: 'File Missing',
      title: 'Contract file not found',
      user: 'Lisa Chen',
      file: '/contracts/2024-001.pdf',
      priority: 'high',
      time: '1 hour ago'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'File unlocked',
      file: 'quarterly-report.xlsx',
      user: 'David Tech',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      action: 'Emergency access granted',
      file: 'client-presentation.pptx',
      user: 'Sarah Support',
      time: '15 minutes ago',
      status: 'warning'
    },
    {
      id: 3,
      action: 'File restored',
      file: 'backup-data.xlsx',
      user: 'Mike Helper',
      time: '30 minutes ago',
      status: 'success'
    }
  ];

  const quickActions = [
    { name: 'Search Files', icon: Search, color: 'blue', action: 'investigation' },
    { name: 'Unlock Files', icon: Lock, color: 'yellow', action: 'locks' },
    { name: 'Emergency Access', icon: Zap, color: 'red', action: 'emergency' },
    { name: 'File Recovery', icon: FileText, color: 'purple', action: 'recovery' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Help Desk Control Center</h2>
            <p className="text-sm text-gray-500 mt-1">Resolve file access issues and support users</p>
          </div>
          
          <div className="flex-1 max-w-md lg:ml-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by employee name or file name..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="flex-shrink-0">
                  <Icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' :
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from yesterday</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.name}
                className={`flex flex-col items-center p-4 rounded-lg border-2 border-${action.color}-200 hover:border-${action.color}-400 hover:bg-${action.color}-50 transition-all duration-200 group`}
              >
                <Icon className={`h-8 w-8 text-${action.color}-600 mb-2 group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium text-gray-900">{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Issues */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Urgent Issues
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {urgentIssues.map((issue) => (
                <div key={issue.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{issue.title}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{issue.file}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Reported by {issue.user}</span>
                    <span>{issue.time}</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors">
                      Investigate
                    </button>
                    <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.file}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-600" />
            System Status
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98.7%</div>
              <div className="text-sm text-gray-500">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1.2s</div>
              <div className="text-sm text-gray-500">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDeskDashboard;