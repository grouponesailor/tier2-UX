import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { FileInfo } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  
  searchFiles(searchTerm: string): Observable<FileInfo[]> {
    // Mock search results based on search term
    const mockResults = this.getMockSearchResults(searchTerm);
    return of(mockResults).pipe(delay(500)); // Simulate API delay
  }

  unlockFile(fileId: string, notes: string): Observable<boolean> {
    console.log('Unlocking file:', fileId, 'Notes:', notes);
    return of(true).pipe(delay(1000));
  }

  grantEmergencyAccess(fileId: string, reason: string): Observable<boolean> {
    console.log('Granting emergency access:', fileId, 'Reason:', reason);
    return of(true).pipe(delay(1000));
  }

  private getMockSearchResults(term: string): FileInfo[] {
    const allFiles: FileInfo[] = [
      // Budget files
      {
        id: '1',
        fileName: 'budget-2024.xlsx',
        filePath: '/finance/budget-2024.xlsx',
        size: '2.4 MB',
        owner: 'Finance Team',
        department: 'Finance',
        isLocked: true,
        lockedBy: { name: 'Mike Johnson', email: 'mike.johnson@company.com', id: 'EMP001' },
        lockDuration: '2 days',
        lockStartTime: new Date('2024-01-13T10:00:00'),
        lastAccessed: new Date('2024-01-13T10:00:00'),
        location: 'Server: FS-01, Path: /data/finance/'
      },
      {
        id: '2',
        fileName: 'budget-2024-final.xlsx',
        filePath: '/finance/budget-2024-final.xlsx',
        size: '2.6 MB',
        owner: 'Finance Team',
        department: 'Finance',
        isLocked: false,
        lastAccessed: new Date('2024-01-15T14:30:00'),
        location: 'Server: FS-01, Path: /data/finance/'
      },
      {
        id: '3',
        fileName: 'budget-2024-backup.xlsx',
        filePath: '/finance/backup/budget-2024-backup.xlsx',
        size: '2.3 MB',
        owner: 'Finance Team',
        department: 'Finance',
        isLocked: true,
        lockedBy: { name: 'Sarah Wilson', email: 'sarah.wilson@company.com', id: 'EMP002' },
        lockDuration: '4 hours',
        lockStartTime: new Date('2024-01-15T09:00:00'),
        lastAccessed: new Date('2024-01-15T09:00:00'),
        location: 'Server: FS-02, Path: /backup/finance/'
      },
      // Contract files
      {
        id: '4',
        fileName: 'contract-2024-001.pdf',
        filePath: '/legal/contracts/contract-2024-001.pdf',
        size: '1.8 MB',
        owner: 'Legal Team',
        department: 'Legal',
        isLocked: true,
        lockedBy: { name: 'David Lee', email: 'david.lee@company.com', id: 'EMP003' },
        lockDuration: '1 day',
        lockStartTime: new Date('2024-01-14T15:00:00'),
        lastAccessed: new Date('2024-01-14T15:00:00'),
        location: 'Server: FS-03, Path: /data/legal/'
      },
      {
        id: '5',
        fileName: 'contract-template-2024.pdf',
        filePath: '/legal/templates/contract-template-2024.pdf',
        size: '1.2 MB',
        owner: 'Legal Team',
        department: 'Legal',
        isLocked: false,
        lastAccessed: new Date('2024-01-15T11:20:00'),
        location: 'Server: FS-03, Path: /data/legal/templates/'
      },
      {
        id: '6',
        fileName: 'contract-review-2024.docx',
        filePath: '/legal/reviews/contract-review-2024.docx',
        size: '890 KB',
        owner: 'Legal Team',
        department: 'Legal',
        isLocked: false,
        lastAccessed: new Date('2024-01-15T16:45:00'),
        location: 'Server: FS-03, Path: /data/legal/reviews/'
      },
      // Employee files
      {
        id: '7',
        fileName: 'employee-handbook.pdf',
        filePath: '/hr/documents/employee-handbook.pdf',
        size: '3.2 MB',
        owner: 'HR Team',
        department: 'Human Resources',
        isLocked: false,
        lastAccessed: new Date('2024-01-15T13:15:00'),
        location: 'Server: FS-04, Path: /data/hr/'
      },
      {
        id: '8',
        fileName: 'employee-data-2024.xlsx',
        filePath: '/hr/confidential/employee-data-2024.xlsx',
        size: '4.1 MB',
        owner: 'HR Team',
        department: 'Human Resources',
        isLocked: true,
        lockedBy: { name: 'Lisa Chen', email: 'lisa.chen@company.com', id: 'EMP004' },
        lockDuration: '6 hours',
        lockStartTime: new Date('2024-01-15T08:00:00'),
        lastAccessed: new Date('2024-01-15T08:00:00'),
        location: 'Server: FS-04, Path: /data/hr/confidential/'
      },
      {
        id: '9',
        fileName: 'employee-reviews-q4.docx',
        filePath: '/hr/reviews/employee-reviews-q4.docx',
        size: '2.7 MB',
        owner: 'HR Team',
        department: 'Human Resources',
        isLocked: false,
        lastAccessed: new Date('2024-01-14T17:30:00'),
        location: 'Server: FS-04, Path: /data/hr/reviews/'
      }
    ];

    // Filter files based on search term and return max 3 results
    return allFiles.filter(file =>
      file.fileName.toLowerCase().includes(term.toLowerCase()) ||
      file.filePath.toLowerCase().includes(term.toLowerCase()) ||
      (file.lockedBy && (
        file.lockedBy.name.toLowerCase().includes(term.toLowerCase()) ||
        file.lockedBy.id.toLowerCase().includes(term.toLowerCase())
      ))
    ).slice(0, 3);
  }
}