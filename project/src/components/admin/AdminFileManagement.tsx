import React, { useState, useEffect } from 'react';
import { 
  Search, 
  FileText, 
  Eye, 
  Share2, 
  MoreHorizontal, 
  Users, 
  Clock, 
  Shield,
  Activity,
  Download,
  Edit,
  Trash2,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Settings,
  ArrowRight,
  ArrowLeft,
  History,
  UserCheck,
  Database,
  Folder,
  Copy,
  RotateCcw,
  AlertTriangle,
  HardDrive,
  Server,
  FolderOpen,
  Trash,
  RefreshCw
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import { apiService, FileSearchResult } from '../../services/api.service';

interface AdminFileManagementProps {
  initialSearchTerm?: string;
}

const AdminFileManagement: React.FC<AdminFileManagementProps> = ({ initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchResults, setSearchResults] = useState<FileSearchResult[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileSearchResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);

  // API call logic replaces mock data

  useEffect(() => {
    if (initialSearchTerm) {
      handleSearch(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  const handleSearch = async (term?: string) => {
    const searchQuery = term || searchTerm;
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setApiError(null);
    
    try {
      console.log('Searching for:', searchQuery);
      const response = await apiService.searchFiles(searchQuery);
      console.log('Search response:', response);
      
      if (response.success) {
        // Ensure we always have an array
        const results = Array.isArray(response.data) ? response.data : [];
        console.log('Setting search results:', results);
        setSearchResults(results);
        setHasSearched(true);
        setSelectedFile(null);
      } else {
        console.error('Search failed:', response.error);
        setApiError(response.error || 'Failed to search files');
        setSearchResults([]);
        setHasSearched(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setApiError('Network error occurred while searching');
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-yellow-100 text-yellow-800';
      case 'deleted':
        return 'bg-red-100 text-red-800';
      case 'deleted_permanently':
        return 'bg-red-200 text-red-900 border border-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'פעיל';
      case 'archived':
        return 'בארכיון';
      case 'deleted':
        return 'נמחק (30 יום)';
      case 'deleted_permanently':
        return 'נמחק לצמיתות';
      default:
        return 'לא ידוע';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'archived':
        return Clock;
      case 'deleted':
        return XCircle;
      case 'deleted_permanently':
        return Trash;
      default:
        return AlertCircle;
    }
  };

  const handleFileAction = (action: string) => {
    setActionType(action);
    setShowActionModal(true);
  };

  const executeFileAction = async () => {
    if (!selectedFile || !actionType || !actionReason.trim()) return;

    setIsLoading(true);
    setApiError(null);

    try {
      let response;
      
      switch (actionType) {
        case 'unlock':
          response = await apiService.unlockFile(selectedFile.id, actionReason);
          break;
        case 'emergency':
          // For emergency access, we'll need a user ID - this could be improved with user context
          response = await apiService.grantEmergencyAccess(selectedFile.id, 'current-user', actionReason);
          break;
        case 'restore':
          // For file restoration, we'd use the file recovery API
          // This assumes we have the version ID for restoration
          response = await apiService.restoreFileVersion(selectedFile.id, actionReason);
          break;
        default:
          console.warn('Unknown action type:', actionType);
          return;
      }

      if (response.success) {
        // Refresh file data after successful action
        await handleSearch();
        console.log('Action executed successfully:', {
          action: actionType,
          file: selectedFile.fileName,
          reason: actionReason
        });
      } else {
        setApiError(response.error || `Failed to execute ${actionType} action`);
      }
    } catch (error) {
      console.error('Action execution error:', error);
      setApiError(`Network error while executing ${actionType} action`);
    } finally {
      setIsLoading(false);
      setShowActionModal(false);
      setActionReason('');
    }
  };

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

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">ניהול קבצים</h2>
            <p className="text-sm text-gray-500 mt-1">חיפוש וניהול קבצים במערכת הארגונית</p>
          </div>
          
          <div className="flex rtl-space-x-4">
            <button
              onClick={() => handleSearch()}
              disabled={!searchTerm.trim() || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'מחפש...' : 'חיפוש'}
            </button>
            <div className="flex-1 relative max-w-md">
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="חיפוש קבצים לפי שם, מחלקה או בעלים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-right"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
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
              {isLoading ? (
                <div className="p-6 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="font-medium">מחפש קבצים...</p>
                </div>
              ) : !hasSearched ? (
                <div className="p-6 text-center text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium mb-2">מוכן לחיפוש</p>
                  <p className="text-sm">הזן שם קובץ או מחלקה כדי להתחיל</p>
                </div>
              ) : !Array.isArray(searchResults) || searchResults.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium mb-2">לא נמצאו תוצאות</p>
                  <p className="text-sm">נסה מונח חיפוש אחר</p>
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
                    {(Array.isArray(searchResults) ? searchResults : []).map((file) => {
                      const StatusIcon = getStatusIcon(file.status);
                      return (
                        <tr
                          key={file.id}
                          onClick={() => setSelectedFile(file)}
                          className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedFile?.id === file.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}>
                              <StatusIcon className="h-3 w-3 ml-1" />
                              {getStatusText(file.status)}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">{file.size}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">{file.department}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-right">{file.owner?.employeeId || 'לא זמין'}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-blue-600 text-right">{file.owner?.name || 'לא זמין'}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{file.fileName}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* File Details */}
        <div className="lg:col-span-2">
          {selectedFile ? (
            <div className="space-y-6">
              {/* File Overview */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* כותרת וסטטוס */}
                <div className="flex items-start justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedFile.status)}`}>
                    {React.createElement(getStatusIcon(selectedFile.status), { className: "h-4 w-4 ml-2" })}
                    {getStatusText(selectedFile.status)}
                  </span>
                  
                  <div className="text-right">
                    <h3 className="text-xl font-semibold text-gray-900">{selectedFile.fileName}</h3>
                    <p className="text-gray-600 mt-1">{selectedFile.filePath}</p>
                  </div>
                </div>

                {/* פעולות על הקובץ */}
                <div className="flex justify-center rtl-space-x-2 mb-6 p-4 bg-gray-50 rounded-lg">
                  <button 
                    onClick={() => handleFileAction('open')}
                    className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                    title="פתיחה"
                  >
                    <FolderOpen className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={() => handleFileAction('copy')}
                    className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                    title="שכפול"
                  >
                    <Copy className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={() => handleFileAction('download')}
                    className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" 
                    title="הורדה"
                  >
                    <Download className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={() => handleFileAction('share')}
                    className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" 
                    title="שיתוף"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>
                  
                  {/* פעולות מחיקה ושחזור */}
                  {selectedFile.status === 'active' && (
                    <>
                      <button 
                        onClick={() => handleFileAction('delete')}
                        className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="מחיקה"
                      >
                        <Trash2 className="h-6 w-6" />
                      </button>
                      <button 
                        onClick={() => handleFileAction('delete_permanent')}
                        className="p-3 text-gray-400 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors" 
                        title="מחיקה לצמיתות"
                      >
                        <Trash className="h-6 w-6" />
                      </button>
                    </>
                  )}
                  
                  {selectedFile.status === 'deleted_permanently' && (
                    <button 
                      onClick={() => handleFileAction('restore')}
                      className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                      title="שחזור"
                    >
                      <RotateCcw className="h-6 w-6" />
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleFileAction('settings')}
                    className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" 
                    title="הגדרות"
                  >
                    <Settings className="h-6 w-6" />
                  </button>
                </div>

                {/* סקירה כללית - יישור RTL */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-900">{selectedFile.size}</span>
                    <span className="text-gray-500">:גודל</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">{selectedFile.owner.name} ({selectedFile.owner.employeeId})</span>
                    <span className="text-gray-500">:בעלים</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">{selectedFile.creator.name} ({selectedFile.creator.employeeId})</span>
                    <span className="text-gray-500">:יוצר</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">{format(selectedFile.createdAt, 'dd/MM/yyyy HH:mm', { locale: he })}</span>
                    <span className="text-gray-500">:תאריך יצירה</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">{formatDistanceToNow(selectedFile.lastModified, { locale: he })} לפני</span>
                    <span className="text-gray-500">:שונה לאחרונה</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">{selectedFile.department}</span>
                    <span className="text-gray-500">:מחלקה</span>
                  </div>
                </div>

                {/* מיקום הקובץ במערכת */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center justify-end">
                    <span>מיקום הקובץ במערכת</span>
                    <HardDrive className="h-4 w-4 mr-2 text-gray-600" />
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-mono text-xs">{selectedFile.filePath}</span>
                      <span className="text-gray-500">:נתיב יחסי</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-mono text-xs">{selectedFile.absolutePath}</span>
                      <span className="text-gray-500">:נתיב מוחלט</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-mono text-xs">{selectedFile.serverLocation}</span>
                      <span className="text-gray-500">:שרת</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-mono text-xs">{selectedFile.networkPath}</span>
                      <span className="text-gray-500">:נתיב רשת</span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex rtl-space-x-8">
                    {[
                      { id: 'overview', name: 'סקירה כללית', icon: FileText },
                      { id: 'permissions', name: 'הרשאות', icon: Shield },
                      { id: 'activity', name: 'יומן פעילות', icon: Activity },
                      { id: 'views', name: 'צפיות אחרונות', icon: Eye },
                      { id: 'versions', name: 'גרסאות', icon: History }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center rtl-space-x-2 ${
                            activeTab === tab.id
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <span>{tab.name}</span>
                          <Icon className="h-4 w-4" />
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center justify-end">
                            <span>שינויים אחרונים</span>
                            <Clock className="h-4 w-4 mr-2 text-blue-600" />
                          </h4>
                          <div className="space-y-3">
                            {selectedFile.recentChanges.slice(0, 3).map((change: any, index: number) => (
                              <div key={index} className="text-sm border-b border-gray-200 pb-2 last:border-b-0">
                                <p className="text-gray-900 font-medium text-right">{change.change}</p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">v{change.version}</span>
                                  <p className="text-gray-500 text-xs text-right">
                                    {change.user} ({change.employeeId}) • {formatDistanceToNow(change.time, { locale: he })} לפני
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center justify-end">
                            <span>סטטיסטיקות גישה</span>
                            <Users className="h-4 w-4 mr-2 text-green-600" />
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-900 font-medium">{selectedFile.recentViews?.length || 0}</span>
                              <span className="text-gray-500">:צפיות השבוע</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-900 font-medium">{selectedFile.permissions?.view?.length || 0}</span>
                              <span className="text-gray-500">:משתמשים עם הרשאת צפייה</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-900 font-medium">{selectedFile.permissions?.edit?.length || 0}</span>
                              <span className="text-gray-500">:משתמשים עם הרשאת עריכה</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-900 font-medium">{selectedFile.permissions.admin.length}</span>
                              <span className="text-gray-500">:מנהלי קובץ</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'permissions' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-medium text-green-800 mb-3 flex items-center justify-end">
                            <span>הרשאות צפייה ({selectedFile.permissions.view.length})</span>
                            <Eye className="h-4 w-4 mr-2" />
                          </h4>
                          <div className="space-y-2">
                            {selectedFile.permissions.view.map((permission: string, index: number) => (
                              <div key={index} className="flex items-center justify-between">
                                <Settings className="h-3 w-3 text-green-600 hover:text-green-800 cursor-pointer" title="עריכת הרשאות" />
                                <span className="text-sm text-green-800">{permission}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-medium text-blue-800 mb-3 flex items-center justify-end">
                            <span>הרשאות עריכה ({selectedFile.permissions.edit.length})</span>
                            <Edit className="h-4 w-4 mr-2" />
                          </h4>
                          <div className="space-y-2">
                            {selectedFile.permissions.edit.map((permission: string, index: number) => (
                              <div key={index} className="flex items-center justify-between">
                                <Settings className="h-3 w-3 text-blue-600 hover:text-blue-800 cursor-pointer" title="עריכת הרשאות" />
                                <span className="text-sm text-blue-800">{permission}</span>
                              </div>
                            ))}
                            {selectedFile.permissions.edit.length === 0 && (
                              <span className="text-sm text-gray-500 italic text-right">אין הרשאות עריכה</span>
                            )}
                          </div>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4">
                          <h4 className="font-medium text-purple-800 mb-3 flex items-center justify-end">
                            <span>הרשאות ניהול ({selectedFile.permissions.admin.length})</span>
                            <Shield className="h-4 w-4 mr-2" />
                          </h4>
                          <div className="space-y-2">
                            {selectedFile.permissions.admin.map((permission: string, index: number) => (
                              <div key={index} className="flex items-center justify-between">
                                <Settings className="h-3 w-3 text-purple-600 hover:text-purple-800 cursor-pointer" title="עריכת הרשאות" />
                                <span className="text-sm text-purple-800">{permission}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'activity' && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 flex items-center justify-end">
                        <span>יומן פעילות מלא</span>
                        <Activity className="h-4 w-4 mr-2 text-blue-600" />
                      </h4>
                      <div className="space-y-3">
                        {selectedFile.activityLog.map((activity: any, index: number) => (
                          <div key={index} className="flex items-start rtl-space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1 text-right">
                              <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-500">
                                  <div>{format(activity.time, 'dd/MM/yyyy HH:mm', { locale: he })}</div>
                                  <div className="mt-1">IP: {activity.ip}</div>
                                </div>
                                <div className="flex items-center rtl-space-x-2 text-right">
                                  <span className="text-sm font-medium text-gray-900">{activity.action}</span>
                                  <span className="text-sm text-gray-600">{activity.user} ({activity.employeeId})</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1 text-right">{activity.details}</p>
                            </div>
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              activity.action.includes('ערך') ? 'bg-blue-500' :
                              activity.action.includes('פתח') ? 'bg-green-500' :
                              activity.action.includes('הורד') ? 'bg-purple-500' :
                              activity.action.includes('שמר') ? 'bg-orange-500' :
                              activity.action.includes('מחק') ? 'bg-red-500' :
                              'bg-gray-500'
                            }`}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'views' && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 flex items-center justify-end">
                        <span>צפיות אחרונות</span>
                        <Eye className="h-4 w-4 mr-2 text-green-600" />
                      </h4>
                      <div className="space-y-3">
                        {selectedFile.recentViews.map((view: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-500">
                              <div>{formatDistanceToNow(view.time, { locale: he })} לפני</div>
                              <div className="text-xs mt-1">IP: {view.ip}</div>
                              <div className="text-xs mt-1">משך: {view.duration}</div>
                            </div>
                            <div className="flex items-center rtl-space-x-3 text-right">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                view.action === 'עריכה' ? 'bg-blue-100 text-blue-800' :
                                view.action === 'הורדה' ? 'bg-purple-100 text-purple-800' :
                                view.action === 'שמירה' ? 'bg-orange-100 text-orange-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {view.action}
                              </span>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">{view.user}</div>
                                <div className="text-xs text-gray-500">({view.employeeId})</div>
                              </div>
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-medium">
                                  {view.user.split(' ').map((n: string) => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'versions' && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 flex items-center justify-end">
                        <span>היסטוריית גרסאות</span>
                        <History className="h-4 w-4 mr-2 text-purple-600" />
                      </h4>
                      {selectedFile.versions.length > 0 ? (
                        <div className="space-y-3">
                          {selectedFile.versions.map((version: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center rtl-space-x-2">
                                <RotateCcw className="h-4 w-4 text-blue-600 hover:text-blue-800 cursor-pointer" title="שחזר גרסה" />
                                <Download className="h-4 w-4 text-green-600 hover:text-green-800 cursor-pointer" title="הורד גרסה" />
                              </div>
                              <div className="text-right flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-gray-500">
                                    <div>{format(version.date, 'dd/MM/yyyy HH:mm', { locale: he })}</div>
                                    <div className="text-xs mt-1">{version.size}</div>
                                  </div>
                                  <div className="flex items-center rtl-space-x-2 text-right">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">v{version.version}</span>
                                    <div className="text-right">
                                      <div className="text-sm font-medium text-gray-900">{version.user}</div>
                                      <div className="text-xs text-gray-500">({version.employeeId})</div>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 text-right">{version.changes}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>אין גרסאות קודמות זמינות</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">בחר קובץ לצפייה מפורטת</h3>
              <p className="text-gray-500">בחר קובץ מתוצאות החיפוש כדי לראות פרטים מלאים, הרשאות ופעילות</p>
              {hasSearched && searchResults.length > 0 && (
                <p className="text-sm text-blue-600 mt-2">
                  נמצאו {searchResults.length} קבצים - לחץ על אחד כדי להתחיל
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full" dir="rtl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center justify-end">
                <span>
                  {actionType === 'restore' && 'שחזור קובץ'}
                  {actionType === 'delete' && 'מחיקת קובץ'}
                  {actionType === 'delete_permanent' && 'מחיקה לצמיתות'}
                  {actionType === 'copy' && 'שכפול קובץ'}
                  {actionType === 'open' && 'פתיחת קובץ'}
                  {actionType === 'download' && 'הורדת קובץ'}
                  {actionType === 'share' && 'שיתוף קובץ'}
                  {actionType === 'settings' && 'הגדרות קובץ'}
                </span>
                {actionType === 'restore' && <RotateCcw className="h-5 w-5 text-green-500 mr-2" />}
                {actionType === 'delete' && <Trash2 className="h-5 w-5 text-red-500 mr-2" />}
                {actionType === 'delete_permanent' && <Trash className="h-5 w-5 text-red-700 mr-2" />}
                {actionType === 'copy' && <Copy className="h-5 w-5 text-blue-500 mr-2" />}
                {actionType === 'open' && <FolderOpen className="h-5 w-5 text-green-500 mr-2" />}
                {actionType === 'download' && <Download className="h-5 w-5 text-purple-500 mr-2" />}
                {actionType === 'share' && <Share2 className="h-5 w-5 text-indigo-500 mr-2" />}
                {actionType === 'settings' && <Settings className="h-5 w-5 text-gray-500 mr-2" />}
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              {actionType === 'restore' && selectedFile?.status === 'deleted_permanently' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-sm text-green-800">
                    <strong>שחזור קובץ:</strong> הקובץ ישוחזר למיקום חדש במערכת ויהיה זמין לשימוש.
                  </p>
                </div>
              )}
              
              {(actionType === 'delete' || actionType === 'delete_permanent') && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-sm text-red-800">
                    <strong>אזהרה:</strong> {actionType === 'delete_permanent' ? 'מחיקה לצמיתות לא ניתנת לביטול!' : 'הקובץ יועבר לסל המחזור.'}
                  </p>
                </div>
              )}
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-500">:קובץ</label>
                <p className="text-sm text-gray-900">{selectedFile?.fileName}</p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-700">*סיבה לפעולה</label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                  placeholder={`הסבר מדוע יש צורך ב${
                    actionType === 'restore' ? 'שחזור' :
                    actionType === 'delete' ? 'מחיקת' :
                    actionType === 'delete_permanent' ? 'מחיקה לצמיתות של' :
                    actionType === 'copy' ? 'שכפול' :
                    actionType === 'open' ? 'פתיחת' :
                    actionType === 'download' ? 'הורדת' :
                    actionType === 'share' ? 'שיתוף' :
                    'עריכת'
                  } הקובץ...`}
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-start space-x-3">
              <button
                onClick={executeFileAction}
                disabled={!actionReason.trim()}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${
                  actionType === 'restore' ? 'bg-green-600 hover:bg-green-700' :
                  actionType === 'delete' || actionType === 'delete_permanent' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {actionType === 'restore' && 'שחזר קובץ'}
                {actionType === 'delete' && 'מחק קובץ'}
                {actionType === 'delete_permanent' && 'מחק לצמיתות'}
                {actionType === 'copy' && 'שכפל קובץ'}
                {actionType === 'open' && 'פתח קובץ'}
                {actionType === 'download' && 'הורד קובץ'}
                {actionType === 'share' && 'שתף קובץ'}
                {actionType === 'settings' && 'עדכן הגדרות'}
              </button>
              <button
                onClick={() => setShowActionModal(false)}
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

export default AdminFileManagement;