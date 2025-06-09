import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../../services/file.service';
import { FileInfo } from '../../../models/file.model';
import { UnlockFileDialogComponent } from './unlock-file-dialog.component';
import { EmergencyAccessDialogComponent } from './emergency-access-dialog.component';

@Component({
  selector: 'app-file-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    UnlockFileDialogComponent,
    EmergencyAccessDialogComponent
  ],
  template: `
    <div class="file-management-container">
      <!-- Header -->
      <mat-card class="header-card">
        <mat-card-content>
          <div class="header-content">
            <div class="header-info">
              <h2>File Management Center</h2>
              <p>Search for files or employees to manage access and resolve issues</p>
            </div>
          </div>
          
          <!-- Search Bar -->
          <div class="search-section">
            <div class="search-bar">
              <mat-form-field appearance="outline" class="search-field">
                <mat-label>Enter file name/ID or employee name/number...</mat-label>
                <input matInput [(ngModel)]="searchTerm" (keyup.enter)="handleSearch()" placeholder="Enter file name/ID or employee name/number...">
                <mat-icon matSuffix>search</mat-icon>
              </mat-form-field>
              <button mat-raised-button color="primary" (click)="handleSearch()" [disabled]="isLoading">
                Search
              </button>
            </div>
            
            <!-- Search Examples -->
            <div class="search-examples">
              <span class="examples-label">Try searching for:</span>
              <button 
                *ngFor="let example of searchExamples" 
                class="search-example"
                (click)="searchExample(example)">
                {{ example }}
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Success Message -->
      <div *ngIf="showSuccessMessage" class="success-message">
        <mat-icon>check_circle</mat-icon>
        <span>Operation completed successfully! File status has been updated.</span>
      </div>

      <!-- Content Grid -->
      <div class="content-grid">
        <!-- Search Results -->
        <div class="results-section">
          <mat-card class="results-card">
            <mat-card-header>
              <mat-card-title>
                Search Results
                <span *ngIf="searchResults.length > 0" class="results-count">({{ searchResults.length }} found)</span>
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="results-content">
                <!-- Loading State -->
                <div *ngIf="isLoading" class="loading-state">
                  <mat-icon>hourglass_empty</mat-icon>
                  <p>Searching...</p>
                </div>

                <!-- No Search State -->
                <div *ngIf="!hasSearched && !isLoading" class="empty-state">
                  <mat-icon>search</mat-icon>
                  <p class="empty-title">Ready to search</p>
                  <p class="empty-subtitle">Enter a file name, employee name, or ID to get started</p>
                </div>

                <!-- No Results State -->
                <div *ngIf="hasSearched && searchResults.length === 0 && !isLoading" class="empty-state">
                  <mat-icon>search_off</mat-icon>
                  <p class="empty-title">No results found</p>
                  <p class="empty-subtitle">Try a different search term or check the spelling</p>
                </div>

                <!-- Results List -->
                <div *ngIf="searchResults.length > 0" class="results-list">
                  <div 
                    *ngFor="let file of searchResults" 
                    class="result-item"
                    [class.selected]="selectedFile?.id === file.id"
                    (click)="selectFile(file)">
                    <div class="file-icon">
                      <mat-icon>description</mat-icon>
                    </div>
                    <div class="file-info">
                      <h4>{{ file.fileName }}</h4>
                      <p class="file-path">{{ file.filePath }}</p>
                      <div class="file-meta">
                        <span>{{ file.size }}</span>
                        <span>•</span>
                        <span>{{ file.department }}</span>
                      </div>
                    </div>
                    <div class="file-status">
                      <div *ngIf="file.isLocked" class="status-badge locked">
                        <mat-icon>lock</mat-icon>
                        Locked
                      </div>
                      <div *ngIf="!file.isLocked" class="status-badge available">
                        <mat-icon>lock_open</mat-icon>
                        Available
                      </div>
                      <div *ngIf="file.lockDuration" class="lock-duration">{{ file.lockDuration }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- File Details -->
        <div class="details-section">
          <mat-card *ngIf="selectedFile" class="details-card">
            <!-- File Overview -->
            <mat-card-header>
              <div class="file-header">
                <mat-icon class="file-icon-large">description</mat-icon>
                <div class="file-title">
                  <h3>{{ selectedFile.fileName }}</h3>
                  <p>{{ selectedFile.filePath }}</p>
                </div>
                <div class="file-status-large">
                  <div *ngIf="selectedFile.isLocked" class="status-badge locked large">
                    <mat-icon>lock</mat-icon>
                    File Locked
                  </div>
                  <div *ngIf="!selectedFile.isLocked" class="status-badge available large">
                    <mat-icon>check_circle</mat-icon>
                    Available
                  </div>
                </div>
              </div>
            </mat-card-header>

            <mat-card-content>
              <!-- File Details -->
              <div class="file-details">
                <div class="detail-grid">
                  <div class="detail-item">
                    <span class="detail-label">Size:</span>
                    <span class="detail-value">{{ selectedFile.size }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Owner:</span>
                    <span class="detail-value">{{ selectedFile.owner }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Department:</span>
                    <span class="detail-value">{{ selectedFile.department }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Last accessed:</span>
                    <span class="detail-value">{{ getTimeAgo(selectedFile.lastAccessed) }}</span>
                  </div>
                </div>

                <!-- Storage Location -->
                <div class="location-info">
                  <div class="location-header">
                    <mat-icon>storage</mat-icon>
                    <span>Storage Location:</span>
                  </div>
                  <p class="location-path">{{ selectedFile.location }}</p>
                </div>

                <!-- Lock Information -->
                <div *ngIf="selectedFile.isLocked && selectedFile.lockedBy" class="lock-info">
                  <div class="lock-warning">
                    <mat-icon>warning</mat-icon>
                    <div class="lock-details">
                      <p class="lock-title">File locked by {{ selectedFile.lockedBy.name }}</p>
                      <div class="lock-meta">
                        <div class="lock-meta-item">
                          <span class="meta-label">Email:</span>
                          <span>{{ selectedFile.lockedBy.email }}</span>
                        </div>
                        <div class="lock-meta-item">
                          <span class="meta-label">Employee ID:</span>
                          <span>{{ selectedFile.lockedBy.id }}</span>
                        </div>
                        <div class="lock-meta-item">
                          <span class="meta-label">Lock Duration:</span>
                          <span>{{ selectedFile.lockDuration }}</span>
                        </div>
                        <div class="lock-meta-item">
                          <span class="meta-label">Locked Since:</span>
                          <span>{{ formatDate(selectedFile.lockStartTime) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Menu -->
              <div class="action-menu">
                <h4>
                  <mat-icon>shield</mat-icon>
                  Available Actions
                </h4>
                
                <div class="actions-grid">
                  <button 
                    *ngIf="selectedFile.isLocked"
                    mat-stroked-button 
                    class="action-button unlock"
                    (click)="openUnlockDialog()">
                    <mat-icon>lock_open</mat-icon>
                    <span>Unlock File</span>
                  </button>
                  
                  <button 
                    *ngIf="!selectedFile.isLocked"
                    mat-stroked-button 
                    class="action-button disabled"
                    disabled>
                    <mat-icon>check_circle</mat-icon>
                    <span>File Available</span>
                  </button>
                  
                  <button 
                    mat-stroked-button 
                    class="action-button emergency"
                    (click)="openEmergencyDialog()">
                    <mat-icon>flash_on</mat-icon>
                    <span>Grant Emergency Access</span>
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- No Selection State -->
          <mat-card *ngIf="!selectedFile" class="no-selection-card">
            <mat-card-content>
              <div class="no-selection-content">
                <mat-icon>description</mat-icon>
                <h3>Select a file to manage</h3>
                <p>Choose a file from the search results to view details and available actions</p>
                <p *ngIf="hasSearched && searchResults.length > 0" class="search-hint">
                  {{ searchResults.length }} file{{ searchResults.length !== 1 ? 's' : '' }} found - click on one to get started
                </p>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .file-management-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      height: 100%;
    }

    .header-content {
      margin-bottom: 24px;
    }

    .header-info h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #111827;
    }

    .header-info p {
      margin: 4px 0 0 0;
      color: #6b7280;
      font-size: 14px;
    }

    .search-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .search-bar {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .search-field {
      flex: 1;
      max-width: 600px;
    }

    .search-examples {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .examples-label {
      font-size: 14px;
      color: #6b7280;
    }

    .search-example {
      padding: 4px 8px;
      background-color: #f3f4f6;
      color: #6b7280;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .search-example:hover {
      background-color: #e5e7eb;
    }

    .success-message {
      background-color: #d1fae5;
      border: 1px solid #a7f3d0;
      color: #065f46;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 24px;
      flex: 1;
      min-height: 0;
    }

    .results-card, .details-card, .no-selection-card {
      height: fit-content;
      max-height: 600px;
    }

    .results-content {
      max-height: 500px;
      overflow-y: auto;
    }

    .loading-state, .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
    }

    .loading-state mat-icon, .empty-state mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #d1d5db;
      margin-bottom: 16px;
    }

    .empty-title {
      margin: 0;
      font-weight: 600;
      color: #111827;
      font-size: 16px;
    }

    .empty-subtitle {
      margin: 8px 0 0 0;
      color: #6b7280;
      font-size: 14px;
    }

    .results-count {
      font-size: 14px;
      color: #6b7280;
      font-weight: normal;
    }

    .results-list {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      border-radius: 8px;
    }

    .result-item:hover {
      background-color: #f9fafb;
    }

    .result-item.selected {
      background-color: #ecfdf5;
      border: 2px solid #059669;
    }

    .file-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #059669;
    }

    .file-info {
      flex: 1;
    }

    .file-info h4 {
      margin: 0;
      font-weight: 600;
      color: #111827;
      font-size: 14px;
    }

    .file-path {
      margin: 2px 0;
      color: #6b7280;
      font-size: 12px;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-meta {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #6b7280;
      margin-top: 4px;
    }

    .file-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-badge.locked {
      background-color: #fef2f2;
      color: #dc2626;
    }

    .status-badge.available {
      background-color: #ecfdf5;
      color: #059669;
    }

    .status-badge.large {
      padding: 8px 16px;
      font-size: 14px;
    }

    .status-badge mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .lock-duration {
      font-size: 12px;
      color: #6b7280;
    }

    .file-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      width: 100%;
    }

    .file-icon-large {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #059669;
    }

    .file-title {
      flex: 1;
    }

    .file-title h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #111827;
    }

    .file-title p {
      margin: 4px 0 0 0;
      color: #6b7280;
      font-size: 14px;
    }

    .file-details {
      margin-top: 24px;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .detail-label {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }

    .detail-value {
      font-size: 14px;
      color: #111827;
    }

    .location-info {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }

    .location-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
    }

    .location-path {
      margin: 0;
      font-family: monospace;
      font-size: 14px;
      color: #6b7280;
    }

    .lock-info {
      margin-bottom: 24px;
    }

    .lock-warning {
      background-color: #fffbeb;
      border: 1px solid #fed7aa;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .lock-warning mat-icon {
      color: #d97706;
      margin-top: 2px;
    }

    .lock-title {
      margin: 0 0 12px 0;
      font-weight: 600;
      color: #92400e;
    }

    .lock-meta {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .lock-meta-item {
      display: flex;
      gap: 4px;
      font-size: 14px;
    }

    .meta-label {
      font-weight: 600;
      color: #78350f;
    }

    .action-menu {
      border-top: 1px solid #e5e7eb;
      padding-top: 24px;
    }

    .action-menu h4 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .action-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 24px;
      height: auto;
      border: 2px solid;
      transition: all 0.2s;
    }

    .action-button.unlock {
      border-color: #fecaca;
      color: #dc2626;
    }

    .action-button.unlock:hover:not(:disabled) {
      border-color: #dc2626;
      background-color: #fef2f2;
    }

    .action-button.emergency {
      border-color: #fed7aa;
      color: #ea580c;
    }

    .action-button.emergency:hover:not(:disabled) {
      border-color: #ea580c;
      background-color: #fff7ed;
    }

    .action-button.disabled {
      border-color: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
    }

    .action-button mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .no-selection-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
    }

    .no-selection-content mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #d1d5db;
      margin-bottom: 16px;
    }

    .no-selection-content h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #111827;
    }

    .no-selection-content p {
      margin: 8px 0 0 0;
      color: #6b7280;
      font-size: 14px;
    }

    .search-hint {
      color: #059669 !important;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
      
      .detail-grid {
        grid-template-columns: 1fr;
      }
      
      .lock-meta {
        grid-template-columns: 1fr;
      }
      
      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FileManagementComponent implements OnInit {
  searchTerm = '';
  searchResults: FileInfo[] = [];
  selectedFile: FileInfo | null = null;
  isLoading = false;
  hasSearched = false;
  showSuccessMessage = false;

  searchExamples = [
    'budget', 'contract', 'employee', 'EMP001', 'Mike Johnson', 'sarah.wilson@company.com'
  ];

  constructor(
    private fileService: FileService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  handleSearch() {
    if (!this.searchTerm.trim()) return;

    this.isLoading = true;
    this.hasSearched = true;
    this.selectedFile = null;

    this.fileService.searchFiles(this.searchTerm.trim()).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.isLoading = false;
        this.snackBar.open('Search failed. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  searchExample(example: string) {
    this.searchTerm = example;
    this.handleSearch();
  }

  selectFile(file: FileInfo) {
    this.selectedFile = file;
  }

  openUnlockDialog() {
    if (!this.selectedFile) return;

    const dialogRef = this.dialog.open(UnlockFileDialogComponent, {
      width: '500px',
      data: { file: this.selectedFile }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fileService.unlockFile(this.selectedFile!.id, result.notes).subscribe({
          next: () => {
            // Update file status
            this.selectedFile!.isLocked = false;
            this.selectedFile!.lockedBy = undefined;
            this.selectedFile!.lockDuration = undefined;
            this.selectedFile!.lockStartTime = undefined;

            // Update search results
            const index = this.searchResults.findIndex(f => f.id === this.selectedFile!.id);
            if (index !== -1) {
              this.searchResults[index] = { ...this.selectedFile! };
            }

            this.showSuccessMessage = true;
            setTimeout(() => this.showSuccessMessage = false, 3000);
          },
          error: (error) => {
            console.error('Unlock error:', error);
            this.snackBar.open('Failed to unlock file. Please try again.', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  openEmergencyDialog() {
    if (!this.selectedFile) return;

    const dialogRef = this.dialog.open(EmergencyAccessDialogComponent, {
      width: '500px',
      data: { file: this.selectedFile }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fileService.grantEmergencyAccess(this.selectedFile!.id, result.reason).subscribe({
          next: () => {
            this.showSuccessMessage = true;
            setTimeout(() => this.showSuccessMessage = false, 3000);
          },
          error: (error) => {
            console.error('Emergency access error:', error);
            this.snackBar.open('Failed to grant emergency access. Please try again.', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Less than an hour ago';
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'Unknown';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}