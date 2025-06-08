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

const SupportTickets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mockTickets = [
    {
      id: 'TK-001',
      title: 'Cannot access budget file',
      description: 'User reports being unable to open the quarterly budget file despite having proper permissions.',
      reportedBy: { name: 'Sarah Wilson', email: 'sarah.wilson@company.com', department: 'Marketing' },
      assignedTo: { name: 'John Doe', email: 'john.doe@company.com' },
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
      title: 'File locked for 2 days',
      description: 'Contract file has been locked by user who is now on vacation. Need emergency access.',
      reportedBy: { name: 'Mike Johnson', email: 'mike.johnson@company.com', department: 'Legal' },
      assignedTo: { name: 'Jane Smith', email: 'jane.smith@company.com' },
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
      title: 'Missing presentation file',
      description: 'Important client presentation file seems to have disappeared from the shared folder.',
      reportedBy: { name: 'Lisa Chen', email: 'lisa.chen@company.com', department: 'Sales' },
      assignedTo: null,
      status: 'resolved',
      priority: 'medium',
      category: 'file_missing',
      createdAt: new Date('2024-01-14T14:20:00'),
      resolvedAt: new Date('2024-01-14T16:45:00'),
      resolution: 'File was found in archive folder and restored to original location.',
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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Support Tickets</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and track file access support requests</p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create Ticket</span>
          </button>
        </div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Ticket className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{mockTickets.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open</p>
              <p className="text-2xl font-bold text-gray-900">{mockTickets.filter(t => t.status === 'open').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{mockTickets.filter(t => t.status === 'in_progress').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{mockTickets.filter(t => t.status === 'resolved').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Support Tickets</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => {
                const CategoryIcon = getCategoryIcon(ticket.category);
                return (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <CategoryIcon className="h-8 w-8 text-green-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {ticket.id}: {ticket.title}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {ticket.description}
                          </div>
                          <div className="text-xs text-gray-400">
                            Category: {ticket.category.replace('_', ' ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {ticket.reportedBy.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{ticket.reportedBy.name}</div>
                          <div className="text-sm text-gray-500">{ticket.reportedBy.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {ticket.assignedTo ? (
                        <div className="text-sm text-gray-900">{ticket.assignedTo.name}</div>
                      ) : (
                        <span className="text-sm text-gray-500">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {format(ticket.createdAt, 'MMM d, yyyy')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDistanceToNow(ticket.createdAt)} ago
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-green-600 hover:text-green-900"
                        >
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
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
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedTicket.id}: {selectedTicket.title}
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Priority</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-sm text-gray-900">{selectedTicket.category.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="text-sm text-gray-900">{format(selectedTicket.createdAt, 'PPpp')}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-sm text-gray-900">{selectedTicket.description}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Reported By</label>
                <div className="flex items-center mt-1">
                  <div className="flex-shrink-0 h-8 w-8">
                    <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {selectedTicket.reportedBy.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{selectedTicket.reportedBy.name}</div>
                    <div className="text-sm text-gray-500">{selectedTicket.reportedBy.email}</div>
                    <div className="text-sm text-gray-500">{selectedTicket.reportedBy.department}</div>
                  </div>
                </div>
              </div>
              
              {selectedTicket.assignedTo && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Assigned To</label>
                  <p className="text-sm text-gray-900">{selectedTicket.assignedTo.name}</p>
                </div>
              )}
              
              {selectedTicket.relatedFiles.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Related Files</label>
                  <div className="mt-1">
                    {selectedTicket.relatedFiles.map((file: string, index: number) => (
                      <div key={index} className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTicket.resolution && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Resolution</label>
                  <p className="text-sm text-gray-900">{selectedTicket.resolution}</p>
                  {selectedTicket.resolvedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      Resolved on {format(selectedTicket.resolvedAt, 'PPpp')}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                Update Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;