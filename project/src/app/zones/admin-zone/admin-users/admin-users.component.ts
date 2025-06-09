import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <div class="users-container">
      <!-- Header -->
      <mat-card class="header-card">
        <mat-card-content>
          <div class="header-content">
            <div class="header-info">
              <h2>User Management</h2>
              <p>Manage user accounts, roles, and permissions</p>
            </div>
            <button mat-raised-button color="primary">
              <mat-icon>add</mat-icon>
              Add User
            </button>
          </div>
          
          <div class="search-filters">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search users...</mat-label>
              <input matInput placeholder="Search users...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Filter by Role</mat-label>
              <mat-select>
                <mat-option value="all">All Roles</mat-option>
                <mat-option value="admin">Admin</mat-option>
                <mat-option value="helpdesk">Help Desk</mat-option>
                <mat-option value="employee">Employee</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Statistics -->
      <div class="stats-grid">
        <mat-card class="stat-card" *ngFor="let stat of userStats">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon [style.color]="stat.color">{{ stat.icon }}</mat-icon>
              <div class="stat-info">
                <p class="stat-label">{{ stat.label }}</p>
                <p class="stat-value">{{ stat.value }}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Users Table -->
      <mat-card class="table-card">
        <mat-card-header>
          <mat-card-title>Users</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="users" class="users-table">
            <!-- User Column -->
            <ng-container matColumnDef="user">
              <th mat-header-cell *matHeaderCellDef>User</th>
              <td mat-cell *matCellDef="let user">
                <div class="user-cell">
                  <div class="user-avatar">{{ user.initials }}</div>
                  <div class="user-info">
                    <div class="user-name">{{ user.name }}</div>
                    <div class="user-email">{{ user.email }}</div>
                  </div>
                </div>
              </td>
            </ng-container>

            <!-- Role Column -->
            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Role</th>
              <td mat-cell *matCellDef="let user">
                <mat-chip [style.background-color]="getRoleColor(user.role)" [style.color]="'white'">
                  {{ user.role }}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Department Column -->
            <ng-container matColumnDef="department">
              <th mat-header-cell *matHeaderCellDef>Department</th>
              <td mat-cell *matCellDef="let user">{{ user.department }}</td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let user">
                <div class="status-indicator">
                  <div class="status-dot" [class]="'status-' + user.status"></div>
                  <span class="status-text">{{ user.status | titlecase }}</span>
                </div>
              </td>
            </ng-container>

            <!-- Last Login Column -->
            <ng-container matColumnDef="lastLogin">
              <th mat-header-cell *matHeaderCellDef>Last Login</th>
              <td mat-cell *matCellDef="let user">{{ user.lastLogin | date:'short' }}</td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let user">
                <button mat-icon-button color="primary">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="user-row"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .users-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      height: 100%;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .search-filters {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .search-field {
      flex: 1;
      max-width: 400px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-content mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .stat-label {
      margin: 0;
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }

    .stat-value {
      margin: 4px 0 0 0;
      font-size: 24px;
      font-weight: 700;
      color: #111827;
    }

    .table-card {
      flex: 1;
    }

    .users-table {
      width: 100%;
    }

    .user-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #2563eb;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
    }

    .user-name {
      font-weight: 500;
      color: #111827;
    }

    .user-email {
      font-size: 14px;
      color: #6b7280;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .status-active {
      background-color: #059669;
    }

    .status-inactive {
      background-color: #dc2626;
    }

    .status-text {
      font-size: 14px;
      color: #111827;
    }

    .user-row:hover {
      background-color: #f9fafb;
    }
  `]
})
export class AdminUsersComponent {
  displayedColumns: string[] = ['user', 'role', 'department', 'status', 'lastLogin', 'actions'];

  userStats = [
    { label: 'Total Users', value: '1,247', icon: 'people', color: '#2563eb' },
    { label: 'Active Users', value: '1,198', icon: 'check_circle', color: '#059669' },
    { label: 'Admins', value: '12', icon: 'shield', color: '#7c3aed' },
    { label: 'Inactive', value: '49', icon: 'cancel', color: '#dc2626' }
  ];

  users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      initials: 'JD',
      role: 'admin',
      department: 'IT Security',
      status: 'active',
      lastLogin: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      initials: 'SW',
      role: 'helpdesk',
      department: 'Help Desk',
      status: 'active',
      lastLogin: new Date('2024-01-15T09:15:00')
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      initials: 'MJ',
      role: 'employee',
      department: 'Finance',
      status: 'active',
      lastLogin: new Date('2024-01-14T16:45:00')
    }
  ];

  getRoleColor(role: string): string {
    switch (role) {
      case 'admin':
        return '#2563eb';
      case 'helpdesk':
        return '#059669';
      case 'employee':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  }
}