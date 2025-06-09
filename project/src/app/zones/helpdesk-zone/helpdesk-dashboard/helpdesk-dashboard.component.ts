import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-helpdesk-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Quick Search Bar -->
      <mat-card class="search-card">
        <mat-card-content>
          <div class="search-section">
            <div class="search-info">
              <h2>Help Desk Control Center</h2>
              <p>Resolve file access issues and support users</p>
            </div>
            
            <div class="search-bar">
              <mat-form-field appearance="outline" class="search-field">
                <mat-label>Search by employee name or file name...</mat-label>
                <input matInput [(ngModel)]="quickSearch" placeholder="Search by employee name or file name...">
                <mat-icon matSuffix>search</mat-icon>
              </mat-form-field>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <mat-card class="stat-card" *ngFor="let stat of stats">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-info">
                <p class="stat-label">{{ stat.name }}</p>
                <p class="stat-value">{{ stat.value }}</p>
              </div>
              <mat-icon [style.color]="getStatColor(stat.color)">{{ stat.icon }}</mat-icon>
            </div>
            <div class="stat-change">
              <span [class]="'change-' + stat.changeType">{{ stat.change }}</span>
              <span class="change-period">from yesterday</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Quick Actions -->
      <mat-card class="actions-card">
        <mat-card-header>
          <mat-card-title>Quick Actions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="actions-grid">
            <button mat-stroked-button class="action-button" *ngFor="let action of quickActions">
              <mat-icon [style.color]="getActionColor(action.color)">{{ action.icon }}</mat-icon>
              <span>{{ action.name }}</span>
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Dashboard Content -->
      <div class="content-grid">
        <!-- Urgent Issues -->
        <mat-card class="issues-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon style="color: #dc2626;">warning</mat-icon>
              Urgent Issues
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="issues-list">
              <div class="issue-item" *ngFor="let issue of urgentIssues">
                <div class="issue-header">
                  <h4>{{ issue.title }}</h4>
                  <span class="priority-badge" [class]="'priority-' + issue.priority">{{ issue.priority }}</span>
                </div>
                <p class="issue-file">{{ issue.file }}</p>
                <div class="issue-footer">
                  <span class="issue-user">Reported by {{ issue.user }}</span>
                  <span class="issue-time">{{ issue.time }}</span>
                </div>
                <div class="issue-actions">
                  <button mat-button color="primary">Investigate</button>
                  <button mat-button color="accent">Assign</button>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Recent Activity -->
        <mat-card class="activity-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon style="color: #059669;">timeline</mat-icon>
              Recent Activity
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div class="activity-item" *ngFor="let activity of recentActivity">
                <div class="activity-indicator" [class]="'indicator-' + activity.status"></div>
                <div class="activity-content">
                  <p class="activity-message">{{ activity.action }}</p>
                  <p class="activity-file">{{ activity.file }}</p>
                  <p class="activity-meta">by {{ activity.user }} • {{ activity.time }}</p>
                </div>
                <span class="activity-status" [class]="'status-' + activity.status">{{ activity.status }}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- System Status -->
      <mat-card class="status-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon style="color: #059669;">shield</mat-icon>
            System Status
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="status-grid">
            <div class="status-item">
              <div class="status-value">98.7%</div>
              <div class="status-label">System Uptime</div>
            </div>
            <div class="status-item">
              <div class="status-value">1.2s</div>
              <div class="status-label">Avg Response Time</div>
            </div>
            <div class="status-item">
              <div class="status-value">156</div>
              <div class="status-label">Active Users</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      height: 100%;
    }

    .search-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .search-info h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #111827;
    }

    .search-info p {
      margin: 4px 0 0 0;
      color: #6b7280;
      font-size: 14px;
    }

    .search-field {
      width: 100%;
      max-width: 600px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
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

    .stat-content mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
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

    .change-neutral {
      color: #6b7280;
      font-weight: 600;
    }

    .change-period {
      color: #6b7280;
      font-size: 14px;
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
      border-color: #059669;
      background-color: #ecfdf5;
    }

    .action-button mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      flex: 1;
    }

    .issues-list, .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 16px;
    }

    .issue-item {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      transition: background-color 0.2s;
    }

    .issue-item:hover {
      background-color: #f9fafb;
    }

    .issue-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .issue-header h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    .priority-badge {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .priority-urgent {
      background-color: #fef2f2;
      color: #dc2626;
    }

    .priority-high {
      background-color: #fff7ed;
      color: #ea580c;
    }

    .priority-medium {
      background-color: #fefce8;
      color: #ca8a04;
    }

    .issue-file {
      margin: 8px 0;
      font-size: 14px;
      color: #6b7280;
    }

    .issue-footer {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 12px;
    }

    .issue-actions {
      display: flex;
      gap: 8px;
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #f3f4f6;
    }

    .activity-item:last-child {
      border-bottom: none;
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

    .activity-content {
      flex: 1;
    }

    .activity-message {
      margin: 0;
      font-size: 14px;
      color: #111827;
      font-weight: 500;
    }

    .activity-file {
      margin: 2px 0;
      font-size: 14px;
      color: #6b7280;
    }

    .activity-meta {
      margin: 4px 0 0 0;
      font-size: 12px;
      color: #6b7280;
    }

    .activity-status {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-success {
      background-color: #ecfdf5;
      color: #059669;
    }

    .status-warning {
      background-color: #fffbeb;
      color: #d97706;
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 24px;
      margin-top: 16px;
      text-align: center;
    }

    .status-value {
      font-size: 24px;
      font-weight: 700;
      color: #059669;
    }

    .status-label {
      font-size: 14px;
      color: #6b7280;
      margin-top: 4px;
    }

    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HelpDeskDashboardComponent {
  quickSearch = '';

  stats = [
    {
      name: 'Open Tickets',
      value: '12',
      change: '+3',
      changeType: 'neutral',
      icon: 'warning',
      color: 'red'
    },
    {
      name: 'Locked Files',
      value: '8',
      change: '-2',
      changeType: 'positive',
      icon: 'lock',
      color: 'yellow'
    },
    {
      name: 'Emergency Access',
      value: '3',
      change: '+1',
      changeType: 'neutral',
      icon: 'flash_on',
      color: 'orange'
    },
    {
      name: 'Resolved Today',
      value: '24',
      change: '+8',
      changeType: 'positive',
      icon: 'check_circle',
      color: 'green'
    }
  ];

  quickActions = [
    { name: 'Search Files', icon: 'search', color: 'blue' },
    { name: 'Unlock Files', icon: 'lock_open', color: 'yellow' },
    { name: 'Emergency Access', icon: 'flash_on', color: 'red' },
    { name: 'File Recovery', icon: 'restore', color: 'purple' }
  ];

  urgentIssues = [
    {
      title: 'Budget file locked for 2 days',
      user: 'Sarah Wilson',
      file: '/finance/budget-2024.xlsx',
      priority: 'urgent',
      time: '2 hours ago'
    },
    {
      title: 'Cannot access project files',
      user: 'Mike Johnson',
      file: '/projects/alpha/',
      priority: 'high',
      time: '45 minutes ago'
    },
    {
      title: 'Contract file not found',
      user: 'Lisa Chen',
      file: '/contracts/2024-001.pdf',
      priority: 'high',
      time: '1 hour ago'
    }
  ];

  recentActivity = [
    {
      action: 'File unlocked',
      file: 'quarterly-report.xlsx',
      user: 'David Tech',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      action: 'Emergency access granted',
      file: 'client-presentation.pptx',
      user: 'Sarah Support',
      time: '15 minutes ago',
      status: 'warning'
    },
    {
      action: 'File restored',
      file: 'backup-data.xlsx',
      user: 'Mike Helper',
      time: '30 minutes ago',
      status: 'success'
    }
  ];

  getStatColor(color: string): string {
    const colors: { [key: string]: string } = {
      red: '#dc2626',
      yellow: '#d97706',
      orange: '#ea580c',
      green: '#059669',
      blue: '#2563eb',
      purple: '#7c3aed'
    };
    return colors[color] || '#6b7280';
  }

  getActionColor(color: string): string {
    return this.getStatColor(color);
  }
}