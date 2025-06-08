import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  Lock, 
  Unlock, 
  User, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  Shield,
  Calendar,
  HardDrive
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const FileManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [unlockNotes, setUnlockNotes] = useState('');
  const [emergencyReason, setEmergencyReason] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock search results that simulate finding files with similar names
  const getSearchResults = (term: string) => {
    const allFiles = [
      // Budget files example
      {
        id: '1',
        fileName: 'budget-2024.xlsx',
        filePath: '/finance/budget-2024.xlsx',
        isLocked: true,
        lockedBy: { name: 'Mike Johnson', email: 'mike.johnson@company.com', id: 'EMP001' },
        lockDuration: '2 days',
        lockStartTime: new Date('2024-01-13T10:00:00'),
        lastAccessed: new Date('2024-01-13T10:00:00'),
        size: '2.4 MB',
        owner: 'Finance Team',
        location: 'Server: FS-01, Path: /data/finance/',
        department: 'Finance'
      },
      {
        id: '2',
        fileName: 'budget-2024-final.xlsx',
        filePath: '/finance/budget-2024-final.xlsx',
        isLocked: false,
        lockedBy: null,
        lockDuration: null,
        lockStartTime: null,
        lastAccessed: new Date('2024-01-15T14:30:00'),
        size: '2.6 MB',
        owner: 'Finance Team',
        location: 'Server: FS-01, Path: /data/finance/',
        department: 'Finance'
      },
      {
        id: '3',
        fileName: 'budget-2024-backup.xlsx',
        filePath: '/finance/backup/budget-2024-backup.xlsx',
        isLocked: true,
        lockedBy: { name: 'Sarah Wilson', email: 'sarah.wilson@company.com', id: 'EMP002' },
        lockDuration: '4 hours',
        lockStartTime: new Date('2024-01-15T09:00:00'),
        lastAccessed: new Date('2024-01-15T09:00:00'),
        size: '2.3 MB',
        owner: 'Finance Team',
        location: 'Server: FS-02, Path: /backup/finance/',
        department: 'Finance'
      },
      // Contract files example
      {
        id: '4',
        fileName: 'contract-2024-001.pdf',
        filePath: '/legal/contracts/contract-2024-001.pdf',
        isLocked: true,
        lockedBy: { name: 'David Lee', email: 'david.lee@company.com', id: 'EMP003' },
        lockDuration: '1 day',
        lockStartTime: new Date('2024-01-14T15:00:00'),
        lastAccessed: new Date('2024-01-14T15:00:00'),
        size: '1.8 MB',
        owner: 'Legal Team',
        location: 'Server: FS-03, Path: /data/legal/',
        department: 'Legal'
      },
      {
        id: '5',
        fileName: 'contract-template-2024.pdf',
        filePath: '/legal/templates/contract-template-2024.pdf',
        isLocked: false,
        lockedBy: null,
        lockDuration: null,
        lockStartTime: null,
        lastAccessed: new Date('2024-01-15T11:20:00'),
        size: '1.2 MB',
        owner: 'Legal Team',
        location: 'Server: FS-03, Path: /data/legal/templates/',
        department: 'Legal'
      },
      {
        id: '6',
        fileName: 'contract-review-2024.docx',
        filePath: '/legal/reviews/contract-review-2024.docx',
        isLocked: false,
        lockedBy: null,
        lockDuration: null,
        lockStartTime: null,
        lastAccessed: new Date('2024-01-15T16:45:00'),
        size: '890 KB',
        owner: 'Legal Team',
        location: 'Server: FS-03, Path: /data/legal/reviews/',
        department: 'Legal'
      },
      // Employee files example
      {
        id: '7',
        fileName: 'employee-handbook.pdf',
        filePath: '/hr/documents/employee-handbook.pdf',
        isLocked: false,
        lockedBy: null,
        lockDuration: null,
        lockStartTime: null,
        lastAccessed: new Date('2024-01-15T13:15:00'),
        size: '3.2 MB',
        owner: 'HR Team',
        location: 'Server: FS-04, Path: /data/hr/',
        department: 'Human Resources'
      },
      {
        id: '8',
        fileName: 'employee-data-2024.xlsx',
        filePath: '/hr/confidential/employee-data-2024.xlsx',
        isLocked: true,
        lockedBy: { name: 'Lisa Chen', email: 'lisa.chen@company.com', id: 'EMP004' },
        lockDuration: '6 hours',
        lockStartTime: new Date('2024-01-15T08:00:00'),
        lastAccessed: new Date('2024-01-15T08:00:00'),
        size: '4.1 MB',
        owner: 'HR Team',
        location: 'Server: FS-04, Path: /data/hr/confidential/',
        department: 'Human Resources'
      },
      {
        id: '9',
        fileName: 'employee-reviews-q4.docx',
        filePath: '/hr/reviews/employee-reviews-q4.docx',
        isLocked: false,
        lockedBy: null,
        lockDuration: null,
        lockStartTime: null,
        lastAccessed: new Date('2024-01-14T17:30:00'),
        size: '2.7 MB',
        owner: 'HR Team',
        location: 'Server: FS-04, Path: /data/hr/reviews/',
        department: 'Human Resources'
      }
    ];

    // Filter files based on search term
    return allFiles.filter(file =>
      file.fileName.toLowerCase().includes(term.toLowerCase()) ||
      file.filePath.toLowerCase().includes(term.toLowerCase()) ||
      (file.lockedBy && (
        file.lockedBy.name.toLowerCase().includes(term.toLowerCase()) ||
        file.lockedBy.id.toLowerCase().includes(term.toLowerCase())
      ))
    ).slice(0, 3); // Return max 3 results as specified
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const results = getSearchResults(searchTerm.trim());
      setSearchResults(results);
      setHasSearched(true);
      setSelectedFile(null); // Clear selection when new search
    } else {
      setSearchResults([]);
      setHasSearched(false);
    }
  };

  const handleUnlockFile = () => {
    if (!unlockNotes.trim()) return;
    
    // Mock unlock operation
    console.log('Unlocking file:', selectedFile.fileName, 'Notes:', unlockNotes);
    
    // Update the file status
    const updatedFile = {
      ...selectedFile,
      isLocked: false,
      lockedBy: null,
      lockDuration: null,
      lockStartTime: null
    };
    
    setSelectedFile(updatedFile);
    
    // Update search results
    setSearchResults(prev => prev.map(file => 
      file.id === selectedFile.id ? updatedFile : file
    ));
    
    setShowUnlockModal(false);
    setUnlockNotes('');
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleEmergencyAccess = () => {
    if (!emergencyReason.trim()) return;
    
    console.log('Granting emergency access:', selectedFile.fileName, 'Reason:', emergencyReason);
    setShowEmergencyModal(false);
    setEmergencyReason('');
    setShowSuccessMessage(true);
    
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Example search suggestions
  const searchExamples = [
    'budget', 'contract', 'employee', 'EMP001', 'Mike Johnson', 'sarah.wilson@company.com'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">File Management Center</h2>
            <p className="text-sm text-gray-500 mt-1">Search for files or employees to manage access and resolve issues</p>
          </div>
          
          {/* Unified Search Bar */}
          <div className="space-y-3">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter file name/ID or employee name/number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
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
            
            {/* Search Examples */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Try searching for:</span>
              {searchExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(example);
                    const results = getSearchResults(example);
                    setSearchResults(results);
                    setHasSearched(true);
                    setSelectedFile(null);
                  }}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">
              Operation completed successfully! File status has been updated.
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Results */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Search Results
                {searchResults.length > 0 && (
                  <span className="ml-2 text-sm text-gray-500">({searchResults.length} found)</span>
                )}
              </h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {!hasSearched ? (
                <div className="p-6 text-center text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium mb-2">Ready to search</p>
                  <p className="text-sm">Enter a file name, employee name, or ID to get started</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium mb-2">No results found</p>
                  <p className="text-sm">Try a different search term or check the spelling</p>
                </div>
              ) : (
                searchResults.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedFile?.id === file.id ? 'bg-green-50 border-r-2 border-green-600' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-green-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{file.fileName}</h4>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{file.filePath}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">{file.size}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">{file.department}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {file.isLocked ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Lock className="h-3 w-3 mr-1" />
                            Locked
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Unlock className="h-3 w-3 mr-1" />
                            Available
                          </span>
                        )}
                        {file.lockDuration && (
                          <span className="text-xs text-gray-500">{file.lockDuration}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* File Details and Actions */}
        <div className="lg:col-span-2">
          {selectedFile ? (
            <div className="space-y-6">
              {/* File Overview */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-16 w-16 text-green-600" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedFile.fileName}</h3>
                      <p className="text-gray-600 mt-1">{selectedFile.filePath}</p>
                      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <span className="ml-1 text-gray-900">{selectedFile.size}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Owner:</span>
                          <span className="ml-1 text-gray-900">{selectedFile.owner}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Department:</span>
                          <span className="ml-1 text-gray-900">{selectedFile.department}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Last accessed:</span>
                          <span className="ml-1 text-gray-900">{formatDistanceToNow(selectedFile.lastAccessed)} ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {selectedFile.isLocked ? (
                      <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        <Lock className="h-4 w-4 mr-2" />
                        File Locked
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Available
                      </span>
                    )}
                  </div>
                </div>

                {/* File Location */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <HardDrive className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Storage Location:</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-mono">{selectedFile.location}</p>
                </div>

                {selectedFile.isLocked && selectedFile.lockedBy && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-800">
                          File locked by {selectedFile.lockedBy.name}
                        </p>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-yellow-700">
                          <div>
                            <span className="font-medium">Email:</span> {selectedFile.lockedBy.email}
                          </div>
                          <div>
                            <span className="font-medium">Employee ID:</span> {selectedFile.lockedBy.id}
                          </div>
                          <div>
                            <span className="font-medium">Lock Duration:</span> {selectedFile.lockDuration}
                          </div>
                          <div>
                            <span className="font-medium">Locked Since:</span> {format(selectedFile.lockStartTime, 'MMM d, HH:mm')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Menu */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Available Actions
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedFile.isLocked ? (
                    <button
                      onClick={() => setShowUnlockModal(true)}
                      className="flex items-center justify-center space-x-2 p-4 border-2 border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all duration-200 group"
                    >
                      <Unlock className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-gray-900">Unlock File</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 p-4 border-2 border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed">
                      <CheckCircle className="h-6 w-6 text-gray-400" />
                      <span className="font-medium text-gray-500">File Available</span>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setShowEmergencyModal(true)}
                    className="flex items-center justify-center space-x-2 p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group"
                  >
                    <Zap className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-gray-900">Grant Emergency Access</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a file to manage</h3>
              <p className="text-gray-500">Choose a file from the search results to view details and available actions</p>
              {hasSearched && searchResults.length > 0 && (
                <p className="text-sm text-green-600 mt-2">
                  {searchResults.length} file{searchResults.length !== 1 ? 's' : ''} found - click on one to get started
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Unlock File Modal */}
      {showUnlockModal && selectedFile && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Unlock className="h-5 w-5 text-red-500 mr-2" />
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
                <p className="text-sm text-gray-900">{selectedFile.fileName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Currently Locked By</label>
                <p className="text-sm text-gray-900">{selectedFile.lockedBy?.name} ({selectedFile.lockedBy?.id})</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Notes for Unlocking *</label>
                <textarea
                  value={unlockNotes}
                  onChange={(e) => setUnlockNotes(e.target.value)}
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
                onClick={handleUnlockFile}
                disabled={!unlockNotes.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Access Modal */}
      {showEmergencyModal && selectedFile && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Zap className="h-5 w-5 text-orange-500 mr-2" />
                Grant Emergency Access
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                <p className="text-sm text-orange-800">
                  <strong>Emergency Access:</strong> This will grant temporary 24-hour access that bypasses normal approval processes.
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">File</label>
                <p className="text-sm text-gray-900">{selectedFile.fileName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Business Justification *</label>
                <textarea
                  value={emergencyReason}
                  onChange={(e) => setEmergencyReason(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Explain the urgent business need for emergency access..."
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEmergencyAccess}
                disabled={!emergencyReason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Grant Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManagement;