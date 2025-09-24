import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PldEngineComponent } from './pages/pld-engine/pld-engine.component';
import { Client360Component } from './pages/client-360/client-360.component';
import { RiskHubComponent } from './pages/risk-hub/risk-hub.component';
import { PldAcademyComponent } from './pages/pld-academy/pld-academy.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { NewClientComponent } from './pages/clients/new-client/new-client.component';
import { TransactionUploadComponent } from './pages/transactions/transaction-upload/transaction-upload.component';
import { TransactionListComponent } from './pages/transactions/transaction-list/transaction-list.component';
import { AuditLogComponent } from './pages/audit-log/audit-log.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [authGuard], // <-- Aquí iría un guard para proteger rutas
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pld-engine', component: PldEngineComponent },
      { path: 'client-360', component: Client360Component },
      { path: 'risk-hub', component: RiskHubComponent },
      { path: 'pld-academy', component: PldAcademyComponent },
      { path: 'admin', component: AdminPanelComponent },
      { path: 'clients', component: ClientListComponent },
      { path: 'clients/new', component: NewClientComponent },      
      { path: 'transactions', component: TransactionListComponent },
      { path: 'audit', component: AuditLogComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];