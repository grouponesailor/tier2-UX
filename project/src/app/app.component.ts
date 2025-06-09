import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AdminDashboardComponent } from './zones/admin-zone/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './zones/admin-zone/admin-users/admin-users.component';
import { AdminSettingsComponent } from './zones/admin-zone/admin-settings/admin-settings.component';
import { AdminAnalyticsComponent } from './zones/admin-zone/admin-analytics/admin-analytics.component';
import { HelpDeskDashboardComponent } from './zones/helpdesk-zone/helpdesk-dashboard/helpdesk-dashboard.component';
import { FileManagementComponent } from './zones/helpdesk-zone/file-management/file-management.component';
import { FileRecoveryComponent } from './zones/helpdesk-zone/file-recovery/file-recovery.component';
import { SupportTicketsComponent } from './zones/helpdesk-zone/support-tickets/support-tickets.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatListModule,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminSettingsComponent,
    AdminAnalyticsComponent,
    HelpDeskDashboardComponent,
    FileManagementComponent,
    FileRecoveryComponent,
    SupportTicketsComponent
  ],
  template: `
    <div class="app-container" [ngClass]="currentZone + '-zone'">
      <!-- Sidebar -->
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="sidenav">
          <!-- Logo -->
          <div class="logo-section">
            <div class="logo-content">
              <mat-icon class="logo-icon">shield</mat-icon>
              <div class="logo-text">
                <span class="app-name">FileGuard</span>
                <span class="app-subtitle">Enterprise</span>
              </div>
            </div>
          </div>

          <!-- Zone Tabs -->
          <div class="zone-tabs">
            <button 
              class="zone-tab"
              [class.active]="currentZone === 'admin'"
              (click)="switchZone('admin')">
              Admin Zone
            </button>
            <button 
              class="zone-tab"
              [class.active]="currentZone === 'helpdesk'"
              (click)="switchZone('helpdesk')">
              Help Desk
            </button>
          </div>

          <!-- Navigation -->
          <nav class="navigation">
            <button 
              *ngFor="let item of currentNavigation" 
              class="nav-item"
              [class.active]="currentPage === item.id"
              (click)="setCurrentPage(item.id)">
              <mat-icon>{{ item.icon }}</mat-icon>
              <span>{{ item.name }}</span>
            </button>
          </nav>
        </mat-sidenav>

        <mat-sidenav-content class="main-content">
          <!-- Top Header -->
          <mat-toolbar class="top-header">
            <div class="header-content">
              <div class="page-info">
                <h1>{{ getCurrentPageTitle() }}</h1>
                <div class="zone-indicator">
                  {{ currentZone === 'admin' ? 'ADMIN ZONE' : 'HELP DESK ZONE' }}
                </div>
              </div>
              
              <div class="header-actions">
                <!-- Notifications -->
                <button mat-icon-button>
                  <mat-icon matBadge="3" matBadgeColor="warn">notifications</mat-icon>
                </button>
                
                <!-- User Menu -->
                <button mat-button [matMenuTriggerFor]="userMenu" class="user-button">
                  <div class="user-avatar">JD</div>
                  <span class="user-name">John Doe</span>
                  <mat-icon>keyboard_arrow_down</mat-icon>
                </button>
                
                <mat-menu #userMenu="matMenu">
                  <button mat-menu-item>
                    <mat-icon>person</mat-icon>
                    <span>Profile</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon>settings</mat-icon>
                    <span>Settings</span>
                  </button>
                  <mat-divider></mat-divider>
                  <button mat-menu-item>
                    <mat-icon>logout</mat-icon>
                    <span>Sign out</span>
                  </button>
                </mat-menu>
              </div>
            </div>
          </mat-toolbar>

          <!-- Page Content -->
          <div class="page-content">
            <!-- Admin Zone Components -->
            <app-admin-dashboard *ngIf="currentZone === 'admin' && currentPage === 'dashboard'"></app-admin-dashboard>
            <app-admin-users *ngIf="currentZone === 'admin' && currentPage === 'users'"></app-admin-users>
            <app-admin-settings *ngIf="currentZone === 'admin' && currentPage === 'settings'"></app-admin-settings>
            <app-admin-analytics *ngIf="currentZone === 'admin' && currentPage === 'analytics'"></app-admin-analytics>
            
            <!-- Help Desk Zone Components -->
            <app-helpdesk-dashboard *ngIf="currentZone === 'helpdesk' && currentPage === 'dashboard'"></app-helpdesk-dashboard>
            <app-file-management *ngIf="currentZone === 'helpdesk' && currentPage === 'management'"></app-file-management>
            <app-file-recovery *ngIf="currentZone === 'helpdesk' && currentPage === 'recovery'"></app-file-recovery>
            <app-support-tickets *ngIf="currentZone === 'helpdesk' && currentPage === 'tickets'"></app-support-tickets>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      --primary-color: #2563eb;
      --primary-light: #dbeafe;
      --primary-dark: #1d4ed8;
    }

    .app-container.helpdesk-zone {
      --primary-color: #059669;
      --primary-light: #d1fae5;
      --primary-dark: #047857;
    }

    .sidenav-container {
      flex: 1;
    }

    .sidenav {
      width: 256px;
      background: white;
      border-right: 1px solid #e5e7eb;
    }

    .logo-section {
      padding: 24px;
      border-bottom: 1px solid #e5e7eb;
    }

    .logo-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #6b7280;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
    }

    .app-name {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      line-height: 1;
    }

    .app-subtitle {
      font-size: 12px;
      font-weight: 500;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .zone-tabs {
      display: flex;
      border-bottom: 1px solid #e5e7eb;
    }

    .zone-tab {
      flex: 1;
      padding: 12px 16px;
      border: none;
      background: none;
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s;
      border-bottom: 2px solid transparent;
    }

    .zone-tab:hover {
      color: #111827;
      background-color: #f9fafb;
    }

    .zone-tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
      background-color: var(--primary-light);
    }

    .navigation {
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border: none;
      background: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      width: 100%;
    }

    .nav-item:hover {
      color: #111827;
      background-color: #f9fafb;
    }

    .nav-item.active {
      color: var(--primary-color);
      background-color: var(--primary-light);
      border-right: 2px solid var(--primary-color);
    }

    .nav-item mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .main-content {
      display: flex;
      flex-direction: column;
    }

    .top-header {
      background: white;
      color: #374151;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      z-index: 1000;
      height: 64px;
      padding: 0 24px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .page-info h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #111827;
    }

    .zone-indicator {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: var(--primary-light);
      color: var(--primary-dark);
      margin-top: 4px;
      display: inline-block;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 8px;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
    }

    .user-name {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    .page-content {
      flex: 1;
      padding: 24px;
      background: #f8fafc;
      overflow-y: auto;
    }
  `]
})
export class AppComponent {
  currentZone: 'admin' | 'helpdesk' = 'admin';
  currentPage = 'dashboard';

  adminNavigation = [
    { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
    { id: 'users', name: 'User Management', icon: 'people' },
    { id: 'settings', name: 'System Settings', icon: 'settings' },
    { id: 'analytics', name: 'Analytics & Reports', icon: 'analytics' },
  ];

  helpdeskNavigation = [
    { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
    { id: 'management', name: 'File Management', icon: 'folder_open' },
    { id: 'recovery', name: 'File Recovery', icon: 'restore' },
    { id: 'tickets', name: 'Support Tickets', icon: 'support' },
  ];

  get currentNavigation() {
    return this.currentZone === 'admin' ? this.adminNavigation : this.helpdeskNavigation;
  }

  switchZone(zone: 'admin' | 'helpdesk') {
    this.currentZone = zone;
    this.currentPage = 'dashboard'; // Reset to dashboard when switching zones
  }

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  getCurrentPageTitle(): string {
    const page = this.currentNavigation.find(nav => nav.id === this.currentPage);
    return page ? page.name : 'Dashboard';
  }
}