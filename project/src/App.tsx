import React, { useState } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminSettings from './components/admin/AdminSettings';
import AdminAnalytics from './components/admin/AdminAnalytics';
import AdminFileManagement from './components/admin/AdminFileManagement';
import HelpDeskDashboard from './components/helpdesk/HelpDeskDashboard';
import FileManagement from './components/helpdesk/FileManagement';
import FileRecovery from './components/helpdesk/FileRecovery';
import SupportTickets from './components/helpdesk/SupportTickets';

function App() {
  const [currentZone, setCurrentZone] = useState<'admin' | 'helpdesk'>('admin');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [fileManagementSearchTerm, setFileManagementSearchTerm] = useState('');

  const handleNavigateToFileManagement = (searchTerm: string) => {
    setFileManagementSearchTerm(searchTerm);
    setCurrentPage('file-management');
  };

  const renderCurrentPage = () => {
    if (currentZone === 'admin') {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard onNavigateToFileManagement={handleNavigateToFileManagement} />;
        case 'users':
          return <AdminUsers />;
        case 'settings':
          return <AdminSettings />;
        case 'analytics':
          return <AdminAnalytics />;
        case 'file-management':
          return <AdminFileManagement initialSearchTerm={fileManagementSearchTerm} />;
        default:
          return <AdminDashboard onNavigateToFileManagement={handleNavigateToFileManagement} />;
      }
    } else {
      switch (currentPage) {
        case 'dashboard':
          return <HelpDeskDashboard />;
        case 'management':
          return <FileManagement />;
        case 'recovery':
          return <FileRecovery />;
        case 'tickets':
          return <SupportTickets />;
        default:
          return <HelpDeskDashboard />;
      }
    }
  };

  return (
    <div dir="rtl" className="font-heebo">
      <Layout 
        currentPage={currentPage} 
        onPageChange={(page) => {
          setCurrentPage(page);
          if (page !== 'file-management') {
            setFileManagementSearchTerm('');
          }
        }}
        currentZone={currentZone}
        onZoneChange={setCurrentZone}
      >
        {renderCurrentPage()}
      </Layout>
    </div>
  );
}

export default App;