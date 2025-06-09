import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { FileInfo } from '../../../models/file.model';

@Component({
  selector: 'app-unlock-file-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <mat-icon class="dialog-icon">lock_open</mat-icon>
        <h2 mat-dialog-title>Unlock File</h2>
      </div>

      <mat-dialog-content>
        <div class="warning-message">
          <mat-icon>warning</mat-icon>
          <p><strong>Warning:</strong> Unlocking this file will notify the current user and may interrupt their work.</p>
        </div>

        <div class="file-info">
          <div class="info-item">
            <span class="info-label">File:</span>
            <span class="info-value">{{ data.file.fileName }}</span>
          </div>
          
          <div class="info-item" *ngIf="data.file.lockedBy">
            <span class="info-label">Currently Locked By:</span>
            <span class="info-value">{{ data.file.lockedBy.name }} ({{ data.file.lockedBy.id }})</span>
          </div>
        </div>

        <mat-form-field appearance="outline" class="notes-field">
          <mat-label>Notes for Unlocking *</mat-label>
          <textarea 
            matInput 
            [(ngModel)]="notes" 
            rows="3" 
            placeholder="Explain why this file needs to be unlocked..."
            required>
          </textarea>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button 
          mat-raised-button 
          color="warn" 
          (click)="onConfirm()" 
          [disabled]="!notes.trim()">
          Confirm Unlock
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      min-width: 400px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .dialog-icon {
      color: #dc2626;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .warning-message {
      background-color: #fffbeb;
      border: 1px solid #fed7aa;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 24px;
    }

    .warning-message mat-icon {
      color: #d97706;
      font-size: 20px;
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }

    .warning-message p {
      margin: 0;
      font-size: 14px;
      color: #92400e;
    }

    .file-info {
      margin-bottom: 24px;
    }

    .info-item {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }

    .info-label {
      font-weight: 500;
      color: #6b7280;
      min-width: 140px;
    }

    .info-value {
      color: #111827;
    }

    .notes-field {
      width: 100%;
    }

    mat-dialog-actions {
      margin-top: 24px;
      padding: 0;
    }
  `]
})
export class UnlockFileDialogComponent {
  notes = '';

  constructor(
    public dialogRef: MatDialogRef<UnlockFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { file: FileInfo }
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.notes.trim()) {
      this.dialogRef.close({ notes: this.notes });
    }
  }
}