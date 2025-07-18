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
import { he } from 'date-fns/locale';

const FileRecovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoreReason, setRestoreReason] = useState('');

  const mockFileVersions = [
    {
      id: '1',
      filePath: '/כספים/תקציב-2024.xlsx',
      fileName: 'תקציב-2024.xlsx',
      version: '3.2',
      size: 2048576,
      createdBy: { name: 'יוחנן שמיט', email: 'john.smith@company.com' },
      createdAt: new Date('2024-01-15T10:00:00'),
      changes: 'עודכנו תחזיות רבעון ראשון והוספו קטגוריות תקציב חדשות',
      restorable: true,
      backupLocation: 'backup-server-01:/backups/finance/',
      currentVersion: false
    },
    {
      id: '2',
      filePath: '/כספים/תקציב-2024.xlsx',
      fileName: 'תקציב-2024.xlsx',
      version: '3.1',
      size: 1987654,
      createdBy: { name: 'שרה וילסון', email: 'sarah.wilson@company.com' },
      createdAt: new Date('2024-01-10T14:30:00'),
      changes: 'תוקנו שגיאות חישוב בסכומי מחלקות',
      restorable: true,
      backupLocation: 'backup-server-01:/backups/finance/',
      currentVersion: false
    },
    {
      id: '3',
      filePath: '/שיווק/קמפיין-2024.pptx',
      fileName: 'קמפיין-2024.pptx',
      version: '2.0',
      size: 5432100,
      createdBy: { name: 'מיכאל יוחנן', email: 'mike.johnson@company.com' },
      createdAt: new Date('2024-01-12T09:15:00'),
      changes: 'נוספו שקפים חדשים לקמפיין השקת מוצר',
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
    const sizes = ['בתים', 'ק"ב', 'מ"ב', 'ג"ב'];
    if (bytes === 0) return '0 בתים';
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
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">מרכז שחזור קבצים</h2>
            <p className="text-sm text-gray-500 mt-1">שחזור גרסאות קודמות של קבצים ושחזור קבצים שנמחקו</p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">כל הגרסאות</option>
            <option value="restorable">ניתנות לשחזור</option>
            <option value="current">גרסאות נוכחיות</option>
          </select>
          
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="חיפוש קבצים, גרסאות או משתמשים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">סך הגרסאות</p>
              <p className="text-2xl font-bold text-gray-900">{mockFileVersions.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">ניתנות לשחזור</p>
              <p className="text-2xl font-bold text-gray-900">{mockFileVersions.filter(v => v.restorable).length}</p>
            </div>
            <RotateCcw className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">שוחזרו היום</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">תורמים</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <User className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* File Versions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">גרסאות קבצים</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תאריך
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  גודל
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  נוצר על ידי
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  שינויים
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  קובץ וגרסה
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVersions.map((version) => (
                <tr key={version.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      {version.restorable && !version.currentVersion && (
                        <button
                          onClick={() => {
                            setSelectedVersion(version);
                            setShowRestoreModal(true);
                          }}
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <span className="mr-1">שחזר</span>
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <span className="mr-1">הורד</span>
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      {version.currentVersion ? (
                        <>
                          <span className="text-sm text-blue-600 mr-2">נוכחי</span>
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        </>
                      ) : version.restorable ? (
                        <>
                          <span className="text-sm text-green-600 mr-2">ניתן לשחזור</span>
                          <RotateCcw className="h-4 w-4 text-green-500" />
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-gray-600 mr-2">בארכיון</span>
                          <AlertCircle className="h-4 w-4 text-gray-500" />
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 text-right">
                      {format(version.createdAt, 'MMM d, yyyy', { locale: he })}
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      {formatDistanceToNow(version.createdAt, { locale: he })} לפני
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    {formatFileSize(version.size)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <div className="mr-3 text-right">
                        <div className="text-sm text-gray-500">{version.createdBy.email}</div>
                        <div className="text-sm font-medium text-gray-900">{version.createdBy.name}</div>
                      </div>
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {version.createdBy.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs text-right">
                      {version.changes}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {version.fileName}
                        </div>
                        <div className="text-sm text-gray-500">
                          גרסה {version.version}
                        </div>
                        <div className="text-xs text-gray-400 truncate max-w-xs">
                          {version.filePath}
                        </div>
                      </div>
                      <FileText className="h-8 w-8 text-green-600 mr-3" />
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
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full" dir="rtl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <span>שחזור גרסת קובץ</span>
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-sm text-yellow-800">
                  <strong>אזהרה:</strong> שחזור גרסה זו ייצור גרסה חדשה ועלול להשפיע על משתמשים שעובדים כעת עם הקובץ.
                </p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-500">קובץ</label>
                <p className="text-sm text-gray-900">{selectedVersion.fileName}</p>
                <p className="text-xs text-gray-500">{selectedVersion.filePath}</p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-500">גרסה לשחזור</label>
                <p className="text-sm text-gray-900">גרסה {selectedVersion.version}</p>
                <p className="text-xs text-gray-500">נוצר {format(selectedVersion.createdAt, 'PPpp', { locale: he })}</p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-500">שינויים</label>
                <p className="text-sm text-gray-900">{selectedVersion.changes}</p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-500">מיקום גיבוי</label>
                <p className="text-sm text-gray-900 font-mono text-xs">{selectedVersion.backupLocation}</p>
              </div>
              
              <div className="text-right">
                <label className="text-sm font-medium text-gray-700">סיבה לשחזור *</label>
                <textarea
                  value={restoreReason}
                  onChange={(e) => setRestoreReason(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right"
                  placeholder="הסבר מדוע יש צורך לשחזר גרסה זו..."
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-start space-x-3">
              <button
                onClick={handleRestore}
                disabled={!restoreReason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                שחזר גרסה
              </button>
              <button
                onClick={() => setShowRestoreModal(false)}
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

export default FileRecovery;