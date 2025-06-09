import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Shield,
  UserCheck,
  UserX,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { apiService, UserInfo } from '../../services/api.service';

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await apiService.getUsers();
      
      if (response.success) {
        setUsers(response.data);
      } else {
        setApiError(response.error || 'Failed to load users');
      }
    } catch (error) {
      console.error('Load users error:', error);
      setApiError('Network error occurred while loading users');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const mockUsers = [
    {
      id: '1',
      name: 'יוחנן דוד',
      email: 'john.doe@company.com',
      role: 'admin',
      department: 'אבטחת מידע',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00',
      permissions: ['ניהול_משתמשים', 'הגדרות_מערכת', 'מדיניות_אבטחה']
    },
    {
      id: '2',
      name: 'שרה וילסון',
      email: 'sarah.wilson@company.com',
      role: 'helpdesk',
      department: 'תמיכה טכנית',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00',
      permissions: ['חקירת_קבצים', 'ניהול_נעילות', 'גישת_חירום']
    },
    {
      id: '3',
      name: 'מיכאל יוחנן',
      email: 'mike.johnson@company.com',
      role: 'employee',
      department: 'כספים',
      status: 'active',
      lastLogin: '2024-01-14T16:45:00',
      permissions: ['גישה_לקבצים']
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'helpdesk':
        return 'bg-green-100 text-green-800';
      case 'employee':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'inactive':
        return 'text-red-600 bg-red-50';
      case 'suspended':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'מנהל';
      case 'helpdesk':
        return 'תמיכה';
      case 'employee':
        return 'עובד';
      default:
        return 'לא ידוע';
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">ניהול משתמשים</h2>
            <p className="text-sm text-gray-500 mt-1">ניהול חשבונות משתמשים, תפקידים והרשאות</p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <span>הוסף משתמש</span>
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">כל התפקידים</option>
            <option value="admin">מנהל</option>
            <option value="helpdesk">תמיכה</option>
            <option value="employee">עובד</option>
          </select>
          
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="חיפוש משתמשים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">סך המשתמשים</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">משתמשים פעילים</p>
              <p className="text-2xl font-bold text-gray-900">1,198</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">מנהלים</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">לא פעילים</p>
              <p className="text-2xl font-bold text-gray-900">49</p>
            </div>
            <UserX className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">משתמשים</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  כניסה אחרונה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מחלקה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תפקיד
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  משתמש
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    {new Date(user.lastLogin).toLocaleDateString('he-IL')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <span className="text-sm text-gray-900 capitalize mr-2">
                        {user.status === 'active' ? 'פעיל' : 'לא פעיל'}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    {user.department}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleText(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <div className="mr-3 text-right">
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;