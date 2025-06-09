import React, { useState, useEffect } from 'react';
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
  HardDrive,
  RefreshCw,
  ShieldCheck,
  Eye,
  Users,
  Database
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import { apiService, FileSearchResult } from '../../services/api.service';

const FileManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<FileSearchResult[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileSearchResult | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [unlockReason, setUnlockReason] = useState('');
  const [emergencyReason, setEmergencyReason] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Replace mock search with API call
  const handleSearch = async (term?: string) => {
    const searchQuery = term || searchTerm;
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setApiError(null);

    try {
      console.log('Help desk searching for:', searchQuery);
      const response = await apiService.searchFiles(searchQuery);
      console.log('Help desk search response:', response);
      
      if (response.success) {
        // Ensure we always have an array
        const results = Array.isArray(response.data) ? response.data : [];
        console.log('Setting help desk search results:', results);
        setSearchResults(results);
        setHasSearched(true);
        setSelectedFile(null);
      } else {
        console.error('Help desk search failed:', response.error);
        setApiError(response.error || 'Failed to search files');
        setSearchResults([]);
        setHasSearched(true);
      }
    } catch (error) {
      console.error('Help desk search error:', error);
      setApiError('Network error occurred while searching');
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchWithTerm = async (term: string) => {
    await handleSearch(term);
  };

  const handleUnlockFile = async () => {
    if (!selectedFile || !unlockReason.trim()) return;

    setIsLoading(true);
    setApiError(null);

    try {
      const response = await apiService.unlockFile(selectedFile.id, unlockReason);
      
      if (response.success) {
        // Refresh search results after successful unlock
        await handleSearch();
        setShowUnlockModal(false);
        setUnlockReason('');
        setSelectedFile(null);
      } else {
        setApiError(response.error || 'Failed to unlock file');
      }
    } catch (error) {
      console.error('Unlock error:', error);
      setApiError('Network error occurred while unlocking file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmergencyAccess = () => {
    if (!emergencyReason.trim()) return;
    
    setShowEmergencyModal(false);
    setEmergencyReason('');
    setShowSuccessMessage(true);
    
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const searchExamples = [
    'תקציב', 'חוזה', 'עובד', 'EMP001', 'מיכאל יוחנן', 'sarah.wilson@company.com'
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Error Display */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 ml-3" />
            <p className="text-red-800 font-medium">שגיאה: {apiError}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 ml-3" />
            <p className="text-green-800 font-medium">הקובץ שוחרר בהצלחה!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">מרכז ניהול קבצים</h2>
            <p className="text-sm text-gray-500 mt-1">חיפוש קבצים או עובדים לניהול גישה ופתרון בעיות</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex rtl-space-x-4">
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                חיפוש
              </button>
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="הזן שם קובץ/מזהה או שם עובד/מספר..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg text-right"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">נסה לחפש:</span>
              {searchExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(example);
                    // Trigger search with the example term
                    handleSearchWithTerm(example);
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Results */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                תוצאות חיפוש
                {Array.isArray(searchResults) && searchResults.length > 0 && (
                  <span className="mr-2 text-sm text-gray-500">({searchResults.length} נמצאו)</span>
                )}
              </h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {!hasSearched ? (
                <div className="p-6 text-center text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium mb-2">מוכן לחיפוש</p>
                  <p className="text-sm">הזן שם קובץ, שם עובד או מזהה כדי להתחיל</p>
                </div>
              ) : !Array.isArray(searchResults) || searchResults.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium mb-2">לא נמצאו תוצאות</p>
                  <p className="text-sm">נסה מונח חיפוש אחר או בדוק את האיות</p>
                </div>
              ) : (
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">סטטוס</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">גודל</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">מחלקה</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">מזהה בעלים</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">שם בעלים</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">שם קובץ</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(Array.isArray(searchResults) ? searchResults : []).map((file) => (
                      <tr
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                        className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedFile?.id === file.id ? 'bg-green-50' : ''
                        }`}
                      >
                        <td className="px-3 py-2 whitespace-nowrap">
                          {file.status === 'active' ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              זמין
                              <Unlock className="h-3 w-3 mr-1" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              נעול
                              <Lock className="h-3 w-3 mr-1" />
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">{file.size}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">{file.department}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-right">{file.owner?.employeeId || 'לא זמין'}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-blue-600 text-right">{file.owner?.name || 'לא זמין'}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{file.fileName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  <div className="flex items-center rtl-space-x-2">
                    {selectedFile.isLocked ? (
                      <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        קובץ נעול
                        <Lock className="h-4 w-4 mr-2" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        זמין
                        <CheckCircle className="h-4 w-4 mr-2" />
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center rtl-space-x-4 text-right">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedFile.fileName}</h3>
                      <p className="text-gray-600 mt-1">{selectedFile.filePath}</p>
                      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                        <div className="text-right">
                          <span className="ml-1 text-gray-900">{selectedFile.lastAccessed ? formatDistanceToNow(selectedFile.lastAccessed, { locale: he }) + ' לפני' : 'לא ידוע'}</span>
                          <span className="text-gray-500">:גישה אחרונה</span>
                        </div>
                        <div className="text-right">
                          <span className="ml-1 text-gray-900">{selectedFile.department}</span>
                          <span className="text-gray-500">:מחלקה</span>
                        </div>
                        <div className="text-right">
                          <span className="ml-1 text-gray-900">{selectedFile.owner}</span>
                          <span className="text-gray-500">:בעלים</span>
                        </div>
                        <div className="text-right">
                          <span className="ml-1 text-gray-900">{selectedFile.size}</span>
                          <span className="text-gray-500">:גודל</span>
                        </div>
                      </div>
                    </div>
                    <FileText className="h-16 w-16 text-green-600" />
                  </div>
                </div>

                {/* File Location */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-2">:מיקום אחסון</span>
                    <HardDrive className="h-4 w-4 text-gray-500 mr-2" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-mono text-right">{selectedFile.location}</p>
                </div>

                {selectedFile.isLocked && selectedFile.lockedBy && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-1 text-right">
                        <p className="text-sm font-medium text-yellow-800">
                          קובץ נעול על ידי {selectedFile.lockedBy.name}
                        </p>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-yellow-700">
                          <div className="text-right">
                            <span>{selectedFile.lockStartTime ? format(selectedFile.lockStartTime, 'MMM d, HH:mm', { locale: he }) : 'לא ידוע'}</span>
                            <span className="font-medium"> :נעול מאז</span>
                          </div>
                          <div className="text-right">
                            <span>{selectedFile.lockDuration}</span>
                            <span className="font-medium"> :משך נעילה</span>
                          </div>
                          <div className="text-right">
                            <span>{selectedFile.lockedBy.id}</span>
                            <span className="font-medium"> :מזהה עובד</span>
                          </div>
                          <div className="text-right">
                            <span>{selectedFile.lockedBy.email}</span>
                            <span className="font-medium"> :אימייל</span>
                          </div>
                        </div>
                      </div>
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Menu */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <span>פעולות זמינות</span>
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedFile.isLocked ? (
                    <button
                      onClick={() => setShowUnlockModal(true)}
                      className="flex items-center justify-center rtl-space-x-2 p-4 border-2 border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all duration-200 group"
                    >
                      <span className="font-medium text-gray-900">שחרר קובץ</span>
                      <Unlock className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform" />
                    </button>
                  ) : (
                    <div className="flex items-center justify-center rtl-space-x-2 p-4 border-2 border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed">
                      <span className="font-medium text-gray-500">קובץ זמין</span>
                      <CheckCircle className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  
                  <button
                    onClick={() => setShowEmergencyModal(true)}
                    className="flex items-center justify-center rtl-space-x-2 p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group"
                  >
                    <span className="font-medium text-gray-900">מתן גישת חירום</span>
                    <Zap className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">בחר קובץ לניהול</h3>
              <p className="text-gray-500">בחר קובץ מתוצאות החיפוש כדי לראות פרטים ופעולות זמינות</p>
              {hasSearched && searchResults.length > 0 && (
                <p className="text-sm text-green-600 mt-2">
                  נמצאו {searchResults.length} קבצים - לחץ על אחד כדי להתחיל
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Unlock File Modal */}
      {showUnlockModal && selectedFile && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full" dir="rtl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <span>שחרור קובץ</span>
                <Unlock className="h-5 w-5 text-red-500 mr-2" />
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-sm text-yellow-800">
                  <strong>אזהרה:</strong> שחרור הקובץ יודיע למשתמש הנוכחי ועלול להפריע לעבודתו.
                </p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-500">קובץ</label>
                <p className="text-sm text-gray-900">{selectedFile.fileName}</p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-500">נעול כעת על ידי</label>
                <p className="text-sm text-gray-900">{selectedFile.lockedBy?.name} ({selectedFile.lockedBy?.id})</p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-700">הערות לשחרור *</label>
                <textarea
                  value={unlockReason}
                  onChange={(e) => setUnlockReason(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right"
                  placeholder="הסבר מדוע יש צורך לשחרר את הקובץ..."
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-start rtl-space-x-3">
              <button
                onClick={handleUnlockFile}
                disabled={!unlockReason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                אשר שחרור
              </button>
              <button
                onClick={() => setShowUnlockModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Access Modal */}
      {showEmergencyModal && selectedFile && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full" dir="rtl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <span>מתן גישת חירום</span>
                <Zap className="h-5 w-5 text-orange-500 mr-2" />
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                <p className="text-sm text-orange-800">
                  <strong>גישת חירום:</strong> פעולה זו תעניק גישה זמנית ל-24 שעות שעוקפת תהליכי אישור רגילים.
                </p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-500">קובץ</label>
                <p className="text-sm text-gray-900">{selectedFile.fileName}</p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-700">הצדקה עסקית *</label>
                <textarea
                  value={emergencyReason}
                  onChange={(e) => setEmergencyReason(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right"
                  placeholder="הסבר את הצורך העסקי הדחוף לגישת חירום..."
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-start rtl-space-x-3">
              <button
                onClick={handleEmergencyAccess}
                disabled={!emergencyReason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                מתן גישה
              </button>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManagement;