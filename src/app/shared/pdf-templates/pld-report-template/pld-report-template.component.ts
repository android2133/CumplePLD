import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pld-report-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pld-report-template.component.html',
  styleUrls: ['./pld-report-template.component.scss']
})
export class PldReportTemplateComponent {
  // Recibimos los datos que se mostrarán en el reporte
  @Input() data: any[] = [];
  @Input() reportTitle = 'Reporte de Transacciones';
  
  // Obtenemos la fecha actual para el reporte
  currentDate = new Date();
}