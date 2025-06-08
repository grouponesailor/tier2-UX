export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'helpdesk' | 'employee';
  department: string;
  lastLogin: Date;
  active: boolean;
  permissions?: string[];
}

export interface FilePermission {
  id: string;
  filePath: string;
  fileName: string;
  owner: User;
  permissions: {
    read: string[];
    write: string[];
    edit: string[];
    delete: string[];
  };
  inherited: boolean;
  inheritedFrom?: string;
  lastModified: Date;
  modifiedBy: User;
  size: number;
  location: string;
}

export interface PermissionHistory {
  id: string;
  filePath: string;
  action: 'granted' | 'revoked' | 'modified' | 'emergency_access';
  user: User;
  permissions: string[];
  timestamp: Date;
  requestedBy: User;
  approved: boolean;
  approvedBy?: User;
  reason?: string;
  duration?: number; // for temporary access
}

export interface FileLock {
  id: string;
  filePath: string;
  fileName: string;
  lockedBy: User;
  lockType: 'read' | 'write' | 'exclusive';
  duration: number;
  startTime: Date;
  estimatedEnd?: Date;
  reason?: string;
  canRelease: boolean;
  lastActivity: Date;
  isStuck: boolean;
}

export interface FileVersion {
  id: string;
  filePath: string;
  version: string;
  size: number;
  createdBy: User;
  createdAt: Date;
  changes: string;
  restorable: boolean;
  backupLocation: string;
}

export interface AuditLog {
  id: string;
  action: string;
  resource: string;
  user: User;
  timestamp: Date;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'permission' | 'access' | 'lock' | 'version' | 'security' | 'emergency';
  zone: 'admin' | 'helpdesk';
}

export interface ApprovalRequest {
  id: string;
  type: 'permission_change' | 'file_restore' | 'lock_release' | 'emergency_access' | 'file_move';
  requestedBy: User;
  resource: string;
  description: string;
  justification: string;
  status: 'pending' | 'approved' | 'rejected';
  assignedTo?: User;
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: User;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  zone: 'admin' | 'helpdesk';
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  reportedBy: User;
  assignedTo?: User;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'file_access' | 'file_locked' | 'file_missing' | 'permission_issue' | 'other';
  createdAt: Date;
  resolvedAt?: Date;
  resolution?: string;
  relatedFiles: string[];
}

export interface SystemAlert {
  id: string;
  type: 'stuck_lock' | 'unusual_activity' | 'failed_access' | 'storage_issue';
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  resource?: string;
  user?: User;
  timestamp: Date;
  acknowledged: boolean;
  resolvedBy?: User;
}