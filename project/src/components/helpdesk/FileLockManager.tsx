import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  Clock, 
  User, 
  AlertTriangle,
  CheckCircle,
  Filter,
  RefreshCw,
  MessageCircle,
  Shield
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const FileLockManager: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLock, setSelectedLock] = useState<any>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockReason, setUnlockReason] = useState('');

  const mockFileLocks = [
    {
      id: '1',
      filePath: '/finance/budget-2024.xlsx',
      fileName: 'budget-2024.xlsx',
      lockedBy: { name: 'Mike Johnson', email: 'mike.johnson@company.com' },
      lockType: 'write',
      startTime: new Date('2024-01-13T09:00:00'),
      estimatedEnd: new Date('2024-01-13T10:00:00'),
      reason: 'Updating quarterly figures',
      canRelease: true,
      lastActivity: new Date('2024-01-13T09:05:00'),
      isStuck: true,
      duration: 2880 // minutes
    },
    {
      id: '2',
      filePath: '/marketing/campaign-2024.pptx',
      fileName: 'campaign-2024.pptx',
      lockedBy: { name: 'Sarah Wilson', email: 'sarah.wilson@company.com' },
      lockType: 'exclusive',
      startTime: new Date('2024-01-15T14:30:00'),
      estimatedEnd: new Date('2024-01-15T16:30:00'),
      reason: 'Preparing client presentation',
      canRelease: true,
      lastActivity: new Date('2024-01-15T15:45:00'),
      isStuck: false,
      duration: 75
    }
  ];

  const filteredLocks = mockFileLocks.filter(lock => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'stuck') return lock.isStuck;
    if (filterStatus === 'active') return !lock.isStuck;
    return true;
  });

  const getLockTypeColor = (type: string) => {
    switch (type) {
      case 'exclusive':
        return 'bg-red-100 text-red-800';
      case 'write':
        return 'bg-yellow-100 text-yellow-800';
      case 'read':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLockStatus = (lock: any) => {
    if (lock.isStuck) return 'stuck';
    const now = new Date();
    const end = new Date(lock.estimatedEnd);
    return now > end ? 'overdue' : 'active';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stuck':
        return 'text-red-600 bg-red-50';
      case 'overdue':
        return 'text-orange-600 bg-orange-50';
      case 'active':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleUnlock = () => {
    console.log('Unlocking file:', selectedLock.id, 'Reason:', unlockReason);
    setShowUnlockModal(false);
    setSelectedLock(null);
    setUnlockReason('');
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">File Lock Manager</h2>
            <p className="text-sm text-gray-500 mt-1">Monitor and manage file locks across the system</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Locks</option>
              <option value="active">Active</option>
              <option value="stuck">Stuck/Overdue</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Lock className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Locks</p>
              <p className="text-2xl font-bold text-gray-900">{mockFileLocks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Stuck Locks</p>
              <p className="text-2xl font-bold text-gray-900">{mockFileLocks.filter(l => l.isStuck).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">2.5h</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Released Today</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* File Locks Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Current File Locks</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Locked By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lock Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLocks.map((lock) => {
                const status = getLockStatus(lock);
                return (
                  <tr key={lock.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lock.fileName}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{lock.filePath}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {lock.lockedBy.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{lock.lockedBy.name}</div>
                          <div className="text-sm text-gray-500">{lock.lockedBy.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLockTypeColor(lock.lockType)}`}>
                        {lock.lockType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{formatDuration(lock.duration)}</div>
                        <div className="text-xs text-gray-500">
                          Started {formatDistanceToNow(lock.startTime)} ago
                        </div>
                        {lock.lastActivity && (
                          <div className="text-xs text-gray-500">
                            Last activity: {formatDistanceToNow(lock.lastActivity)} ago
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {status === 'stuck' ? (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        ) : status === 'overdue' ? (
                          <Clock className="h-4 w-4 text-orange-500 mr-2" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                          {status === 'stuck' ? 'Stuck' : status === 'overdue' ? 'Overdue' : 'Active'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedLock(lock)}
                          className="text-green-600 hover:text-green-900"
                        >
                          View
                        </button>
                        {lock.canRelease && (
                          <button
                            onClick={() => {
                              setSelectedLock(lock);
                              setShowUnlockModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Unlock
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-900">
                          Contact
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

      {/* Lock Details Modal */}
      {selectedLock && !showUnlockModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Lock Details</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">File</label>
                <p className="text-sm text-gray-900">{selectedLock.fileName}</p>
                <p className="text-xs text-gray-500">{selectedLock.filePath}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Locked By</label>
                <p className="text-sm text-gray-900">{selectedLock.lockedBy.name}</p>
                <p className="text-xs text-gray-500">{selectedLock.lockedBy.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Lock Type</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLockTypeColor(selectedLock.lockType)}`}>
                  {selectedLock.lockType}
                </span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Duration</label>
                <p className="text-sm text-gray-900">{formatDuration(selectedLock.duration)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Started</label>
                <p className="text-sm text-gray-900">{format(selectedLock.startTime, 'PPpp')}</p>
              </div>
              {selectedLock.reason && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Reason</label>
                  <p className="text-sm text-gray-900">{selectedLock.reason}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedLock(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              {selectedLock.canRelease && (
                <button
                  onClick={() => setShowUnlockModal(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Unlock File
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Unlock Modal */}
      {showUnlockModal && selectedLock && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Shield className="h-5 w-5 text-red-500 mr-2" />
                Unlock File
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> Unlocking this file will notify the current user and may interrupt their work.
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">File</label>
                <p className="text-sm text-gray-900">{selectedLock.fileName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Currently Locked By</label>
                <p className="text-sm text-gray-900">{selectedLock.lockedBy.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Reason for Unlocking *</label>
                <textarea
                  value={unlockReason}
                  onChange={(e) => setUnlockReason(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Explain why this file needs to be unlocked..."
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowUnlockModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUnlock}
                disabled={!unlockReason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Unlock File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileLockManager;