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
  selector: 'app-emergency-access-dialog',
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
        <mat-icon class="dialog-icon">flash_on</mat-icon>
        <h2 mat-dialog-title>Grant Emergency Access</h2>
      </div>

      <mat-dialog-content>
        <div class="warning-message">
          <mat-icon>warning</mat-icon>
          <p><strong>Emergency Access:</strong> This will grant temporary 24-hour access that bypasses normal approval processes.</p>
        </div>

        <div class="file-info">
          <div class="info-item">
            <span class="info-label">File:</span>
            <span class="info-value">{{ data.file.fileName }}</span>
          </div>
        </div>

        <mat-form-field appearance="outline" class="reason-field">
          <mat-label>Business Justification *</mat-label>
          <textarea 
            matInput 
            [(ngModel)]="reason" 
            rows="3" 
            placeholder="Explain the urgent business need for emergency access..."
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
          [disabled]="!reason.trim()">
          Grant Access
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
      color: #ea580c;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .warning-message {
      background-color: #fff7ed;
      border: 1px solid #fed7aa;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 24px;
    }

    .warning-message mat-icon {
      color: #ea580c;
      font-size: 20px;
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }

    .warning-message p {
      margin: 0;
      font-size: 14px;
      color: #9a3412;
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
      min-width: 60px;
    }

    .info-value {
      color: #111827;
    }

    .reason-field {
      width: 100%;
    }

    mat-dialog-actions {
      margin-top: 24px;
      padding: 0;
    }
  `]
})
export class EmergencyAccessDialogComponent {
  reason = '';

  constructor(
    public dialogRef: MatDialogRef<EmergencyAccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { file: FileInfo }
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.reason.trim()) {
      this.dialogRef.close({ reason: this.reason });
    }
  }
}