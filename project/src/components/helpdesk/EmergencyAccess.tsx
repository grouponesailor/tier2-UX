import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  User, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Search,
  Shield,
  Calendar
} from 'lucide-react';
import { format, addHours } from 'date-fns';

const EmergencyAccess: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [accessLevel, setAccessLevel] = useState('read');
  const [duration, setDuration] = useState('24');
  const [justification, setJustification] = useState('');
  const [showGrantModal, setShowGrantModal] = useState(false);

  const mockUsers = [
    { id: '1', name: 'Sarah Wilson', email: 'sarah.wilson@company.com', department: 'Marketing' },
    { id: '2', name: 'Mike Johnson', email: 'mike.johnson@company.com', department: 'Finance' },
    { id: '3', name: 'Lisa Chen', email: 'lisa.chen@company.com', department: 'Legal' }
  ];

  const mockFiles = [
    { id: '1', path: '/finance/budget-2024.xlsx', name: 'budget-2024.xlsx' },
    { id: '2', path: '/legal/contracts/2024-001.pdf', name: '2024-001.pdf' },
    { id: '3', path: '/marketing/campaigns/q1-2024.pptx', name: 'q1-2024.pptx' }
  ];

  const activeEmergencyAccess = [
    {
      id: '1',
      user: { name: 'Sarah Wilson', email: 'sarah.wilson@company.com' },
      file: '/finance/budget-2024.xlsx',
      accessLevel: 'read',
      grantedBy: 'John Doe',
      grantedAt: new Date('2024-01-15T10:00:00'),
      expiresAt: new Date('2024-01-16T10:00:00'),
      justification: 'Urgent client meeting requires budget review',
      status: 'active'
    },
    {
      id: '2',
      user: { name: 'Mike Johnson', email: 'mike.johnson@company.com' },
      file: '/legal/contracts/emergency-contract.pdf',
      accessLevel: 'write',
      grantedBy: 'Jane Smith',
      grantedAt: new Date('2024-01-15T08:30:00'),
      expiresAt: new Date('2024-01-16T08:30:00'),
      justification: 'Contract deadline today, original owner unavailable',
      status: 'active'
    }
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGrantAccess = () => {
    console.log('Granting emergency access:', {
      user: selectedUser,
      file: selectedFile,
      accessLevel,
      duration,
      justification
    });
    setShowGrantModal(false);
    // Reset form
    setSelectedUser('');
    setSelectedFile('');
    setAccessLevel('read');
    setDuration('24');
    setJustification('');
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'read':
        return 'bg-green-100 text-green-800';
      case 'write':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      case 'revoked':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Zap className="h-6 w-6 text-orange-600 mr-2" />
              Emergency Access Manager
            </h2>
            <p className="text-sm text-gray-500 mt-1">Grant temporary file access for urgent business needs</p>
          </div>
          <button
            onClick={() => setShowGrantModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            <Zap className="h-4 w-4" />
            <span>Grant Emergency Access</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Emergency Access</p>
              <p className="text-2xl font-bold text-gray-900">{activeEmergencyAccess.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Granted Today</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">18h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Emergency Access */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Active Emergency Access</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Access Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Granted By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeEmergencyAccess.map((access) => (
                <tr key={access.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {access.user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{access.user.name}</div>
                        <div className="text-sm text-gray-500">{access.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{access.file.split('/').pop()}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{access.file}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccessLevelColor(access.accessLevel)}`}>
                      {access.accessLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{format(access.expiresAt, 'MMM d, HH:mm')}</div>
                    <div className="text-xs text-gray-500">
                      {new Date() > access.expiresAt ? 'Expired' : 'Active'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {access.grantedBy}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Revoke
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grant Emergency Access Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Zap className="h-5 w-5 text-orange-500 mr-2" />
                Grant Emergency Access
              </h3>
            </div>
            <div className="px-6 py-4 space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-orange-800">Emergency Access Warning</h3>
                    <p className="text-sm text-orange-700 mt-1">
                      This will grant temporary access that bypasses normal approval processes. Use only for urgent business needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* User Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for user..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                {searchTerm && (
                  <div className="mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md">
                    {filteredUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          setSelectedUser(user.id);
                          setSearchTerm(user.name);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email} • {user.department}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* File Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File Path</label>
                <input
                  type="text"
                  placeholder="Enter file path or search..."
                  value={selectedFile}
                  onChange={(e) => setSelectedFile(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Access Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
                <select
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="read">Read Only</option>
                  <option value="write">Read & Write</option>
                  <option value="delete">Full Access (including delete)</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="1">1 hour</option>
                  <option value="4">4 hours</option>
                  <option value="8">8 hours</option>
                  <option value="24">24 hours</option>
                  <option value="48">48 hours</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Access will expire on {format(addHours(new Date(), parseInt(duration)), 'PPpp')}
                </p>
              </div>

              {/* Justification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Justification *</label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Explain the urgent business need for this emergency access..."
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowGrantModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleGrantAccess}
                disabled={!selectedUser || !selectedFile || !justification.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Grant Emergency Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyAccess;