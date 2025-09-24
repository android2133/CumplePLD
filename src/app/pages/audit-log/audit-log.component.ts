import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

export interface AuditLog {
  date: Date;
  user: string;
  action: string;
  category: 'Reporte' | 'Aviso' | 'Expediente' | 'Alerta';
  details: string;
}

const MOCK_LOG_DATA: AuditLog[] = [
  { date: new Date(), user: 'Javier (Tú)', action: 'Generación de Reporte', category: 'Reporte', details: 'Reporte de Operaciones Inusuales #3403' },
  { date: new Date('2025-09-22T10:00:00'), user: 'Ana García', action: 'Creación de Cliente', category: 'Expediente', details: 'Cliente: Iker Garay Olazabal' },
  { date: new Date('2025-09-22T09:30:00'), user: 'Sistema', action: 'Alerta Automática', category: 'Alerta', details: 'Alerta #1141 por Umbral' },
  { date: new Date('2025-09-21T15:00:00'), user: 'Javier (Tú)', action: 'Cierre de Alerta', category: 'Alerta', details: 'Alerta #1138' },
  { date: new Date('2025-09-20T12:00:00'), user: 'Sistema', action: 'Generación de Aviso', category: 'Aviso', details: 'Aviso de Operación Relevante' },
];

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatSelectModule, MatTableModule
  ],
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {
  filterControl = new FormControl('todos');
  
  displayedColumns: string[] = ['date', 'user', 'category', 'action', 'details'];
  dataSource = new MatTableDataSource<AuditLog>(MOCK_LOG_DATA);
  originalData = MOCK_LOG_DATA;

  ngOnInit(): void {
    this.filterControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });
  }

  applyFilter(filterValue: string | null): void {
    if (!filterValue || filterValue === 'todos') {
      this.dataSource.data = this.originalData;
      return;
    }

    this.dataSource.data = this.originalData.filter(log => {
      switch(filterValue) {
        case 'reportes': return log.category === 'Reporte';
        case 'avisos': return log.category === 'Aviso';
        case 'expedientes': return log.category === 'Expediente';
        case 'alertas': return log.category === 'Alerta';
        default: return true;
      }
    });
  }
}