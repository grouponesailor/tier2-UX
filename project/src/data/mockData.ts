import { User, FilePermission, PermissionHistory, FileLock, FileVersion, AuditLog, ApprovalRequest } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    department: 'IT Security',
    lastLogin: new Date('2024-01-15T10:30:00'),
    active: true
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'support',
    department: 'Help Desk',
    lastLogin: new Date('2024-01-15T09:15:00'),
    active: true
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'viewer',
    department: 'Finance',
    lastLogin: new Date('2024-01-14T16:45:00'),
    active: true
  }
];

export const mockFilePermissions: FilePermission[] = [
  {
    id: '1',
    filePath: '/shared/finance/budget-2024.xlsx',
    fileName: 'budget-2024.xlsx',
    owner: mockUsers[0],
    permissions: {
      read: ['Finance Team', 'Executives'],
      write: ['Finance Admin'],
      execute: []
    },
    inherited: false,
    lastModified: new Date('2024-01-10T14:20:00'),
    modifiedBy: mockUsers[0]
  },
  {
    id: '2',
    filePath: '/projects/alpha/requirements.docx',
    fileName: 'requirements.docx',
    owner: mockUsers[1],
    permissions: {
      read: ['Project Alpha Team', 'Stakeholders'],
      write: ['Project Alpha Team'],
      execute: []
    },
    inherited: true,
    inheritedFrom: '/projects/alpha',
    lastModified: new Date('2024-01-12T11:30:00'),
    modifiedBy: mockUsers[1]
  }
];

export const mockPermissionHistory: PermissionHistory[] = [
  {
    id: '1',
    filePath: '/shared/finance/budget-2024.xlsx',
    action: 'granted',
    user: mockUsers[2],
    permissions: ['read'],
    timestamp: new Date('2024-01-15T08:45:00'),
    requestedBy: mockUsers[1],
    approved: true,
    approvedBy: mockUsers[0],
    reason: 'Quarterly review access'
  }
];

export const mockFileLocks: FileLock[] = [
  {
    id: '1',
    filePath: '/shared/contracts/contract-2024-001.pdf',
    fileName: 'contract-2024-001.pdf',
    lockedBy: mockUsers[2],
    lockType: 'write',
    duration: 45,
    startTime: new Date('2024-01-15T09:00:00'),
    estimatedEnd: new Date('2024-01-15T09:45:00'),
    reason: 'Contract revision in progress',
    canRelease: true
  }
];

export const mockFileVersions: FileVersion[] = [
  {
    id: '1',
    filePath: '/shared/policies/security-policy.docx',
    version: '2.1',
    size: 2048576,
    createdBy: mockUsers[0],
    createdAt: new Date('2024-01-15T10:00:00'),
    changes: 'Updated password requirements section',
    restorable: true
  },
  {
    id: '2',
    filePath: '/shared/policies/security-policy.docx',
    version: '2.0',
    size: 1987654,
    createdBy: mockUsers[0],
    createdAt: new Date('2024-01-10T14:30:00'),
    changes: 'Added multi-factor authentication guidelines',
    restorable: true
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'Permission Granted',
    resource: '/shared/finance/budget-2024.xlsx',
    user: mockUsers[0],
    timestamp: new Date('2024-01-15T08:45:00'),
    details: 'Read access granted to Finance Team',
    severity: 'medium',
    category: 'permission'
  },
  {
    id: '2',
    action: 'File Lock Released',
    resource: '/shared/contracts/contract-2024-001.pdf',
    user: mockUsers[1],
    timestamp: new Date('2024-01-15T10:15:00'),
    details: 'Lock released after completion of review',
    severity: 'low',
    category: 'lock'
  }
];

export const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: '1',
    type: 'permission_change',
    requestedBy: mockUsers[2],
    resource: '/shared/hr/employee-data.xlsx',
    description: 'Request write access for employee data updates',
    justification: 'Need to update employee records for quarterly review',
    status: 'pending',
    assignedTo: mockUsers[0],
    createdAt: new Date('2024-01-15T09:30:00'),
    priority: 'medium'
  }
];