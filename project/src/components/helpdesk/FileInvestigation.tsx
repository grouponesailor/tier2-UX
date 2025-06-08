import React, { useState } from 'react';
import { 
  Search, 
  User, 
  FileText, 
  Shield, 
  Clock, 
  Eye,
  Users,
  FolderTree,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const FileInvestigation: React.FC = () => {
  const [searchType, setSearchType] = useState<'employee' | 'file'>('employee');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const mockEmployeeResults = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      department: 'Marketing',
      accessibleFiles: [
        { path: '/marketing/campaigns/2024-q1.xlsx', permission: 'write', lastAccessed: '2 hours ago' },
        { path: '/shared/templates/presentation.pptx', permission: 'read', lastAccessed: '1 day ago' },
        { path: '/marketing/budget/budget-2024.xlsx', permission: 'read', lastAccessed: '3 days ago' }
      ],
      recentActivity: [
        { action: 'Opened file', file: '/marketing/campaigns/2024-q1.xlsx', time: '2 hours ago' },
        { action: 'Modified file', file: '/marketing/campaigns/2024-q1.xlsx', time: '2 hours ago' }
      ]
    }
  ];

  const mockFileResults = [
    {
      id: '1',
      path: '/finance/budget-2024.xlsx',
      name: 'budget-2024.xlsx',
      size: '2.4 MB',
      owner: 'John Smith',
      location: 'Server: FS-01, Path: /data/finance/',
      permissions: [
        { user: 'Finance Team', level: 'write', type: 'group' },
        { user: 'Sarah Wilson', level: 'read', type: 'user' },
        { user: 'Mike Johnson', level: 'read', type: 'user' }
      ],
      recentAccess: [
        { user: 'Sarah Wilson', action: 'opened', time: '1 hour ago' },
        { user: 'Mike Johnson', action: 'downloaded', time: '3 hours ago' }
      ],
      isLocked: false,
      lastModified: '2024-01-15T10:30:00'
    }
  ];

  const handleSearch = () => {
    if (searchType === 'employee') {
      setSearchResults(mockEmployeeResults.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setSearchResults(mockFileResults.filter(file => 
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.path.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'write': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-green-100 text-green-800';
      case 'delete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">File Investigation Center</h2>
            <p className="text-sm text-gray-500 mt-1">Search for employees or files to investigate access and permissions</p>
          </div>
          
          {/* Search Type Toggle */}
          <div className="flex space-x-4">
            <button
              onClick={() => setSearchType('employee')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                searchType === 'employee' 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Search by Employee</span>
            </button>
            <button
              onClick={() => setSearchType('file')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                searchType === 'file' 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Search by File</span>
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={searchType === 'employee' ? 'Enter employee name or email...' : 'Enter file name or path...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Results */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {searchType === 'employee' ? 'Employees' : 'Files'}
              </h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No results found. Try searching for {searchType === 'employee' ? 'an employee' : 'a file'}.</p>
                </div>
              ) : (
                searchResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => setSelectedItem(result)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedItem?.id === result.id ? 'bg-green-50 border-r-2 border-green-600' : ''
                    }`}
                  >
                    {searchType === 'employee' ? (
                      <div>
                        <h4 className="font-medium text-gray-900">{result.name}</h4>
                        <p className="text-sm text-gray-500">{result.email}</p>
                        <p className="text-sm text-gray-500">{result.department}</p>
                        <div className="mt-2 text-xs text-gray-400">
                          {result.accessibleFiles.length} accessible files
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-medium text-gray-900">{result.name}</h4>
                        <p className="text-sm text-gray-500 truncate">{result.path}</p>
                        <p className="text-sm text-gray-500">{result.size}</p>
                        <div className="mt-2 flex items-center">
                          {result.isLocked ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Locked
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Available
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-2">
          {selectedItem ? (
            <div className="space-y-6">
              {searchType === 'employee' ? (
                <>
                  {/* Employee Details */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl font-medium">
                            {selectedItem.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{selectedItem.name}</h3>
                          <p className="text-gray-600">{selectedItem.email}</p>
                          <p className="text-gray-600">{selectedItem.department}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accessible Files */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-green-600" />
                        Accessible Files ({selectedItem.accessibleFiles.length})
                      </h4>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {selectedItem.accessibleFiles.map((file: any, index: number) => (
                        <div key={index} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{file.path.split('/').pop()}</p>
                              <p className="text-sm text-gray-500">{file.path}</p>
                              <p className="text-xs text-gray-400">Last accessed: {file.lastAccessed}</p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPermissionColor(file.permission)}`}>
                              {file.permission}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* File Details */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{selectedItem.name}</h3>
                        <p className="text-gray-600 mt-1">{selectedItem.path}</p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Size</span>
                            <p className="text-sm text-gray-900">{selectedItem.size}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Owner</span>
                            <p className="text-sm text-gray-900">{selectedItem.owner}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Location</span>
                            <p className="text-sm text-gray-900">{selectedItem.location}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Status</span>
                            <div className="flex items-center mt-1">
                              {selectedItem.isLocked ? (
                                <>
                                  <XCircle className="h-4 w-4 text-red-500 mr-1" />
                                  <span className="text-sm text-red-600">Locked</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                  <span className="text-sm text-green-600">Available</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* File Permissions */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-green-600" />
                        Current Permissions
                      </h4>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {selectedItem.permissions.map((perm: any, index: number) => (
                        <div key={index} className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {perm.type === 'group' ? (
                              <Users className="h-5 w-5 text-blue-600" />
                            ) : (
                              <User className="h-5 w-5 text-green-600" />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{perm.user}</p>
                              <p className="text-sm text-gray-500">{perm.type}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPermissionColor(perm.level)}`}>
                            {perm.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Access */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-green-600" />
                        Recent Access
                      </h4>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {selectedItem.recentAccess.map((access: any, index: number) => (
                        <div key={index} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{access.user}</p>
                              <p className="text-sm text-gray-500">{access.action} the file</p>
                            </div>
                            <span className="text-sm text-gray-400">{access.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an item to investigate</h3>
              <p className="text-gray-500">Choose {searchType === 'employee' ? 'an employee' : 'a file'} from the search results to view detailed information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileInvestigation;