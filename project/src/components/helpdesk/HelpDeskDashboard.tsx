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
      name: 'פניות פתוחות',
      value: '12',
      change: '+3',
      changeType: 'neutral',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      name: 'קבצים נעולים',
      value: '8',
      change: '-2',
      changeType: 'positive',
      icon: Lock,
      color: 'yellow'
    },
    {
      name: 'גישה חירום',
      value: '3',
      change: '+1',
      changeType: 'neutral',
      icon: Zap,
      color: 'orange'
    },
    {
      name: 'נפתרו היום',
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
      type: 'קובץ נעול',
      title: 'קובץ תקציב נעול כבר יומיים',
      user: 'שרה וילסון',
      file: '/finance/budget-2024.xlsx',
      priority: 'דחוף',
      time: 'לפני שעתיים'
    },
    {
      id: 2,
      type: 'גישה נדחתה',
      title: 'לא ניתן לגשת לקבצי פרויקט',
      user: 'מיכאל יוחנן',
      file: '/projects/alpha/',
      priority: 'גבוה',
      time: 'לפני 45 דקות'
    },
    {
      id: 3,
      type: 'קובץ חסר',
      title: 'קובץ חוזה לא נמצא',
      user: 'ליסה חן',
      file: '/contracts/2024-001.pdf',
      priority: 'גבוה',
      time: 'לפני שעה'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'קובץ שוחרר',
      file: 'quarterly-report.xlsx',
      user: 'דוד טק',
      time: 'לפני 5 דקות',
      status: 'success'
    },
    {
      id: 2,
      action: 'ניתנה גישת חירום',
      file: 'client-presentation.pptx',
      user: 'שרה תמיכה',
      time: 'לפני 15 דקות',
      status: 'warning'
    },
    {
      id: 3,
      action: 'קובץ שוחזר',
      file: 'backup-data.xlsx',
      user: 'מיכאל עוזר',
      time: 'לפני 30 דקות',
      status: 'success'
    }
  ];

  const quickActions = [
    { name: 'חיפוש קבצים', icon: Search, color: 'blue', action: 'investigation' },
    { name: 'שחרור קבצים', icon: Lock, color: 'yellow', action: 'locks' },
    { name: 'גישת חירום', icon: Zap, color: 'red', action: 'emergency' },
    { name: 'שחזור קבצים', icon: FileText, color: 'purple', action: 'recovery' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'דחוף': return 'text-red-600 bg-red-100';
      case 'גבוה': return 'text-orange-600 bg-orange-100';
      case 'בינוני': return 'text-yellow-600 bg-yellow-100';
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
    <div className="space-y-6" dir="rtl">
      {/* Quick Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">מרכז בקרת תמיכה</h2>
            <p className="text-sm text-gray-500 mt-1">פתרון בעיות גישה לקבצים ותמיכה במשתמשים</p>
          </div>
          
          <div className="flex-1 max-w-md lg:mr-8">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="חיפוש לפי שם עובד או שם קובץ..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg text-right"
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
                <div className="flex-shrink-0">
                  <Icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end">
                <span className="text-sm text-gray-500 mr-1">מאתמול</span>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' :
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
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
              <AlertTriangle className="h-5 w-5 ml-2 text-red-600" />
              בעיות דחופות
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {urgentIssues.map((issue) => (
                <div key={issue.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                    <h4 className="text-sm font-medium text-gray-900 text-right">{issue.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 text-right">{issue.file}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{issue.time}</span>
                    <span>דווח על ידי {issue.user}</span>
                  </div>
                  <div className="mt-3 flex rtl-space-x-2">
                    <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                      הקצה
                    </button>
                    <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors">
                      חקור
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
              <Activity className="h-5 w-5 ml-2 text-green-600" />
              פעילות אחרונה
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start rtl-space-x-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status === 'success' ? 'הצליח' : activity.status === 'warning' ? 'אזהרה' : 'שגיאה'}
                  </span>
                  <div className="flex-1 min-w-0 text-right">
                    <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.file}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time} • על ידי {activity.user}
                    </p>
                  </div>
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`} />
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
            <Shield className="h-5 w-5 ml-2 text-green-600" />
            סטטוס מערכת
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98.7%</div>
              <div className="text-sm text-gray-500">זמינות מערכת</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1.2s</div>
              <div className="text-sm text-gray-500">זמן תגובה ממוצע</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-500">משתמשים פעילים</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDeskDashboard;