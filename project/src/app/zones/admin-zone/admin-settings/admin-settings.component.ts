import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule
  ],
  template: `
    <div class="settings-container">
      <!-- Header -->
      <mat-card class="header-card">
        <mat-card-content>
          <div class="header-content">
            <div class="header-info">
              <h2>System Settings</h2>
              <p>Configure system-wide settings and policies</p>
            </div>
            <div class="header-actions">
              <button mat-stroked-button>
                <mat-icon>refresh</mat-icon>
                Reset
              </button>
              <button mat-raised-button color="primary">
                <mat-icon>save</mat-icon>
                Save Changes
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Settings Grid -->
      <div class="settings-grid">
        <!-- Security Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>shield</mat-icon>
              Security Settings
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="settings-form">
              <mat-form-field appearance="outline">
                <mat-label>Minimum Password Length</mat-label>
                <input matInput type="number" [(ngModel)]="settings.passwordMinLength" min="6" max="20">
              </mat-form-field>

              <div class="toggle-setting">
                <mat-slide-toggle [(ngModel)]="settings.passwordRequireSpecialChars">
                  Require special characters in passwords
                </mat-slide-toggle>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Session Timeout (minutes)</mat-label>
                <input matInput type="number" [(ngModel)]="settings.sessionTimeout" min="5" max="480">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Max Login Attempts</mat-label>
                <input matInput type="number" [(ngModel)]="settings.maxLoginAttempts" min="3" max="10">
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- File Lock Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>schedule</mat-icon>
              File Lock Settings
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="settings-form">
              <mat-form-field appearance="outline">
                <mat-label>Default Lock Duration (minutes)</mat-label>
                <input matInput type="number" [(ngModel)]="settings.defaultLockDuration" min="15" max="480">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Maximum Lock Duration (minutes)</mat-label>
                <input matInput type="number" [(ngModel)]="settings.maxLockDuration" min="60" max="1440">
              </mat-form-field>

              <div class="toggle-setting">
                <mat-slide-toggle [(ngModel)]="settings.autoReleaseStuckLocks">
                  Auto-release stuck locks
                </mat-slide-toggle>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Stuck Lock Threshold (minutes)</mat-label>
                <input matInput type="number" [(ngModel)]="settings.stuckLockThreshold" min="30" max="480">
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Emergency Access Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>warning</mat-icon>
              Emergency Access Settings
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="settings-form">
              <mat-form-field appearance="outline">
                <mat-label>Maximum Emergency Access Duration (hours)</mat-label>
                <input matInput type="number" [(ngModel)]="settings.emergencyAccessMaxDuration" min="1" max="72">
              </mat-form-field>

              <div class="toggle-setting">
                <mat-slide-toggle [(ngModel)]="settings.emergencyAccessRequireApproval">
                  Require manager approval for emergency access
                </mat-slide-toggle>
              </div>

              <div class="toggle-setting">
                <mat-slide-toggle [(ngModel)]="settings.emergencyAccessNotifyOwner">
                  Notify file owner of emergency access
                </mat-slide-toggle>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- System Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>storage</mat-icon>
              System Settings
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="settings-form">
              <mat-form-field appearance="outline">
                <mat-label>Audit Log Retention (days)</mat-label>
                <input matInput type="number" [(ngModel)]="settings.auditLogRetention" min="30" max="365">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Backup Frequency</mat-label>
                <mat-select [(ngModel)]="settings.backupFrequency">
                  <mat-option value="hourly">Hourly</mat-option>
                  <mat-option value="daily">Daily</mat-option>
                  <mat-option value="weekly">Weekly</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Maintenance Window</mat-label>
                <input matInput type="time" [(ngModel)]="settings.maintenanceWindow">
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Notification Settings -->
      <mat-card class="notification-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>notifications</mat-icon>
            Notification Settings
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="notification-grid">
            <div class="toggle-setting">
              <mat-slide-toggle [(ngModel)]="settings.emailNotifications">
                Email Notifications
              </mat-slide-toggle>
            </div>
            
            <div class="toggle-setting">
              <mat-slide-toggle [(ngModel)]="settings.slackIntegration">
                Slack Integration
              </mat-slide-toggle>
            </div>
            
            <div class="toggle-setting">
              <mat-slide-toggle [(ngModel)]="settings.smsAlerts">
                SMS Alerts
              </mat-slide-toggle>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .settings-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      height: 100%;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .settings-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
    }

    .settings-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 16px;
    }

    .toggle-setting {
      display: flex;
      align-items: center;
      padding: 8px 0;
    }

    .notification-card {
      margin-top: 8px;
    }

    .notification-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    mat-form-field {
      width: 100%;
    }

    @media (max-width: 768px) {
      .settings-grid {
        grid-template-columns: 1fr;
      }
      
      .header-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }
  `]
})
export class AdminSettingsComponent {
  settings = {
    // Security Settings
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    
    // File Lock Settings
    defaultLockDuration: 60,
    maxLockDuration: 480,
    autoReleaseStuckLocks: true,
    stuckLockThreshold: 120,
    
    // Emergency Access Settings
    emergencyAccessMaxDuration: 24,
    emergencyAccessRequireApproval: true,
    emergencyAccessNotifyOwner: true,
    
    // System Settings
    auditLogRetention: 90,
    backupFrequency: 'daily',
    maintenanceWindow: '02:00',
    
    // Notification Settings
    emailNotifications: true,
    slackIntegration: false,
    smsAlerts: false
  };
}