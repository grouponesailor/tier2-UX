import React from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Users',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Active Permissions',
      value: '8,456',
      change: '+5%',
      changeType: 'positive',
      icon: Shield,
    },
    {
      name: 'System Health',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive',
      icon: CheckCircle,
    },
    {
      name: 'Security Alerts',
      value: '3',
      change: '-2',
      changeType: 'positive',
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-600 mt-1">System overview and administrative controls</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              ADMIN ZONE
            </span>
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
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium">Manage Users</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all">
            <Shield className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium">Security Policies</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all">
            <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium">View Reports</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all">
            <Settings className="h-8 w-8 text-gray-600 mb-2" />
            <span className="text-sm font-medium">System Settings</span>
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Recent System Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New user account created</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Security policy updated</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">System backup completed</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Security Alerts
          </h3>
          <div className="space-y-4">
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-red-800">Unusual Login Activity</h4>
                <span className="text-xs text-red-600">High</span>
              </div>
              <p className="text-sm text-red-700 mt-1">Multiple failed login attempts detected</p>
            </div>
            <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-yellow-800">Permission Escalation</h4>
                <span className="text-xs text-yellow-600">Medium</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">User requested elevated permissions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;