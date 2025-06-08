import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Download,
  Calendar,
  Filter,
  Activity
} from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('overview');

  const stats = [
    {
      name: 'Total File Operations',
      value: '24,567',
      change: '+12.5%',
      changeType: 'positive',
      icon: FileText,
    },
    {
      name: 'User Activity',
      value: '1,247',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Security Events',
      value: '89',
      change: '-15.3%',
      changeType: 'positive',
      icon: Activity,
    },
    {
      name: 'System Uptime',
      value: '99.8%',
      change: '+0.1%',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ];

  const topFiles = [
    { name: 'budget-2024.xlsx', accesses: 156, department: 'Finance' },
    { name: 'employee-handbook.pdf', accesses: 134, department: 'HR' },
    { name: 'project-alpha-specs.docx', accesses: 98, department: 'Engineering' },
    { name: 'marketing-plan-q1.pptx', accesses: 87, department: 'Marketing' },
    { name: 'security-policy.pdf', accesses: 76, department: 'IT' }
  ];

  const departmentActivity = [
    { department: 'Finance', users: 45, files: 234, activity: 1567 },
    { department: 'Engineering', users: 78, files: 456, activity: 2341 },
    { department: 'Marketing', users: 32, files: 123, activity: 987 },
    { department: 'HR', users: 23, files: 89, activity: 654 },
    { department: 'Legal', users: 12, files: 67, activity: 432 }
  ];

  const exportReport = () => {
    console.log('Exporting report:', reportType, 'for', dateRange, 'days');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Analytics & Reports</h2>
            <p className="text-sm text-gray-500 mt-1">System usage analytics and detailed reports</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="overview">Overview</option>
              <option value="security">Security</option>
              <option value="usage">Usage</option>
              <option value="performance">Performance</option>
            </select>
            
            <button
              onClick={exportReport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
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
                <span className="text-sm text-gray-500 ml-1">from last period</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Accessed Files */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Most Accessed Files
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    <div className="text-xs text-gray-500">{file.department}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{file.accesses}</div>
                    <div className="text-xs text-gray-500">accesses</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Department Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {departmentActivity.map((dept, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{dept.department}</h4>
                    <span className="text-sm text-gray-500">{dept.activity} activities</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">{dept.users}</span> users
                    </div>
                    <div>
                      <span className="font-medium">{dept.files}</span> files
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
            Activity Trends
          </h3>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Activity chart would be displayed here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;