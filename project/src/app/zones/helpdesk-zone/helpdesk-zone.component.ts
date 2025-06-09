import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HelpDeskDashboardComponent } from './helpdesk-dashboard/helpdesk-dashboard.component';
import { FileManagementComponent } from './file-management/file-management.component';
import { FileRecoveryComponent } from './file-recovery/file-recovery.component';
import { SupportTicketsComponent } from './support-tickets/support-tickets.component';

@Component({
  selector: 'app-helpdesk-zone',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HelpDeskDashboardComponent,
    FileManagementComponent,
    FileRecoveryComponent,
    SupportTicketsComponent
  ],
  template: `
    <div class="helpdesk-zone-container">
      <div class="zone-header">
        <div class="zone-title">
          <mat-icon class="zone-icon">support_agent</mat-icon>
          <div>
            <h1>Help Desk Control Center</h1>
            <p>Resolve file access issues and support users</p>
          </div>
        </div>
        <div class="zone-indicator">HELP DESK ZONE</div>
      </div>

      <mat-tab-group class="helpdesk-tabs">
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>dashboard</mat-icon>
            Dashboard
          </ng-template>
          <app-helpdesk-dashboard></app-helpdesk-dashboard>
        </mat-tab>
        
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>folder_open</mat-icon>
            File Management
          </ng-template>
          <app-file-management></app-file-management>
        </mat-tab>
        
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>restore</mat-icon>
            File Recovery
          </ng-template>
          <app-file-recovery></app-file-recovery>
        </mat-tab>
        
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>support</mat-icon>
            Support Tickets
          </ng-template>
          <app-support-tickets></app-support-tickets>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .helpdesk-zone-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #f8fafc;
    }

    .zone-header {
      background: white;
      padding: 24px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .zone-title {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .zone-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #059669;
    }

    .zone-title h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #111827;
    }

    .zone-title p {
      margin: 0;
      color: #6b7280;
      font-size: 14px;
    }

    .helpdesk-tabs {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .helpdesk-tabs ::ng-deep .mat-mdc-tab-body-wrapper {
      flex: 1;
      display: flex;
    }

    .helpdesk-tabs ::ng-deep .mat-mdc-tab-body {
      flex: 1;
      display: flex;
    }

    .helpdesk-tabs ::ng-deep .mat-mdc-tab-body-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 24px;
      overflow-y: auto;
    }

    .helpdesk-tabs ::ng-deep .mat-mdc-tab .mdc-tab__text-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class HelpdeskZoneComponent {}