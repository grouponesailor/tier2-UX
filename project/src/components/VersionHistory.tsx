import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  User, 
  Download, 
  RotateCcw,
  Search,
  Filter,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { mockFileVersions } from '../data/mockData';

const VersionHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);

  const uniqueFiles = Array.from(new Set(mockFileVersions.map(v => v.filePath)));
  
  const filteredVersions = mockFileVersions.filter(version => {
    const matchesSearch = version.filePath.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         version.changes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFile = selectedFile === '' || version.filePath === selectedFile;
    return matchesSearch && matchesFile;
  });

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleRestore = (version: any) => {
    // Mock implementation
    console.log('Restoring version:', version);
    setShowRestoreModal(false);
    setSelectedVersion(null);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Version History</h2>
            <p className="text-sm text-gray-500 mt-1">Track file changes and restore previous versions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search files or changes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Files</option>
              {uniqueFiles.map((file) => (
                <option key={file} value={file}>
                  {file.split('/').pop()}
                </option>
              ))}
            </select>
          </div>
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
            <Clock className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Changes</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <RotateCcw className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Restorable</p>
              <p className="text-2xl font-bold text-gray-900">{mockFileVersions.filter(v => v.restorable).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <User className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Contributors</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Version History Table */}
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
                  Modified By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
                      <FileText className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {version.filePath.split('/').pop()}
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
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
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
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                      {version.restorable && (
                        <button
                          onClick={() => {
                            setSelectedVersion(version);
                            setShowRestoreModal(true);
                          }}
                          className="text-purple-600 hover:text-purple-900 flex items-center"
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
                <p className="text-sm text-gray-900">{selectedVersion.filePath.split('/').pop()}</p>
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
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowRestoreModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRestore(selectedVersion)}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
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

export default VersionHistory;