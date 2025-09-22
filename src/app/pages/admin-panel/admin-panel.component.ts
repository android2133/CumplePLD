import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { UserFormModalComponent } from '../../shared/user-form-modal/user-form-modal.component';
import { MatDialog } from '@angular/material/dialog';


// Interfaces de datos
export interface User {
  nombre: string;
  correo: string;
  rol: 'Administrador' | 'Supervisor' | 'Analista';
  estado: boolean; // true para Activo, false para Inactivo
}

export interface Permission {
  id: string;
  label: string;
}

export interface Role {
  name: 'Administrador' | 'Supervisor' | 'Analista';
  permissions: string[]; // Array de IDs de permisos
}

// Datos simulados
const USER_DATA: User[] = [
  { nombre: 'Ana García', correo: 'ana@example.com', rol: 'Administrador', estado: true },
  { nombre: 'Juan Pérez', correo: 'juan@example.com', rol: 'Supervisor', estado: true },
  { nombre: 'Laura Martínez', correo: 'laura@example.com', rol: 'Analista', estado: false },
  { nombre: 'Carlos López', correo: 'carlos@example.com', rol: 'Analista', estado: true },
];

const ALL_PERMISSIONS: Permission[] = [
  { id: 'view_dashboard', label: 'Ver Dashboard' },
  { id: 'manage_alerts', label: 'Gestionar Alertas (Cerrar/Escalar)' },
  { id: 'configure_rules', label: 'Configurar Reglas de Negocio' },
  { id: 'generate_reports', label: 'Generar Reportes para Autoridad' },
  { id: 'view_all_clients', label: 'Ver todos los Clientes' },
  { id: 'manage_users', label: 'Gestionar Usuarios y Roles' },
  { id: 'view_audit_log', label: 'Ver Bitácora del Sistema' },
];

const ROLES_DATA: Role[] = [
  { name: 'Administrador', permissions: ['view_dashboard', 'manage_alerts', 'configure_rules', 'generate_reports', 'view_all_clients', 'manage_users', 'view_audit_log'] },
  { name: 'Supervisor', permissions: ['view_dashboard', 'manage_alerts', 'generate_reports', 'view_all_clients'] },
  { name: 'Analista', permissions: ['view_dashboard', 'manage_alerts', 'view_all_clients'] },
];

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule, MatTabsModule, MatTableModule, MatButtonModule,
    MatIconModule, MatSlideToggleModule, MatListModule, MatCheckboxModule,
    FormsModule, MatCardModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  // Pestaña de Usuarios
  displayedColumns: string[] = ['nombre', 'correo', 'rol', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<User>(USER_DATA);

  // Pestaña de Roles y Permisos
  allPermissions = ALL_PERMISSIONS;
  roles = ROLES_DATA;
  selectedRole: Role | null = this.roles[0];
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  // Cambia el rol seleccionado para ver sus permisos
  selectRole(role: Role): void {
    this.selectedRole = role;
  }

  // Verifica si un permiso está asignado al rol seleccionado
  hasPermission(permissionId: string): boolean {
    return this.selectedRole ? this.selectedRole.permissions.includes(permissionId) : false;
  }

  openUserModal(user?: User): void {
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      width: '500px',
      data: user // Si 'user' existe, es modo edición. Si es null, es modo creación.
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        if (user) {
          // Lógica de Edición
          const index = this.dataSource.data.findIndex(u => u.correo === user.correo);
          if (index > -1) {
            const updatedData = [...this.dataSource.data];
            updatedData[index] = { ...updatedData[index], ...result };
            this.dataSource.data = updatedData;
          }
        } else {
          // Lógica de Creación
          const newUser = { ...result, estado: true };
          this.dataSource.data = [...this.dataSource.data, newUser];
        }
      }
    });
  }

}