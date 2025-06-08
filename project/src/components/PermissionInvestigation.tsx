import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock, 
  Users, 
  FolderTree,
  Shield,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { mockFilePermissions, mockPermissionHistory } from '../data/mockData';

const PermissionInvestigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [filterRole, setFilterRole] = useState('all');
  const [showHistory, setShowHistory] = useState(false);

  const filteredPermissions = mockFilePermissions.filter(permission =>
    permission.filePath.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePath = (path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  };

  const renderPermissionHierarchy = (permission: any) => {
    const pathParts = permission.filePath.split('/').filter(part => part);
    
    return (
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900 flex items-center">
          <FolderTree className="h-4 w-4 mr-2 text-blue-600" />
          Permission Hierarchy
        </h4>
        <div className="bg-gray-50 rounded-lg p-4">
          {pathParts.map((part, index) => {
            const isLast = index === pathParts.length - 1;
            const indent = index * 20;
            
            return (
              <div key={index} className="flex items-center py-1" style={{ paddingLeft: `${indent}px` }}>
                {!isLast && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                )}
                <span className={isLast ? 'font-medium text-blue-600' : 'text-gray-600'}>
                  {part}
                </span>
                {permission.inherited && !isLast && index === pathParts.length - 2 && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Inherited
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search files, folders, or paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Permissions</option>
              <option value="read">Read Only</option>
              <option value="write">Write Access</option>
              <option value="execute">Execute Access</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Files & Folders</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredPermissions.map((permission) => (
                <div
                  key={permission.id}
                  onClick={() => setSelectedFile(permission)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedFile?.id === permission.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{permission.fileName}</h4>
                      <p className="text-sm text-gray-500 truncate">{permission.filePath}</p>
                    </div>
                    {permission.inherited && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Inherited
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{permission.permissions.read.length + permission.permissions.write.length} users</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Permission Details */}
        <div className="lg:col-span-2">
          {selectedFile ? (
            <div className="space-y-6">
              {/* File Overview */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedFile.fileName}</h3>
                    <p className="text-sm text-gray-500 mt-1">{selectedFile.filePath}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setShowHistory(!showHistory)}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <Clock className="h-4 w-4" />
                      <span>History</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Owner</span>
                    <p className="text-sm text-gray-900 mt-1">{selectedFile.owner.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Last Modified</span>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedFile.lastModified.toLocaleDateString()} by {selectedFile.modifiedBy.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Permission Details */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-600" />
                  Current Permissions
                </h4>
                
                <div className="space-y-4">
                  {/* Read Permissions */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Read Access</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedFile.permissions.read.map((group: string, index: number) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Write Permissions */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Write Access</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedFile.permissions.write.map((group: string, index: number) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Execute Permissions */}
                  {selectedFile.permissions.execute.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Execute Access</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedFile.permissions.execute.map((group: string, index: number) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {group}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Permission Hierarchy */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {renderPermissionHierarchy(selectedFile)}
              </div>

              {/* Permission History */}
              {showHistory && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    Permission History
                  </h4>
                  
                  <div className="space-y-4">
                    {mockPermissionHistory
                      .filter(history => history.filePath === selectedFile.filePath)
                      .map((history) => (
                        <div key={history.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              history.action === 'granted' ? 'bg-green-100 text-green-800' :
                              history.action === 'revoked' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {history.action}
                            </span>
                            <span className="text-sm text-gray-500">
                              {history.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 mb-2">
                            {history.permissions.join(', ')} access for {history.user.name}
                          </p>
                          <div className="text-xs text-gray-500">
                            Requested by {history.requestedBy.name}
                            {history.approved && history.approvedBy && (
                              <span> • Approved by {history.approvedBy.name}</span>
                            )}
                            {history.reason && (
                              <span> • {history.reason}</span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a file to investigate</h3>
              <p className="text-gray-500">Choose a file from the list to view its permissions and history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionInvestigation;