import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExcelService } from '../../../services/excel.service';
import { TransactionUploadComponent } from '../transaction-upload/transaction-upload.component'; // El modal

const MOCK_TRANSACTIONS = [
  { fecha: new Date('2025-09-21'), cliente: 'Juan Pérez', operacion: 'Compra Boletos Rifa', monto: 100000 },
  { fecha: new Date('2025-09-20'), cliente: 'Ana Medina', operacion: 'Donativo', monto: 5500 },
];

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
  displayedColumns: string[] = ['fecha', 'cliente', 'operacion', 'monto', 'actions']; // <-- Añadir 'actions'
  dataSource = new MatTableDataSource(MOCK_TRANSACTIONS);

  constructor(
    public dialog: MatDialog,
    private excelService: ExcelService
  ) {}

  openUploadModal(): void {
    const dialogRef = this.dialog.open(TransactionUploadComponent, {
      width: '900px', // <-- Aumentar ancho
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        // Añade los datos reales del Excel a la tabla
         const newTransactions = result.data.map((row: any) => {
          // 1. Función para convertir 'dd/mm/yyyy' a un objeto Date
          const parseDate = (dateString: string): Date => {
            const [day, month, year] = dateString.split('/');
            return new Date(+year, +month - 1, +day);
          };

          return {
            // 2. Usa la función para convertir la fecha
            fecha: parseDate(row.FECHA),
            cliente: row.Cliente,
            operacion: row.Operación,
            monto: row.Monto
          };
        });
        // Añade los nuevos registros a los existentes
        this.dataSource.data = [...this.dataSource.data, ...newTransactions];
      }
    });
  }

  downloadTemplate(): void {
    this.excelService.downloadProfessionalTemplate();
  }

  deleteTransaction(txToDelete: any): void {
    this.dataSource.data = this.dataSource.data.filter(tx => tx !== txToDelete);
  }
}