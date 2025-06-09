import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Search,
  FileText,
  TrendingUp
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateToFileManagement?: (searchTerm: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateToFileManagement }) => {
  const [quickSearch, setQuickSearch] = useState('');

  const stats = [
    {
      name: 'סך המשתמשים',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'הרשאות פעילות',
      value: '8,456',
      change: '+5%',
      changeType: 'positive',
      icon: Shield,
    },
    {
      name: 'תקינות המערכת',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive',
      icon: CheckCircle,
    },
    {
      name: 'התראות אבטחה',
      value: '3',
      change: '-2',
      changeType: 'positive',
      icon: AlertTriangle,
    },
  ];

  const quickActions = [
    { name: 'ניהול משתמשים', icon: Users },
    { name: 'מדיניות אבטחה', icon: Shield },
    { name: 'צפייה בדוחות', icon: BarChart3 },
    { name: 'הגדרות מערכת', icon: Settings }
  ];

  const recentActivities = [
    {
      message: 'נוצר חשבון משתמש חדש',
      time: 'לפני 2 דקות',
      type: 'success'
    },
    {
      message: 'עודכנה מדיניות אבטחה',
      time: 'לפני 15 דקות',
      type: 'info'
    },
    {
      message: 'הושלם גיבוי מערכת',
      time: 'לפני שעה',
      type: 'success'
    }
  ];

  const securityAlerts = [
    {
      title: 'פעילות כניסה חשודה',
      description: 'זוהו מספר ניסיונות כניסה כושלים',
      severity: 'high'
    },
    {
      title: 'הרמת הרשאות',
      description: 'משתמש ביקש הרשאות מורחבות',
      severity: 'medium'
    }
  ];

  const handleSearch = () => {
    if (quickSearch.trim() && onNavigateToFileManagement) {
      onNavigateToFileManagement(quickSearch.trim());
    }
  };

  // דוגמאות חיפוש מהירות
  const searchExamples = [
    'תקציב', 'חוזה', 'דוח', 'מצגת', 'נתונים'
  ];

  const handleExampleSearch = (example: string) => {
    setQuickSearch(example);
    if (onNavigateToFileManagement) {
      onNavigateToFileManagement(example);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Quick Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">מרכז בקרת ניהול</h2>
            <p className="text-sm text-gray-500 mt-1">ניהול מערכת ובקרה על משאבים</p>
          </div>
          
          <div className="flex-1 max-w-md lg:mr-8">
            <div className="flex rtl-space-x-4">
              <button
                onClick={handleSearch}
                disabled={!quickSearch.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                חיפוש
              </button>
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="חיפוש קבצים, משתמשים או משאבים..."
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-right"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            
            {/* דוגמאות חיפוש */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">נסה לחפש:</span>
              {searchExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleSearch(example)}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                >
                  {example}
                </button>
              ))}
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
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end">
                <span className="text-sm text-gray-500 mr-1">מהחודש שעבר</span>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">פעולות מהירות</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.name} className="flex flex-col items-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
                <Icon className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium">{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 ml-2 text-blue-600" />
            פעילות אחרונה במערכת
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center rtl-space-x-3">
                <div className="flex-1 text-right">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : 
                  activity.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 ml-2 text-red-600" />
            התראות אבטחה
          </h3>
          <div className="space-y-4">
            {securityAlerts.map((alert, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                alert.severity === 'high' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${
                    alert.severity === 'high' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {alert.severity === 'high' ? 'גבוה' : 'בינוני'}
                  </span>
                  <h4 className={`text-sm font-medium ${
                    alert.severity === 'high' ? 'text-red-800' : 'text-yellow-800'
                  }`}>
                    {alert.title}
                  </h4>
                </div>
                <p className={`text-sm mt-1 ${
                  alert.severity === 'high' ? 'text-red-700' : 'text-yellow-700'
                }`}>
                  {alert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;