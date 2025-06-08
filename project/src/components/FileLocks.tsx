import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  Clock, 
  User, 
  AlertTriangle,
  CheckCircle,
  Filter,
  RefreshCw
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { mockFileLocks } from '../data/mockData';

const FileLocks: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLock, setSelectedLock] = useState<any>(null);
  const [showReleaseModal, setShowReleaseModal] = useState(false);

  const filteredLocks = mockFileLocks.filter(lock => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return new Date() < new Date(lock.estimatedEnd || '');
    if (filterStatus === 'overdue') return new Date() > new Date(lock.estimatedEnd || '');
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
    if (!lock.estimatedEnd) return 'active';
    const now = new Date();
    const end = new Date(lock.estimatedEnd);
    return now > end ? 'overdue' : 'active';
  };

  const handleReleaseLock = (lockId: string) => {
    // Mock implementation
    console.log('Releasing lock:', lockId);
    setShowReleaseModal(false);
    setSelectedLock(null);
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">File Lock Management</h2>
            <p className="text-sm text-gray-500 mt-1">Monitor and manage active file locks across the system</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Locks</option>
              <option value="active">Active</option>
              <option value="overdue">Overdue</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Locks</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue Locks</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Lock Duration</p>
              <p className="text-2xl font-bold text-gray-900">2.5h</p>
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
                  Lock Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Locked By
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
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLockTypeColor(lock.lockType)}`}>
                        {lock.lockType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
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
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>
                        <div>{formatDistanceToNow(lock.startTime)} ago</div>
                        {lock.estimatedEnd && (
                          <div className="text-xs text-gray-500">
                            Est. end: {format(lock.estimatedEnd, 'HH:mm')}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {status === 'active' ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className={`text-sm ${status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                          {status === 'active' ? 'Active' : 'Overdue'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedLock(lock)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        {lock.canRelease && (
                          <button
                            onClick={() => {
                              setSelectedLock(lock);
                              setShowReleaseModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Release
                          </button>
                        )}
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
      {selectedLock && !showReleaseModal && (
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
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Lock Type</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLockTypeColor(selectedLock.lockType)}`}>
                  {selectedLock.lockType}
                </span>
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
            </div>
          </div>
        </div>
      )}

      {/* Release Lock Modal */}
      {showReleaseModal && selectedLock && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Release File Lock</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to release the lock on <strong>{selectedLock.fileName}</strong>?
                This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowReleaseModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReleaseLock(selectedLock.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Release Lock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileLocks;