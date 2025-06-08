import React, { useState } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminSettings from './components/admin/AdminSettings';
import AdminAnalytics from './components/admin/AdminAnalytics';
import HelpDeskDashboard from './components/helpdesk/HelpDeskDashboard';
import FileManagement from './components/helpdesk/FileManagement';
import FileRecovery from './components/helpdesk/FileRecovery';
import SupportTickets from './components/helpdesk/SupportTickets';

function App() {
  const [currentZone, setCurrentZone] = useState<'admin' | 'helpdesk'>('admin');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    if (currentZone === 'admin') {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'users':
          return <AdminUsers />;
        case 'settings':
          return <AdminSettings />;
        case 'analytics':
          return <AdminAnalytics />;
        default:
          return <AdminDashboard />;
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
    <Layout 
      currentPage={currentPage} 
      onPageChange={setCurrentPage}
      currentZone={currentZone}
      onZoneChange={setCurrentZone}
    >
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;