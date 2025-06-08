import React from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Users, 
  TrendingUp,
  Activity,
  Lock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Active Permissions',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Shield,
    },
    {
      name: 'Pending Approvals',
      value: '23',
      change: '+3',
      changeType: 'neutral',
      icon: Clock,
    },
    {
      name: 'Active File Locks',
      value: '156',
      change: '-8%',
      changeType: 'positive',
      icon: Lock,
    },
    {
      name: 'Security Alerts',
      value: '7',
      change: '+2',
      changeType: 'negative',
      icon: AlertTriangle,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'permission',
      message: 'Read access granted to Finance Team for budget-2024.xlsx',
      user: 'John Doe',
      time: '2 minutes ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'lock',
      message: 'File lock released for contract-2024-001.pdf',
      user: 'Sarah Wilson',
      time: '15 minutes ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'security',
      message: 'Failed access attempt detected for /secure/payroll/',
      user: 'System',
      time: '1 hour ago',
      severity: 'high'
    },
    {
      id: 4,
      type: 'approval',
      message: 'Permission change request approved for employee-data.xlsx',
      user: 'Mike Johnson',
      time: '2 hours ago',
      severity: 'medium'
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'Permission Change',
      resource: '/shared/hr/employee-data.xlsx',
      requestedBy: 'Mike Johnson',
      priority: 'medium',
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      type: 'File Restore',
      resource: '/projects/alpha/specifications.docx',
      requestedBy: 'Sarah Wilson',
      priority: 'high',
      createdAt: '4 hours ago'
    },
    {
      id: 3,
      type: 'Lock Release',
      resource: '/shared/finance/quarterly-report.xlsx',
      requestedBy: 'John Doe',
      priority: 'urgent',
      createdAt: '6 hours ago'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="space-y-6">
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
                  stat.changeType === 'positive' ? 'text-green-600' :
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last week</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Recent Activities
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${getSeverityColor(activity.severity)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(activity.severity)}`}>
                    {activity.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Pending Approvals
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{approval.type}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(approval.priority)}`}>
                      {approval.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{approval.resource}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Requested by {approval.requestedBy}</span>
                    <span>{approval.createdAt}</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors">
                      Approve
                    </button>
                    <button className="text-xs bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Health Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            System Activity Trends
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">847</div>
              <div className="text-sm text-gray-500">Permission Requests (24h)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98.7%</div>
              <div className="text-sm text-gray-500">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1.2s</div>
              <div className="text-sm text-gray-500">Avg Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;