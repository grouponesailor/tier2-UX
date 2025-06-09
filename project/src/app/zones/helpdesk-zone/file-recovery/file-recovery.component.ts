import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-file-recovery',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="recovery-container">
      <mat-card class="header-card">
        <mat-card-content>
          <div class="header-content">
            <div class="header-info">
              <h2>File Recovery Center</h2>
              <p>Restore previous file versions and recover deleted files</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="placeholder-content">
        <mat-icon>restore</mat-icon>
        <h3>File Recovery System</h3>
        <p>This section would contain file recovery tools and version history management.</p>
      </div>
    </div>
  `,
  styles: [`
    .recovery-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      height: 100%;
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

    .placeholder-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      text-align: center;
      padding: 48px;
    }

    .placeholder-content mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #d1d5db;
      margin-bottom: 16px;
    }

    .placeholder-content h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #111827;
    }

    .placeholder-content p {
      margin: 8px 0 0 0;
      color: #6b7280;
      font-size: 14px;
    }
  `]
})
export class FileRecoveryComponent {}