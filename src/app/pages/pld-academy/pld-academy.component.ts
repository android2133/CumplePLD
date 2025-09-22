import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

// Interfaces para los datos
export interface StaffTraining {
  empleado: string;
  cursoAsignado: string;
  estado: 'Completado' | 'En Progreso' | 'Pendiente';
  vencimiento: string;
  avance: number; // Porcentaje de 0 a 100
}

export interface AvailableCourse {
  title: string;
  description: string;
}

// Datos simulados
const STAFF_TRAINING_DATA: StaffTraining[] = [
  { empleado: 'José López', cursoAsignado: 'Prevenir y facilitar operaciones inusuales', estado: 'Completado', vencimiento: 'Sept. 10, 2024', avance: 100 },
  { empleado: 'Maria Gomez', cursoAsignado: 'Marco Regulatorio CNBV / UIF', estado: 'En Progreso', vencimiento: 'Sept. 5, 2024', avance: 75 },
  { empleado: 'Carlos Ruiz', cursoAsignado: 'Identificación y Monitoreo de Clientes', estado: 'Pendiente', vencimiento: 'Aug. 25, 2024', avance: 0 },
  { empleado: 'Ana Sanchez', cursoAsignado: 'Prevención de Operaciones Inusuales', estado: 'En Progreso', vencimiento: 'Oct. 1, 2025', avance: 30 },
  { empleado: 'Javier (Tú)', cursoAsignado: 'Marco Regulatorio CNBV / UIF', estado: 'Completado', vencimiento: 'Dic. 15, 2025', avance: 100 },
];

const AVAILABLE_COURSES_DATA: AvailableCourse[] = [
  { title: 'Prevención de Operaciones Inusuales', description: 'Fundamentos para la detección de actividades sospechosas.' },
  { title: 'Marco Regulatorio CNBV / UIF', description: 'Comprende el marco legal y las obligaciones ante la autoridad.' },
  { title: 'Identificación y Monitoreo de Clientes', description: 'Aprende las mejores prácticas para el conocimiento del cliente (KYC).' },
];

@Component({
  selector: 'app-pld-academy',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatProgressBarModule, MatButtonModule,
    MatTableModule, MatPaginatorModule, MatChipsModule, MatIconModule
  ],
  templateUrl: './pld-academy.component.html',
  styleUrls: ['./pld-academy.component.scss']
})
export class PldAcademyComponent implements OnInit, AfterViewInit {

  // Métricas superiores
  certifiedPercentage = 65;
  expiringSoon = 12;
  overdueCourses = 5;

  // Tabla
  displayedColumns: string[] = ['empleado', 'cursoAsignado', 'estado', 'vencimiento', 'avance'];
  dataSource = new MatTableDataSource<StaffTraining>(STAFF_TRAINING_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Catálogo de cursos
  availableCourses = AVAILABLE_COURSES_DATA;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Función para obtener la clase del chip de estado
  getStatusChipClass(status: string): string {
    switch (status) {
      case 'Completado': return 'chip-success';
      case 'En Progreso': return 'chip-info';
      case 'Pendiente': return 'chip-secondary';
      default: return '';
    }
  }
}