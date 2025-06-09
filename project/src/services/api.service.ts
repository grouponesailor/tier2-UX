// API Service for external backend communication
// Use proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.DEV ? '/api' : 'http://desktop-ejm27ku:5000';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface FileSearchRequest {
  q: string;
  filters?: string;
  sort?: Array<{
    field: string;
    order: string;
  }>;
  system?: string;
  uuid?: string;
}

export interface FileSearchResult {
  id: string;
  fileName: string;
  filePath: string;
  absolutePath: string;
  serverLocation: string;
  networkPath: string;
  size: string;
  owner: {
    name: string;
    employeeId: string;
  };
  creator: {
    name: string;
    employeeId: string;
  };
  department: string;
  status: 'active' | 'archived' | 'deleted' | 'deleted_permanently';
  lastModified: Date;
  modifiedBy: string;
  createdAt: Date;
  permissions: {
    view: string[];
    edit: string[];
    admin: string[];
  };
  recentViews: Array<{
    user: string;
    employeeId: string;
    time: Date;
    action: string;
    ip: string;
    duration: string;
  }>;
  recentChanges: Array<{
    user: string;
    employeeId: string;
    time: Date;
    change: string;
    version: string;
  }>;
  activityLog: Array<{
    user: string;
    employeeId: string;
    action: string;
    time: Date;
    details: string;
    ip: string;
  }>;
  versions: Array<{
    version: string;
    date: Date;
    user: string;
    employeeId: string;
    size: string;
    changes: string;
  }>;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'helpdesk' | 'employee';
  department: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: Date;
  permissions: string[];
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  reportedBy: {
    name: string;
    email: string;
    department: string;
  };
  assignedTo?: {
    name: string;
    email: string;
  };
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'file_access' | 'file_locked' | 'file_missing' | 'permissions' | 'other';
  createdAt: Date;
  resolvedAt?: Date;
  resolution?: string;
  relatedFiles: string[];
  lastUpdate: Date;
}

export interface FileVersion {
  id: string;
  filePath: string;
  fileName: string;
  version: string;
  size: number;
  createdBy: {
    name: string;
    email: string;
  };
  createdAt: Date;
  changes: string;
  restorable: boolean;
  backupLocation: string;
  currentVersion: boolean;
}

