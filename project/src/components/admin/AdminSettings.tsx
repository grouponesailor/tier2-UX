import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Clock, 
  Database, 
  Bell,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Security Settings
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    
    // File Lock Settings
    defaultLockDuration: 60,
    maxLockDuration: 480,
    autoReleaseStuckLocks: true,
    stuckLockThreshold: 120,
    
    // Emergency Access Settings
    emergencyAccessMaxDuration: 24,
    emergencyAccessRequireApproval: true,
    emergencyAccessNotifyOwner: true,
    
    // System Settings
    auditLogRetention: 90,
    backupFrequency: 'daily',
    maintenanceWindow: '02:00',
    
    // Notification Settings
    emailNotifications: true,
    slackIntegration: false,
    smsAlerts: false
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Mock save implementation
  };

  const handleReset = () => {
    // Reset to defaults
    console.log('Resetting to defaults');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
            <p className="text-sm text-gray-500 mt-1">Configure system-wide settings and policies</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Security Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Password Length
              </label>
              <input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => setSettings({...settings, passwordMinLength: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="6"
                max="20"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.passwordRequireSpecialChars}
                onChange={(e) => setSettings({...settings, passwordRequireSpecialChars: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Require special characters in passwords
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="5"
                max="480"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Login Attempts
              </label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="3"
                max="10"
              />
            </div>
          </div>
        </div>

        {/* File Lock Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-600" />
            File Lock Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Lock Duration (minutes)
              </label>
              <input
                type="number"
                value={settings.defaultLockDuration}
                onChange={(e) => setSettings({...settings, defaultLockDuration: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                min="15"
                max="480"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Lock Duration (minutes)
              </label>
              <input
                type="number"
                value={settings.maxLockDuration}
                onChange={(e) => setSettings({...settings, maxLockDuration: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                min="60"
                max="1440"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.autoReleaseStuckLocks}
                onChange={(e) => setSettings({...settings, autoReleaseStuckLocks: e.target.checked})}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Auto-release stuck locks
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stuck Lock Threshold (minutes)
              </label>
              <input
                type="number"
                value={settings.stuckLockThreshold}
                onChange={(e) => setSettings({...settings, stuckLockThreshold: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                min="30"
                max="480"
              />
            </div>
          </div>
        </div>

        {/* Emergency Access Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
            Emergency Access Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Emergency Access Duration (hours)
              </label>
              <input
                type="number"
                value={settings.emergencyAccessMaxDuration}
                onChange={(e) => setSettings({...settings, emergencyAccessMaxDuration: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                min="1"
                max="72"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.emergencyAccessRequireApproval}
                onChange={(e) => setSettings({...settings, emergencyAccessRequireApproval: e.target.checked})}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Require manager approval for emergency access
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.emergencyAccessNotifyOwner}
                onChange={(e) => setSettings({...settings, emergencyAccessNotifyOwner: e.target.checked})}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Notify file owner of emergency access
              </label>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Database className="h-5 w-5 mr-2 text-purple-600" />
            System Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audit Log Retention (days)
              </label>
              <input
                type="number"
                value={settings.auditLogRetention}
                onChange={(e) => setSettings({...settings, auditLogRetention: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                min="30"
                max="365"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Backup Frequency
              </label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maintenance Window
              </label>
              <input
                type="time"
                value={settings.maintenanceWindow}
                onChange={(e) => setSettings({...settings, maintenanceWindow: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-indigo-600" />
          Notification Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Email Notifications
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.slackIntegration}
              onChange={(e) => setSettings({...settings, slackIntegration: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Slack Integration
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.smsAlerts}
              onChange={(e) => setSettings({...settings, smsAlerts: e.target.checked})}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              SMS Alerts
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;