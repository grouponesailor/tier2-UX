import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminAnalyticsComponent } from './admin-analytics/admin-analytics.component';

@Component({
  selector: 'app-admin-zone',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminSettingsComponent,
    AdminAnalyticsComponent
  ],
  template: `
    <div class="admin-zone-container">
      <div class="zone-header">
        <div class="zone-title">
          <mat-icon class="zone-icon">shield</mat-icon>
          <div>
            <h1>Admin Dashboard</h1>
            <p>System overview and administrative controls</p>
          </div>
        </div>
        <div class="zone-indicator">ADMIN ZONE</div>
      </div>

      <mat-tab-group class="admin-tabs">
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>dashboard</mat-icon>
            Dashboard
          </ng-template>
          <app-admin-dashboard></app-admin-dashboard>
        </mat-tab>
        
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>people</mat-icon>
            User Management
          </ng-template>
          <app-admin-users></app-admin-users>
        </mat-tab>
        
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>settings</mat-icon>
            System Settings
          </ng-template>
          <app-admin-settings></app-admin-settings>
        </mat-tab>
        
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>analytics</mat-icon>
            Analytics & Reports
          </ng-template>
          <app-admin-analytics></app-admin-analytics>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .admin-zone-container {
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
      color: #2563eb;
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

    .admin-tabs {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .admin-tabs ::ng-deep .mat-mdc-tab-body-wrapper {
      flex: 1;
      display: flex;
    }

    .admin-tabs ::ng-deep .mat-mdc-tab-body {
      flex: 1;
      display: flex;
    }

    .admin-tabs ::ng-deep .mat-mdc-tab-body-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 24px;
      overflow-y: auto;
    }

    .admin-tabs ::ng-deep .mat-mdc-tab .mdc-tab__text-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class AdminZoneComponent {}