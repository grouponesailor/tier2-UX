import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="dashboard-container">
      <!-- Stats Grid -->
      <div class="stats-grid">
        <mat-card class="stat-card" *ngFor="let stat of stats">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-info">
                <p class="stat-label">{{ stat.name }}</p>
                <p class="stat-value">{{ stat.value }}</p>
              </div>
              <mat-icon class="stat-icon">{{ stat.icon }}</mat-icon>
            </div>
            <div class="stat-change">
              <span [class]="'change-' + stat.changeType">{{ stat.change }}</span>
              <span class="change-period">from last month</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Quick Actions -->
      <mat-card class="quick-actions-card">
        <mat-card-header>
          <mat-card-title>Quick Actions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="actions-grid">
            <button mat-stroked-button class="action-button" *ngFor="let action of quickActions">
              <mat-icon>{{ action.icon }}</mat-icon>
              <span>{{ action.name }}</span>
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- System Overview -->
      <div class="overview-grid">
        <mat-card class="activity-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>timeline</mat-icon>
              Recent System Activity
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div class="activity-item" *ngFor="let activity of recentActivities">
                <div class="activity-indicator" [class]="'indicator-' + activity.type"></div>
                <div class="activity-content">
                  <p class="activity-message">{{ activity.message }}</p>
                  <p class="activity-time">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="alerts-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>warning</mat-icon>
              Security Alerts
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="alerts-list">
              <div class="alert-item" *ngFor="let alert of securityAlerts" [class]="'alert-' + alert.severity">
                <div class="alert-header">
                  <h4>{{ alert.title }}</h4>
                  <span class="alert-severity">{{ alert.severity }}</span>
                </div>
                <p class="alert-description">{{ alert.description }}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      height: 100%;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .stat-card {
      padding: 0;
    }

    .stat-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .stat-label {
      margin: 0;
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }

    .stat-value {
      margin: 8px 0 0 0;
      font-size: 32px;
      font-weight: 700;
      color: #111827;
    }

    .stat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #2563eb;
    }

    .stat-change {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .change-positive {
      color: #059669;
      font-weight: 600;
    }

    .change-negative {
      color: #dc2626;
      font-weight: 600;
    }

    .change-period {
      color: #6b7280;
      font-size: 14px;
    }

    .quick-actions-card {
      margin-top: 8px;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .action-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 24px;
      height: auto;
      border: 2px solid #e5e7eb;
      transition: all 0.2s;
    }

    .action-button:hover {
      border-color: #2563eb;
      background-color: #eff6ff;
    }

    .action-button mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #2563eb;
    }

    .overview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      flex: 1;
    }

    .activity-list, .alerts-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 16px;
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .activity-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 6px;
      flex-shrink: 0;
    }

    .indicator-success {
      background-color: #059669;
    }

    .indicator-warning {
      background-color: #d97706;
    }

    .indicator-info {
      background-color: #2563eb;
    }

    .activity-message {
      margin: 0;
      font-size: 14px;
      color: #111827;
      font-weight: 500;
    }

    .activity-time {
      margin: 4px 0 0 0;
      font-size: 12px;
      color: #6b7280;
    }

    .alert-item {
      padding: 16px;
      border-radius: 8px;
      border: 1px solid;
    }

    .alert-high {
      background-color: #fef2f2;
      border-color: #fecaca;
    }

    .alert-medium {
      background-color: #fffbeb;
      border-color: #fed7aa;
    }

    .alert-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .alert-header h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
    }

    .alert-high .alert-header h4 {
      color: #991b1b;
    }

    .alert-medium .alert-header h4 {
      color: #92400e;
    }

    .alert-severity {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .alert-high .alert-severity {
      color: #dc2626;
    }

    .alert-medium .alert-severity {
      color: #d97706;
    }

    .alert-description {
      margin: 0;
      font-size: 14px;
    }

    .alert-high .alert-description {
      color: #7f1d1d;
    }

    .alert-medium .alert-description {
      color: #78350f;
    }

    @media (max-width: 768px) {
      .overview-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminDashboardComponent {
  stats = [
    {
      name: 'Total Users',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: 'people'
    },
    {
      name: 'Active Permissions',
      value: '8,456',
      change: '+5%',
      changeType: 'positive',
      icon: 'shield'
    },
    {
      name: 'System Health',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive',
      icon: 'check_circle'
    },
    {
      name: 'Security Alerts',
      value: '3',
      change: '-2',
      changeType: 'positive',
      icon: 'warning'
    }
  ];

  quickActions = [
    { name: 'Manage Users', icon: 'people' },
    { name: 'Security Policies', icon: 'shield' },
    { name: 'View Reports', icon: 'analytics' },
    { name: 'System Settings', icon: 'settings' }
  ];

  recentActivities = [
    {
      message: 'New user account created',
      time: '2 minutes ago',
      type: 'success'
    },
    {
      message: 'Security policy updated',
      time: '15 minutes ago',
      type: 'info'
    },
    {
      message: 'System backup completed',
      time: '1 hour ago',
      type: 'success'
    }
  ];

  securityAlerts = [
    {
      title: 'Unusual Login Activity',
      description: 'Multiple failed login attempts detected',
      severity: 'high'
    },
    {
      title: 'Permission Escalation',
      description: 'User requested elevated permissions',
      severity: 'medium'
    }
  ];
}