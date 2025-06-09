import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', loadComponent: () => import('./zones/admin-zone/admin-zone.component').then(m => m.AdminZoneComponent) },
  { path: 'helpdesk', loadComponent: () => import('./zones/helpdesk-zone/helpdesk-zone.component').then(m => m.HelpdeskZoneComponent) }
];