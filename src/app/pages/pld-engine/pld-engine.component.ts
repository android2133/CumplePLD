import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { AlertDetailModalComponent, AlertData } from '../../shared/alert-detail-modal/alert-detail-modal.component';
import { RulesConfigModalComponent } from '../../shared/rules-config-modal/rules-config-modal.component';
import { PdfReportService } from '../../services/pdf-report.service';
import { AuthorityReportTemplateComponent } from '../../shared/pdf-templates/authority-report-template/authority-report-template.component';

export interface Transaction {
  id: string;
  fecha: string;
  cliente: string;
  operacion: string;
  monto: number;
  origenAlerta: 'listas' | 'umbral' | 'comportamiento' | null;
  estado: 'Normal' | 'Sospechosa';
  coincidencias: string[];
}

// Datos simulados (con más variedad para probar filtros)
const TRANSACTION_DATA: Transaction[] = [
  { id: '1138', fecha: '2025-09-20T10:15:00', cliente: 'Juan Pérez', operacion: 'Compra Boletos Rifa', monto: 100000, origenAlerta: 'umbral', estado: 'Sospechosa', coincidencias: ['Supera Umbral de $75,000 MXN'] },
  { id: '1139', fecha: '2025-09-19T11:00:00', cliente: 'Ana Medina', operacion: 'Donativo', monto: 5500, origenAlerta: null, estado: 'Normal', coincidencias: [] },
  { id: '1140', fecha: '2025-09-19T14:20:00', cliente: 'Carlos López', operacion: 'Colegiatura', monto: 18000, origenAlerta: null, estado: 'Normal', coincidencias: [] },
  { id: '1141', fecha: '2025-09-18T09:05:00', cliente: 'Laura Martínez', operacion: 'Donativo', monto: 75000, origenAlerta: 'umbral', estado: 'Sospechosa', coincidencias: ['Supera Umbral de $75,000 MXN'] },
  { id: '1142', fecha: '2025-09-17T16:45:00', cliente: 'Ana Medina', operacion: 'Inscripción', monto: 3200, origenAlerta: null, estado: 'Normal', coincidencias: [] },
  { id: '1143', fecha: '2025-09-16T12:00:00', cliente: 'Roberto Díaz', operacion: 'Donativo', monto: 500, origenAlerta: null, estado: 'Normal', coincidencias: [] },
  { id: '1144', fecha: '2025-09-15T18:30:00', cliente: 'Sofía García', operacion: 'Compra Boletos Rifa', monto: 12000, origenAlerta: null, estado: 'Normal', coincidencias: [] },
];

@Component({
  selector: 'app-pld-engine',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatTooltipModule,
    DatePipe, AuthorityReportTemplateComponent
  ],
  providers: [DatePipe],
  templateUrl: './pld-engine.component.html',
  styleUrls: ['./pld-engine.component.scss']
})
export class PldEngineComponent implements OnInit, AfterViewInit {

  showAuthorityReport = false;

  filterForm: FormGroup;
  displayedColumns: string[] = ['fecha', 'cliente', 'operacion', 'monto', 'origenAlerta'];
  dataSource = new MatTableDataSource<Transaction>(TRANSACTION_DATA);

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

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private pdfService: PdfReportService
  ) {
    this.filterForm = this.fb.group({
      fechaInicio: [null],
      fechaFin: [null],
      cliente: [''],
      tipoOperacion: [null],
      montoMin: [null],
      montoMax: [null]
    });
  }

  ngOnInit(): void {
    // La lógica de filtrado ahora está encapsulada aquí
    this.dataSource.filterPredicate = (data: Transaction, filter: string): boolean => {
      const filters = JSON.parse(filter);

      const fechaMatch = (() => {
        const itemDate = new Date(data.fecha);
        const startDate = filters.fechaInicio ? new Date(filters.fechaInicio) : null;
        const endDate = filters.fechaFin ? new Date(filters.fechaFin) : null;

        if (startDate && endDate) {
          // Ajusta la fecha final para incluir el día completo
          endDate.setHours(23, 59, 59, 999);
          return itemDate >= startDate && itemDate <= endDate;
        }
        return true; // Si no hay rango, no filtra por fecha
      })();

      const clienteMatch = data.cliente.toLowerCase().includes(filters.cliente.toLowerCase());
      const operacionMatch = (() => {
        if (!filters.tipoOperacion) { // Si es null o undefined, no se filtra
          return true;
        }
        return data.operacion === filters.tipoOperacion;
      })();

      const montoMatch = (() => {
        const montoMin = filters.montoMin;
        const montoMax = filters.montoMax;
        if (montoMin === null && montoMax === null) return true;
        if (montoMin !== null && data.monto < montoMin) return false;
        if (montoMax !== null && data.monto > montoMax) return false;
        return true;
      })();

      return fechaMatch && clienteMatch && operacionMatch && montoMatch;
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // AHORA SOLO SE LLAMA DESDE EL BOTÓN "BUSCAR"
  applyFilter() {
    const formValues = this.filterForm.value;
    const filterObject = {
      ...formValues,
      cliente: formValues.cliente || '',
      fechaInicio: formValues.fechaInicio ? new Date(formValues.fechaInicio) : null,
      fechaFin: formValues.fechaFin ? new Date(formValues.fechaFin) : null,
    };
    console.log(filterObject)
    this.dataSource.filter = JSON.stringify(filterObject);
  }

  clearFilters() {
    this.filterForm.reset({
      fechaInicio: null, fechaFin: null, cliente: '',
      tipoOperacion: null, montoMin: null, montoMax: null
    });
    this.applyFilter(); // Limpia y aplica el filtro vacío
  }


  openAlertDetail(transaction: any): void {
    if (transaction.estado !== 'Sospechosa') {
      return;
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
      } as AlertData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró', result);
    });
  }

  openRulesConfigModal(): void {
    const dialogRef = this.dialog.open(RulesConfigModalComponent, {
      width: '600px',
      data: { rules: this.businessRules }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.businessRules = result; // Actualiza la lista de reglas si se guardó
      }
    });
  }

  generateAuthorityReport(): void {
    this.showAuthorityReport = true;
    setTimeout(() => {
      this.pdfService.generatePdf('authority-report', 'Reporte_UIF');
      this.showAuthorityReport = false;
    }, 100);
  }

  public get suspiciousTransactionsForReport(): Transaction[] {
    return this.dataSource.data.filter(t => t.estado === 'Sospechosa');
  }
}