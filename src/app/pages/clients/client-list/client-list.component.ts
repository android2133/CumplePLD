import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // <-- Importar
import { ClientFormModalComponent } from '../../../shared/client-form-modal/client-form-modal.component'; // <-- Importar
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {
  displayedColumns: string[] = ['nombre', 'rfc', 'status', 'date', 'actions'];
  dataSource = new MatTableDataSource([
    { nombre: 'Juan Pérez', rfc: 'PEPJ800101ABC', status: 'Activo', date: new Date() },
    { nombre: 'Ana García', rfc: 'GAAA850202XYZ', status: 'Activo', date: new Date() },
  ]);

  constructor(public dialog: MatDialog) {} // <-- Inyectar

  openNewClientModal(): void {
    const dialogRef = this.dialog.open(ClientFormModalComponent, {
      width: '1000px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Añadir el nuevo cliente a la tabla
        const newClient = { ...result, status: 'Activo', date: new Date() };
        this.dataSource.data = [...this.dataSource.data, newClient];
      }
    });
  }


  /**
   * Abre el modal para editar un cliente existente.
   * @param client El objeto del cliente a editar.
   */
  openEditClientModal(client: any): void {
    const dialogRef = this.dialog.open(ClientFormModalComponent, {
      width: '1000px',
      disableClose: true,
      data: client // <-- Pasa los datos del cliente al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Busca el cliente en la tabla y actualiza sus datos
        const index = this.dataSource.data.findIndex(c => c.rfc === client.rfc);
        if (index !== -1) {
          const updatedData = [...this.dataSource.data];
          updatedData[index] = { ...updatedData[index], ...result };
          this.dataSource.data = updatedData;
        }
      }
    });
  }

  /**
   * Abre un diálogo de confirmación para eliminar un cliente.
   * @param client El objeto del cliente a eliminar.
   */
  deleteClient(client: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar al cliente "${client.nombre}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Filtra la tabla para remover al cliente
        this.dataSource.data = this.dataSource.data.filter(c => c.rfc !== client.rfc);
      }
    });
  }
}