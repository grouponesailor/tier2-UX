import React, { useState } from 'react';
import { 
  Ticket, 
  Plus, 
  Search, 
  Filter, 
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  FileText
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';

const SupportTickets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mockTickets = [
    {
      id: 'TK-001',
      title: 'לא ניתן לגשת לקובץ תקציב',
      description: 'המשתמש מדווח שלא ניתן לפתוח את קובץ התקציב הרבעוני למרות שיש לו הרשאות מתאימות.',
      reportedBy: { name: 'שרה וילסון', email: 'sarah.wilson@company.com', department: 'שיווק' },
      assignedTo: { name: 'יוחנן דוד', email: 'john.doe@company.com' },
      status: 'in_progress',
      priority: 'high',
      category: 'file_access',
      createdAt: new Date('2024-01-15T09:30:00'),
      resolvedAt: null,
      resolution: null,
      relatedFiles: ['/finance/budget-2024.xlsx'],
      lastUpdate: new Date('2024-01-15T10:15:00')
    },
    {
      id: 'TK-002',
      title: 'קובץ נעול כבר יומיים',
      description: 'קובץ חוזה נעול על ידי משתמש שנמצא כעת בחופשה. נדרשת גישת חירום.',
      reportedBy: { name: 'מיכאל יוחנן', email: 'mike.johnson@company.com', department: 'משפטי' },
      assignedTo: { name: 'ג\'יין שמיט', email: 'jane.smith@company.com' },
      status: 'open',
      priority: 'urgent',
      category: 'file_locked',
      createdAt: new Date('2024-01-15T08:00:00'),
      resolvedAt: null,
      resolution: null,
      relatedFiles: ['/legal/contracts/2024-001.pdf'],
      lastUpdate: new Date('2024-01-15T08:00:00')
    },
    {
      id: 'TK-003',
      title: 'קובץ מצגת חסר',
      description: 'קובץ מצגת חשוב ללקוח נעלם מהתיקייה המשותפת.',
      reportedBy: { name: 'ליסה חן', email: 'lisa.chen@company.com', department: 'מכירות' },
      assignedTo: null,
      status: 'resolved',
      priority: 'medium',
      category: 'file_missing',
      createdAt: new Date('2024-01-14T14:20:00'),
      resolvedAt: new Date('2024-01-14T16:45:00'),
      resolution: 'הקובץ נמצא בתיקיית הארכיון ושוחזר למיקום המקורי.',
      relatedFiles: ['/sales/presentations/client-demo.pptx'],
      lastUpdate: new Date('2024-01-14T16:45:00')
    }
  ];

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'פתוח';
      case 'in_progress':
        return 'בטיפול';
      case 'resolved':
        return 'נפתר';
      case 'closed':
        return 'סגור';
      default:
        return 'לא ידוע';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'דחוף';
      case 'high':
        return 'גבוה';
      case 'medium':
        return 'בינוני';
      case 'low':
        return 'נמוך';
      default:
        return 'לא ידוע';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'file_access':
        return User;
      case 'file_locked':
        return Clock;
      case 'file_missing':
        return FileText;
      case 'permission_issue':
        return AlertTriangle;
      default:
        return Ticket;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">פניות תמיכה</h2>
            <p className="text-sm text-gray-500 mt-1">ניהול ומעקב אחר בקשות תמיכה לגישה לקבצים</p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <span>צור פנייה</span>
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">כל העדיפויות</option>
            <option value="urgent">דחוף</option>
            <option value="high">גבוה</option>
            <option value="medium">בינוני</option>
            <option value="low">נמוך</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">כל הסטטוסים</option>
            <option value="open">פתוח</option>
            <option value="in_progress">בטיפול</option>
            <option value="resolved">נפתר</option>
            <option value="closed">סגור</option>
          </select>
          
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="חיפוש פניות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">סך הפניות</p>
              <p className="text-2xl font-bold text-gray-900">{mockTickets.length}</p>
            </div>
            <Ticket className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">פתוחות</p>
              <p className="text-2xl font-bold text-gray-900">{mockTickets.filter(t => t.status === 'open').length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">בטיפול</p>
              <p className="text-2xl font-bold text-gray-900">{mockTickets.filter(t => t.status === 'in_progress').length}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">נפתרו</p>
              <p className="text-2xl font-bold text-gray-900">{mockTickets.filter(t => t.status === 'resolved').length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">פניות תמיכה</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  נוצר
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  עדיפות
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  הוקצה ל
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  דווח על ידי
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פנייה
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => {
                const CategoryIcon = getCategoryIcon(ticket.category);
                return (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          עריכה
                        </button>
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-green-600 hover:text-green-900"
                        >
                          צפייה
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 text-right">
                        {format(ticket.createdAt, 'MMM d, yyyy', { locale: he })}
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        {formatDistanceToNow(ticket.createdAt, { locale: he })} לפני
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {getStatusText(ticket.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityText(ticket.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {ticket.assignedTo ? (
                        <div className="text-sm text-gray-900 text-right">{ticket.assignedTo.name}</div>
                      ) : (
                        <span className="text-sm text-gray-500">לא הוקצה</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <div className="mr-3 text-right">
                          <div className="text-sm text-gray-500">{ticket.reportedBy.department}</div>
                          <div className="text-sm font-medium text-gray-900">{ticket.reportedBy.name}</div>
                        </div>
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {ticket.reportedBy.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {ticket.id}: {ticket.title}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {ticket.description}
                          </div>
                          <div className="text-xs text-gray-400">
                            קטגוריה: {ticket.category.replace('_', ' ')}
                          </div>
                        </div>
                        <CategoryIcon className="h-8 w-8 text-green-600 mr-3" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" dir="rtl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedTicket.id}: {selectedTicket.title}
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-right">
                  <label className="text-sm font-medium text-gray-500">נוצר</label>
                  <p className="text-sm text-gray-900">{format(selectedTicket.createdAt, 'PPpp', { locale: he })}</p>
                </div>
                <div className="text-right">
                  <label className="text-sm font-medium text-gray-500">קטגוריה</label>
                  <p className="text-sm text-gray-900">{selectedTicket.category.replace('_', ' ')}</p>
                </div>
                <div className="text-right">
                  <label className="text-sm font-medium text-gray-500">עדיפות</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                    {getPriorityText(selectedTicket.priority)}
                  </span>
                </div>
                <div className="text-right">
                  <label className="text-sm font-medium text-gray-500">סטטוס</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {getStatusText(selectedTicket.status)}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-500">תיאור</label>
                <p className="text-sm text-gray-900">{selectedTicket.description}</p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-500">דווח על ידי</label>
                <div className="flex items-center justify-end mt-1">
                  <div className="mr-3 text-right">
                    <div className="text-sm text-gray-500">{selectedTicket.reportedBy.department}</div>
                    <div className="text-sm text-gray-500">{selectedTicket.reportedBy.email}</div>
                    <div className="text-sm font-medium text-gray-900">{selectedTicket.reportedBy.name}</div>
                  </div>
                  <div className="flex-shrink-0 h-8 w-8">
                    <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {selectedTicket.reportedBy.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedTicket.assignedTo && (
                <div className="text-right">
                  <label className="text-sm font-medium text-gray-500">הוקצה ל</label>
                  <p className="text-sm text-gray-900">{selectedTicket.assignedTo.name}</p>
                </div>
              )}
              
              {selectedTicket.relatedFiles.length > 0 && (
                <div className="text-right">
                  <label className="text-sm font-medium text-gray-500">קבצים קשורים</label>
                  <div className="mt-1">
                    {selectedTicket.relatedFiles.map((file: string, index: number) => (
                      <div key={index} className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded text-right">
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTicket.resolution && (
                <div className="text-right">
                  <label className="text-sm font-medium text-gray-500">פתרון</label>
                  <p className="text-sm text-gray-900">{selectedTicket.resolution}</p>
                  {selectedTicket.resolvedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      נפתר ב-{format(selectedTicket.resolvedAt, 'PPpp', { locale: he })}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-start space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                עדכן פנייה
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;