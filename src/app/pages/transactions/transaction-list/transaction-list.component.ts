import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExcelService } from '../../../services/excel.service';
import { TransactionUploadComponent } from '../transaction-upload/transaction-upload.component';

// Interfaz para definir la estructura de una transacción
export interface Transaction {
  fechaOperacion: Date;
  nombreCliente: string;
  rfcCliente: string;
  tipoOperacion: string;
  descripcionOperacion: string;
  montoOperacion: number;
  moneda: string;
  medioPago: string;
  nombreBeneficiario: string;
  rfcBeneficiario: string;
}

// Datos de ejemplo que coinciden con la estructura de la tabla
const MOCK_TRANSACTIONS: Transaction[] = [
  { fechaOperacion: new Date('2025-09-01'), nombreCliente: 'Juan Pérez García', rfcCliente: 'PEGJ850101ABC', tipoOperacion: 'Compraventa', descripcionOperacion: 'Compra de inmueble en CDMX', montoOperacion: 3200000, moneda: 'MXN', medioPago: 'Efectivo', nombreBeneficiario: 'Inmobiliaria Sol SA de CV', rfcBeneficiario: 'ISO990101XYZ' },
  { fechaOperacion: new Date('2025-09-02'), nombreCliente: 'María Gómez López', rfcCliente: 'GOLM900202DEF', tipoOperacion: 'Arrendamiento', descripcionOperacion: 'Renta mensual de local comercial', montoOperacion: 92000, moneda: 'MXN', medioPago: 'Transferencia', nombreBeneficiario: 'Juan Pérez García', rfcBeneficiario: 'PEGJ850101ABC' },
  { fechaOperacion: new Date('2025-09-04'), nombreCliente: 'Fundación Vida AC', rfcCliente: 'FVI100303GHI', tipoOperacion: 'Donativo', descripcionOperacion: 'Donativo único para causa social', montoOperacion: 1200000, moneda: 'MXN', medioPago: 'Transferencia', nombreBeneficiario: 'Fundación Vida AC', rfcBeneficiario: 'FVI100303GHI' },
];

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, CurrencyPipe, DatePipe],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
  // Nombres de columna en camelCase para una fácil vinculación
  displayedColumns: string[] = [
    'fechaOperacion',
    'nombreCliente',
    'rfcCliente',
    'tipoOperacion',
    'descripcionOperacion',
    'montoOperacion',
    'moneda',
    'medioPago',
    'nombreBeneficiario',
    'rfcBeneficiario',
    'actions' // <-- Columna de acciones añadida
  ];
  dataSource = new MatTableDataSource<Transaction>(MOCK_TRANSACTIONS);

  constructor(
    public dialog: MatDialog,
    private excelService: ExcelService
  ) {}

  openUploadModal(): void {
    const dialogRef = this.dialog.open(TransactionUploadComponent, {
      width: '900px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        // Mapea los datos del Excel a la interfaz Transaction
        const newTransactions: Transaction[] = result.data.map((row: any) => ({
          fechaOperacion: this.excelSerialDateToJSDate(row['Fecha de la operación']),
          nombreCliente: row['Nombre o razón social del cliente'],
          rfcCliente: row['RFC del cliente'],
          tipoOperacion: row['Tipo de operación'],
          descripcionOperacion: row['Descripción de la operación'],
          montoOperacion: row['Monto de la operación'],
          moneda: row['Moneda'],
          medioPago: row['Medio de pago'],
          nombreBeneficiario: row['Nombre del beneficiario final'],
          rfcBeneficiario: row['RFC del beneficiario final'],
        }));
        
        this.dataSource.data = [...this.dataSource.data, ...newTransactions];
      }
    });
  }

  // Helper para convertir la fecha de número de serie de Excel a objeto Date de JS
  private excelSerialDateToJSDate(serial: number): Date {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate() + 1);
  }

  downloadTemplate(): void {
    this.excelService.downloadProfessionalTemplate();
  }

  deleteTransaction(txToDelete: Transaction): void {
    this.dataSource.data = this.dataSource.data.filter(tx => tx !== txToDelete);
  }
}
