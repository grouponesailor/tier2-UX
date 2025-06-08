import React, { useState } from 'react';
import { 
  RotateCcw, 
  FileText, 
  Clock, 
  User, 
  Download,
  Search,
  Filter,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const FileRecovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoreReason, setRestoreReason] = useState('');

  const mockFileVersions = [
    {
      id: '1',
      filePath: '/finance/budget-2024.xlsx',
      fileName: 'budget-2024.xlsx',
      version: '3.2',
      size: 2048576,
      createdBy: { name: 'John Smith', email: 'john.smith@company.com' },
      createdAt: new Date('2024-01-15T10:00:00'),
      changes: 'Updated Q1 projections and added new budget categories',
      restorable: true,
      backupLocation: 'backup-server-01:/backups/finance/',
      currentVersion: false
    },
    {
      id: '2',
      filePath: '/finance/budget-2024.xlsx',
      fileName: 'budget-2024.xlsx',
      version: '3.1',
      size: 1987654,
      createdBy: { name: 'Sarah Wilson', email: 'sarah.wilson@company.com' },
      createdAt: new Date('2024-01-10T14:30:00'),
      changes: 'Fixed calculation errors in department totals',
      restorable: true,
      backupLocation: 'backup-server-01:/backups/finance/',
      currentVersion: false
    },
    {
      id: '3',
      filePath: '/marketing/campaign-2024.pptx',
      fileName: 'campaign-2024.pptx',
      version: '2.0',
      size: 5432100,
      createdBy: { name: 'Mike Johnson', email: 'mike.johnson@company.com' },
      createdAt: new Date('2024-01-12T09:15:00'),
      changes: 'Added new slides for product launch campaign',
      restorable: true,
      backupLocation: 'backup-server-02:/backups/marketing/',
      currentVersion: true
    }
  ];

  const filteredVersions = mockFileVersions.filter(version => {
    const matchesSearch = version.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.filePath.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'restorable' && version.restorable) ||
                         (filterType === 'current' && version.currentVersion);
    
    return matchesSearch && matchesFilter;
  });

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleRestore = () => {
    console.log('Restoring version:', selectedVersion.id, 'Reason:', restoreReason);
    setShowRestoreModal(false);
    setSelectedVersion(null);
    setRestoreReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">File Recovery Center</h2>
            <p className="text-sm text-gray-500 mt-1">Restore previous file versions and recover deleted files</p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files, versions, or users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Versions</option>
            <option value="restorable">Restorable</option>
            <option value="current">Current Versions</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Versions</p>
              <p className="text-2xl font-bold text-gray-900">{mockFileVersions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <RotateCcw className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Restorable</p>
              <p className="text-2xl font-bold text-gray-900">{mockFileVersions.filter(v => v.restorable).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Restored Today</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <User className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Contributors</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* File Versions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">File Versions</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File & Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Changes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {filteredVersions.map((version) => (
                <tr key={version.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-green-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {version.fileName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Version {version.version}
                        </div>
                        <div className="text-xs text-gray-400 truncate max-w-xs">
                          {version.filePath}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {version.changes}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {version.createdBy.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{version.createdBy.name}</div>
                        <div className="text-sm text-gray-500">{version.createdBy.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatFileSize(version.size)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {format(version.createdAt, 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDistanceToNow(version.createdAt)} ago
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {version.currentVersion ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm text-blue-600">Current</span>
                        </>
                      ) : version.restorable ? (
                        <>
                          <RotateCcw className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-green-600">Restorable</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">Archived</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                      {version.restorable && !version.currentVersion && (
                        <button
                          onClick={() => {
                            setSelectedVersion(version);
                            setShowRestoreModal(true);
                          }}
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Restore
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restore Version Modal */}
      {showRestoreModal && selectedVersion && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                Restore File Version
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> Restoring this version will create a new version and may affect users currently working with this file.
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">File</label>
                <p className="text-sm text-gray-900">{selectedVersion.fileName}</p>
                <p className="text-xs text-gray-500">{selectedVersion.filePath}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Version to Restore</label>
                <p className="text-sm text-gray-900">Version {selectedVersion.version}</p>
                <p className="text-xs text-gray-500">Created {format(selectedVersion.createdAt, 'PPpp')}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Changes</label>
                <p className="text-sm text-gray-900">{selectedVersion.changes}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Backup Location</label>
                <p className="text-sm text-gray-900 font-mono text-xs">{selectedVersion.backupLocation}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Reason for Restoration *</label>
                <textarea
                  value={restoreReason}
                  onChange={(e) => setRestoreReason(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Explain why this version needs to be restored..."
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowRestoreModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRestore}
                disabled={!restoreReason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Restore Version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileRecovery;