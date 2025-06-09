import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="tickets-container">
      <mat-card class="header-card">
        <mat-card-content>
          <div class="header-content">
            <div class="header-info">
              <h2>Support Tickets</h2>
              <p>Manage and track file access support requests</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="placeholder-content">
        <mat-icon>support</mat-icon>
        <h3>Support Ticket System</h3>
        <p>This section would contain support ticket management and tracking tools.</p>
      </div>
    </div>
  `,
  styles: [`
    .tickets-container {
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
export class SupportTicketsComponent {}