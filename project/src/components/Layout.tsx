import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Lock, 
  FileText, 
  Users, 
  Settings, 
  Bell,
  Menu,
  X,
  ChevronDown,
  BarChart3,
  AlertTriangle,
  Clock,
  RotateCcw,
  Ticket,
  LogOut,
  FolderOpen
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  currentZone: 'admin' | 'helpdesk';
  onZoneChange: (zone: 'admin' | 'helpdesk') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange, currentZone, onZoneChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const adminNavigation = [
    { id: 'dashboard', name: 'לוח בקרה', icon: Shield },
    { id: 'file-management', name: 'ניהול קבצים', icon: FolderOpen },
    { id: 'users', name: 'ניהול משתמשים', icon: Users },
    { id: 'settings', name: 'הגדרות מערכת', icon: Settings },
    { id: 'analytics', name: 'דוחות וניתוחים', icon: BarChart3 },
  ];

  const helpdeskNavigation = [
    { id: 'dashboard', name: 'לוח בקרה', icon: Shield },
    { id: 'management', name: 'ניהול קבצים', icon: FileText },
    { id: 'recovery', name: 'שחזור קבצים', icon: RotateCcw },
    { id: 'tickets', name: 'פניות תמיכה', icon: Ticket },
  ];

  const navigation = currentZone === 'admin' ? adminNavigation : helpdeskNavigation;
  const zoneColor = currentZone === 'admin' ? 'blue' : 'green';

  const getPageTitle = () => {
    const page = navigation.find(nav => nav.id === currentPage);
    return page ? page.name : 'לוח בקרה';
  };

  const getZoneText = () => {
    return currentZone === 'admin' ? 'אזור ניהול' : 'אזור תמיכה';
  };

  const handleZoneChange = (zone: 'admin' | 'helpdesk') => {
    onZoneChange(zone);
    onPageChange('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center rtl-space-x-2">
            <div className="text-right">
              <span className="text-xl font-bold text-gray-900">FileGuard</span>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                ארגוני
              </div>
            </div>
            <Shield className="h-8 w-8 text-gray-700" />
          </div>
        </div>

        {/* Zone Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => handleZoneChange('helpdesk')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              currentZone === 'helpdesk'
                ? 'bg-green-50 text-green-700 border-b-2 border-green-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            אזור תמיכה
          </button>
          <button
            onClick={() => handleZoneChange('admin')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              currentZone === 'admin'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            אזור ניהול
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center rtl-space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? `bg-${zoneColor}-50 text-${zoneColor}-700 border-l-2 border-${zoneColor}-700`
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="truncate">{item.name}</span>
                <Icon className="h-5 w-5 flex-shrink-0" />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Left side - User info */}
            <div className="flex items-center rtl-space-x-4">
              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center rtl-space-x-2 p-2 rounded-md text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <ChevronDown className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:block">יוחנן דוד</span>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    currentZone === 'admin' ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    <span className="text-white text-sm font-medium">יד</span>
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 dropdown-rtl">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-right-rtl">פרופיל</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-right-rtl">הגדרות</a>
                    <div className="border-t border-gray-100"></div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-right-rtl">התנתקות</a>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 left-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* Right side - Page title and zone */}
            <div className="flex items-center rtl-space-x-4">
              <div className="text-right">
                <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
                <div className="flex items-center rtl-space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    currentZone === 'admin' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {getZoneText()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;