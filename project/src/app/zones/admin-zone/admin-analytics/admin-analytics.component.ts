import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  template: `
    <div class="analytics-container">
      <!-- Header -->
      <mat-card class="header-card">
        <mat-card-content>
          <div class="header-content">
            <div class="header-info">
              <h2>Analytics & Reports</h2>
              <p>System usage analytics and detailed reports</p>
            </div>
            
            <div class="header-controls">
              <mat-form-field appearance="outline">
                <mat-label>Date Range</mat-label>
                <mat-select [(value)]="dateRange">
                  <mat-option value="7">Last 7 days</mat-option>
                  <mat-option value="30">Last 30 days</mat-option>
                  <mat-option value="90">Last 90 days</mat-option>
                  <mat-option value="365">Last year</mat-option>
                </mat-select>
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Report Type</mat-label>
                <mat-select [(value)]="reportType">
                  <mat-option value="overview">Overview</mat-option>
                  <mat-option value="security">Security</mat-option>
                  <mat-option value="usage">Usage</mat-option>
                  <mat-option value="performance">Performance</mat-option>
                </mat-select>
              </mat-form-field>
              
              <button mat-raised-button color="primary" (click)="exportReport()">
                <mat-icon>download</mat-icon>
                Export
              </button>
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
              <mat-icon [style.color]="stat.color">{{ stat.icon }}</mat-icon>
            </div>
            <div class="stat-change">
              <span [class]="'change-' + stat.changeType">{{ stat.change }}</span>
              <span class="change-period">from last period</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Charts and Tables -->
      <div class="content-grid">
        <!-- Top Accessed Files -->
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>description</mat-icon>
              Most Accessed Files
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="file-list">
              <div class="file-item" *ngFor="let file of topFiles">
                <div class="file-info">
                  <div class="file-name">{{ file.name }}</div>
                  <div class="file-department">{{ file.department }}</div>
                </div>
                <div class="file-stats">
                  <div class="access-count">{{ file.accesses }}</div>
                  <div class="access-label">accesses</div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Department Activity -->
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>people</mat-icon>
              Department Activity
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="department-list">
              <div class="department-item" *ngFor="let dept of departmentActivity">
                <div class="department-header">
                  <h4>{{ dept.department }}</h4>
                  <span class="activity-count">{{ dept.activity }} activities</span>
                </div>
                <div class="department-stats">
                  <div class="stat-item">
                    <span class="stat-number">{{ dept.users }}</span>
                    <span class="stat-label">users</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">{{ dept.files }}</span>
                    <span class="stat-label">files</span>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Activity Chart Placeholder -->
      <mat-card class="chart-placeholder">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>bar_chart</mat-icon>
            Activity Trends
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="placeholder-content">
            <mat-icon class="placeholder-icon">bar_chart</mat-icon>
            <p class="placeholder-text">Activity chart would be displayed here</p>
            <p class="placeholder-subtext">Integration with charting library needed</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .analytics-container {
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

    .header-controls {
      display: flex;
      gap: 16px;
      align-items: center;
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

    .change-period {
      color: #6b7280;
      font-size: 14px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .chart-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .file-list, .department-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 16px;
    }

    .file-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f3f4f6;
    }

    .file-item:last-child {
      border-bottom: none;
    }

    .file-name {
      font-weight: 500;
      color: #111827;
      font-size: 14px;
    }

    .file-department {
      font-size: 12px;
      color: #6b7280;
    }

    .file-stats {
      text-align: right;
    }

    .access-count {
      font-weight: 600;
      color: #111827;
    }

    .access-label {
      font-size: 12px;
      color: #6b7280;
    }

    .department-item {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
    }

    .department-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .department-header h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    .activity-count {
      font-size: 12px;
      color: #6b7280;
    }

    .department-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-weight: 600;
      color: #111827;
    }

    .stat-label {
      font-size: 12px;
      color: #6b7280;
    }

    .chart-placeholder {
      margin-top: 8px;
    }

    .placeholder-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px;
      text-align: center;
    }

    .placeholder-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #d1d5db;
      margin-bottom: 16px;
    }

    .placeholder-text {
      margin: 0;
      color: #6b7280;
      font-size: 16px;
    }

    .placeholder-subtext {
      margin: 8px 0 0 0;
      color: #9ca3af;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
      
      .header-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .header-controls {
        flex-wrap: wrap;
      }
    }
  `]
})
export class AdminAnalyticsComponent {
  dateRange = '30';
  reportType = 'overview';

  stats = [
    {
      name: 'Total File Operations',
      value: '24,567',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'description',
      color: '#2563eb'
    },
    {
      name: 'User Activity',
      value: '1,247',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'people',
      color: '#059669'
    },
    {
      name: 'Security Events',
      value: '89',
      change: '-15.3%',
      changeType: 'positive',
      icon: 'security',
      color: '#dc2626'
    },
    {
      name: 'System Uptime',
      value: '99.8%',
      change: '+0.1%',
      changeType: 'positive',
      icon: 'trending_up',
      color: '#7c3aed'
    }
  ];

  topFiles = [
    { name: 'budget-2024.xlsx', accesses: 156, department: 'Finance' },
    { name: 'employee-handbook.pdf', accesses: 134, department: 'HR' },
    { name: 'project-alpha-specs.docx', accesses: 98, department: 'Engineering' },
    { name: 'marketing-plan-q1.pptx', accesses: 87, department: 'Marketing' },
    { name: 'security-policy.pdf', accesses: 76, department: 'IT' }
  ];

  departmentActivity = [
    { department: 'Finance', users: 45, files: 234, activity: 1567 },
    { department: 'Engineering', users: 78, files: 456, activity: 2341 },
    { department: 'Marketing', users: 32, files: 123, activity: 987 },
    { department: 'HR', users: 23, files: 89, activity: 654 },
    { department: 'Legal', users: 12, files: 67, activity: 432 }
  ];

  exportReport() {
    console.log('Exporting report:', this.reportType, 'for', this.dateRange, 'days');
  }
}