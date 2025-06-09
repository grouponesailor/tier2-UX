interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'helpdesk' | 'employee';
  department: string;
  lastLogin: Date;
  active: boolean;
}

export interface FileInfo {
  id: string;
  fileName: string;
  filePath: string;
  size: string;
  owner: string;
  department: string;
  isLocked: boolean;
  lockedBy?: {
    name: string;
    email: string;
    id: string;
  };
  lockDuration?: string;
  lockStartTime?: Date;
  lastAccessed: Date;
  location: string;
}

interface FileLock {
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

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  reportedBy: User;
  assignedTo?: User;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'file_access' | 'file_locked' | 'file_missing' | 'permission_issue';
  createdAt: Date;
  resolvedAt?: Date;
  resolution?: string;
  relatedFiles: string[];
}