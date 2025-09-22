import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AlertDetailModalComponent } from '../../shared/alert-detail-modal/alert-detail-modal.component';
import { PdfReportService } from '../../services/pdf-report.service';


export interface Transaction {
  fecha: string;
  cliente: string;
  operacion: string;
  monto: number;
  origenAlerta: 'listas' | 'umbral' | 'comportamiento' | null;
  estado: 'Normal' | 'Sospechosa';
}

// Datos simulados
const TRANSACTION_DATA: Transaction[] = [
  { fecha: '2025-09-20', cliente: 'Juan Pérez', operacion: 'Compra Boletos Rifa', monto: 100000, origenAlerta: 'umbral', estado: 'Sospechosa' },
  { fecha: '2025-09-19', cliente: 'Ana Medina', operacion: 'Donativo', monto: 5500, origenAlerta: null, estado: 'Normal' },
  { fecha: '2025-09-19', cliente: 'Carlos López', operacion: 'Colegiatura', monto: 18000, origenAlerta: null, estado: 'Normal' },
  { fecha: '2025-09-18', cliente: 'Laura Martínez', operacion: 'Donativo', monto: 75000, origenAlerta: 'umbral', estado: 'Sospechosa' },
  { fecha: '2025-09-17', cliente: 'Ana Medina', operacion: 'Inscripción', monto: 3200, origenAlerta: null, estado: 'Normal' },
  { fecha: '2025-09-16', cliente: 'Roberto Díaz', operacion: 'Donativo', monto: 500, origenAlerta: null, estado: 'Normal' },
  { fecha: '2025-09-15', cliente: 'Sofía García', operacion: 'Compra Boletos Rifa', monto: 12000, origenAlerta: null, estado: 'Normal' },
];


@Component({
  selector: 'app-pld-engine',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatTooltipModule
  ],
  templateUrl: './pld-engine.component.html',
  styleUrls: ['./pld-engine.component.scss']
})
export class PldEngineComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;
  displayedColumns: string[] = ['fecha', 'cliente', 'operacion', 'monto', 'origenAlerta'];
  dataSource = new MatTableDataSource<Transaction>(TRANSACTION_DATA);

  reportData = TRANSACTION_DATA; 
  // Propiedad para mostrar/ocultar el template
  showReportTemplate = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Métricas
  monitoredTransactions = 3845;
  suspiciousPercentage = 1.2;

  // Datos para tarjetas de la derecha
  businessRules = ['Alertar compras > $75,000 MXN en Rifas', 'Donativos en efectivo > $100,000 MXN', 'Múltiples donativos del mismo origen en 24h'];
  authorityReports = [
    { name: 'Reporte de operaciones inusuales (UIF)', status: 'Listo' },
    { name: 'Reporte de operaciones relevantes', status: 'Pendiente' },
    { name: 'Reporte de operaciones internas preocupantes', status: 'Pendiente' },
  ];

  constructor(private fb: FormBuilder,public dialog: MatDialog, private pdfService: PdfReportService) {
    this.filterForm = this.fb.group({
      fechaInicio: [''],
      fechaFin: [''],
      cliente: [''],
      tipoOperacion: [''],
      montoMin: [''],
      montoMax: ['']
    });
  }

  ngOnInit(): void {
    // Escuchar cambios en los filtros para aplicarlos a la tabla
    this.filterForm.valueChanges.subscribe(() => {
        this.applyFilter();
    });
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    // Lógica de filtrado (simplificada). En un caso real, esto sería más complejo.
    const filterValue = this.filterForm.get('cliente')?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilters() {
    this.filterForm.reset();
  }

  openAlertDetail(transaction: any): void {
    if (transaction.estado !== 'Sospechosa') {
      return; // Opcional: solo abrir modal para transacciones sospechosas
    }

    const dialogRef = this.dialog.open(AlertDetailModalComponent, {
      width: '800px',
      panelClass: 'custom-dialog-container',
      data: {
        id: transaction.id,
        cliente: transaction.cliente,
        fecha: transaction.fecha,
        monto: transaction.monto,
        coincidencias: transaction.coincidencias,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró', result);
    });
  }

  generateReport(): void {
    // 1. Mostramos temporalmente el componente de la plantilla
    this.showReportTemplate = true;

    // 2. Usamos un pequeño delay para asegurar que el DOM se actualice
    setTimeout(() => {
      this.pdfService.generatePdf('pld-report', 'Reporte_PLD_Transacciones');
      // 3. Ocultamos la plantilla después de generar el PDF
      this.showReportTemplate = false;
    }, 100);
  }

}