class ApiService {
  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      console.log(`Making API request to: ${API_BASE_URL}${endpoint}`);
      console.log('Request options:', options);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Transform the response to match our ApiResponse interface
      return {
        success: true,
        data: this.parseResponseData(data),
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private parseResponseData(data: any): any {
    console.log('Parsing response data:', data);
    
    // Handle different response structures
    if (data && typeof data === 'object') {
      // If the response has a hits property, use that (common in search APIs)
      if (data.hits !== undefined) {
        const parsed = this.parseDataArray(data.hits);
        console.log('Parsed hits data:', parsed);
        return parsed;
      }
      // If the response has a data property, use that
      if (data.data !== undefined) {
        const parsed = this.parseDataArray(data.data);
        console.log('Parsed data property:', parsed);
        return parsed;
      }
      // If the response has a results property, use that
      if (data.results !== undefined) {
        const parsed = this.parseDataArray(data.results);
        console.log('Parsed results property:', parsed);
        return parsed;
      }
      // If the response has an items property, use that
      if (data.items !== undefined) {
        const parsed = this.parseDataArray(data.items);
        console.log('Parsed items property:', parsed);
        return parsed;
      }
      // If the response is directly an array
      if (Array.isArray(data)) {
        const parsed = this.parseDataArray(data);
        console.log('Parsed direct array:', parsed);
        return parsed;
      }
      // Otherwise, assume it's a single object
      const parsed = this.parseItemDates(data);
      console.log('Parsed single object:', parsed);
      return parsed;
    }
    
    // Fallback to original data or empty array for safety
    console.log('Fallback to original data:', data);
    return data || [];
  }

  private parseDataArray(data: any): any {
    console.log('parseDataArray input:', data, 'type:', typeof data, 'isArray:', Array.isArray(data));
    
    if (Array.isArray(data)) {
      const parsed = data.map(item => this.parseItemDates(item));
      console.log('parseDataArray - parsed array:', parsed);
      return parsed;
    } else if (data && typeof data === 'object') {
      const parsed = this.parseItemDates(data);
      console.log('parseDataArray - parsed object:', parsed);
      return parsed;
    }
    
    console.log('parseDataArray - returning original data or empty array:', data);
    return data || [];
  }

  private parseItemDates(item: any): any {
    if (typeof item !== 'object' || item === null) return item;

    const dateFields = ['lastModified', 'createdAt', 'time', 'date', 'lastLogin', 'resolvedAt', 'lastUpdate'];
    const parsed = { ...item };

    for (const field of dateFields) {
      if (parsed[field] && typeof parsed[field] === 'string') {
        parsed[field] = new Date(parsed[field]);
      }
    }

    // Parse nested arrays
    if (parsed.recentViews) {
      parsed.recentViews = parsed.recentViews.map((view: any) => this.parseItemDates(view));
    }
    if (parsed.recentChanges) {
      parsed.recentChanges = parsed.recentChanges.map((change: any) => this.parseItemDates(change));
    }
    if (parsed.activityLog) {
      parsed.activityLog = parsed.activityLog.map((log: any) => this.parseItemDates(log));
    }
    if (parsed.versions) {
      parsed.versions = parsed.versions.map((version: any) => this.parseItemDates(version));
    }

    return parsed;
  }

  // File Management APIs
  async searchFiles(
    searchTerm: string, 
    filters?: string, 
    system?: string, 
    uuid?: string
  ): Promise<ApiResponse<FileSearchResult[]>> {
    const requestBody: FileSearchRequest = {
      q: searchTerm,
      filters: filters || '',
      sort: [
        {
          field: 'lastModified',
          order: 'desc'
        }
      ],
      system: system || 'file-access-help-desk',
      uuid: uuid || this.generateUUID()
    };

    console.log('Sending file search request:', requestBody);

    return this.makeRequest<FileSearchResult[]>('/files', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async getFileDetails(fileId: string): Promise<ApiResponse<FileSearchResult>> {
    return this.makeRequest<FileSearchResult>(`/files/${fileId}`);
  }

  async unlockFile(fileId: string, reason: string): Promise<ApiResponse<boolean>> {
    return this.makeRequest<boolean>(`/files/${fileId}/unlock`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async grantEmergencyAccess(fileId: string, userId: string, reason: string): Promise<ApiResponse<boolean>> {
    return this.makeRequest<boolean>(`/files/${fileId}/emergency-access`, {
      method: 'POST',
      body: JSON.stringify({ userId, reason }),
    });
  }

  // User Management APIs
  async getUsers(filters?: { role?: string; department?: string; status?: string }): Promise<ApiResponse<UserInfo[]>> {
    const queryParams = new URLSearchParams();
    if (filters?.role) queryParams.append('role', filters.role);
    if (filters?.department) queryParams.append('department', filters.department);
    if (filters?.status) queryParams.append('status', filters.status);
    
    const queryString = queryParams.toString();
    return this.makeRequest<UserInfo[]>(`/users${queryString ? `?${queryString}` : ''}`);
  }

  async createUser(user: Omit<UserInfo, 'id' | 'lastLogin'>): Promise<ApiResponse<UserInfo>> {
    return this.makeRequest<UserInfo>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async updateUser(userId: string, updates: Partial<UserInfo>): Promise<ApiResponse<UserInfo>> {
    return this.makeRequest<UserInfo>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteUser(userId: string): Promise<ApiResponse<boolean>> {
    return this.makeRequest<boolean>(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Support Tickets APIs
  async getTickets(filters?: { status?: string; priority?: string; assignedTo?: string }): Promise<ApiResponse<SupportTicket[]>> {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.priority) queryParams.append('priority', filters.priority);
    if (filters?.assignedTo) queryParams.append('assignedTo', filters.assignedTo);
    
    const queryString = queryParams.toString();
    return this.makeRequest<SupportTicket[]>(`/tickets${queryString ? `?${queryString}` : ''}`);
  }

  async createTicket(ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'lastUpdate'>): Promise<ApiResponse<SupportTicket>> {
    return this.makeRequest<SupportTicket>('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
  }

  async updateTicket(ticketId: string, updates: Partial<SupportTicket>): Promise<ApiResponse<SupportTicket>> {
    return this.makeRequest<SupportTicket>(`/tickets/${ticketId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // File Recovery APIs
  async getFileVersions(filePath: string): Promise<ApiResponse<FileVersion[]>> {
    return this.makeRequest<FileVersion[]>(`/files/versions?path=${encodeURIComponent(filePath)}`);
  }

  async restoreFileVersion(versionId: string, reason: string): Promise<ApiResponse<boolean>> {
    return this.makeRequest<boolean>(`/files/versions/${versionId}/restore`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Dashboard APIs
  async getDashboardStats(): Promise<ApiResponse<{
    totalFiles: number;
    lockedFiles: number;
    recentActivity: number;
    systemHealth: 'healthy' | 'warning' | 'critical';
    activeSessions: number;
    totalUsers: number;
    pendingTickets: number;
  }>> {
    return this.makeRequest('/dashboard/stats');
  }

  // System Health Check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: Date }>> {
    return this.makeRequest('/health');
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService; 