import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PdfReportService } from '../../services/pdf-report.service';
import { ProfessionalReportTemplateComponent } from '../../shared/pdf-templates/professional-report-template/professional-report-template.component';

interface NavCard {
  title: string;
  description: string;
  icon: string;
  link: string;
}


// Interfaz para definir la estructura de nuestras tarjetas de métricas
interface MetricCard {
  value: string;
  title: string;
  icon: string;
  colorClass: string;
  trend?: 'up' | 'down' | 'none';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule,
    ProfessionalReportTemplateComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  // Datos simulados para las tarjetas de métricas
  metricCardsData = [
    { value: 12530, title: 'Clientes Activos', icon: 'people_alt', colorClass: 'text-primary' },
    { value: 124, title: 'Clientes en Riesgo Alto', icon: 'trending_up', colorClass: 'text-danger', trend: 'up' },
    { value: 56, title: 'Alertas Activas', icon: 'notification_important', colorClass: 'text-warning' },
    { value: 8, title: 'Reportes Generados', icon: 'assignment_turned_in', colorClass: 'text-success' }
  ];


  displayMetricCards = this.metricCardsData.map((c: any) => ({ ...c, displayValue: 0 }));


  // Datos para la tabla de reportes regulatorios
  regulatoryReports = {
    sent: 13,
    acknowledged: 11,
    pending: 2
  };


  navCards: NavCard[] = [
    { title: 'Client 360', description: 'Investiga perfiles de clientes.', icon: 'people', link: '/client-360' },
    { title: 'PLD Engine', description: 'Monitorea transacciones y alertas.', icon: 'settings_ethernet', link: '/pld-engine' },
    { title: 'Risk Hub', description: 'Visualiza el riesgo institucional.', icon: 'security', link: '/risk-hub' },
    { title: 'PLD Academy', description: 'Gestiona la capacitación del equipo.', icon: 'school', link: '/pld-academy' },
    { title: 'Vista de Auditoría', description: '', icon: 'school', link: '/audit' },    
  ];

  constructor(
    private pdfService: PdfReportService
  ) { }


  ngOnInit(): void {
    this.animateMetrics();
  }


  animateMetrics(): void {
    this.displayMetricCards.forEach((card, index) => {
      const targetValue = this.metricCardsData[index].value;
      // ANTES: const duration = 1500;
      const duration = 2500; // AHORA: 2.5 segundos para una animación más lenta

      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let currentFrame = 0;

      const counter = setInterval(() => {
        currentFrame++;
        const progress = 1 - Math.pow(1 - (currentFrame / totalFrames), 4); // easeOut (más suave)
        card.displayValue = Math.round(targetValue * progress);

        if (currentFrame === totalFrames) {
          clearInterval(counter);
          card.displayValue = targetValue;
        }
      }, frameRate);
    });
  }


  reportMetrics = { clients: 12530, highRisk: 124, alerts: 56 };
  highRiskClients = [
    { nombre: 'Juan Pérez', rfc: 'PEPJ800101ABC', riskScore: 85, date: new Date() },
    { nombre: 'Laura Martínez', rfc: 'MALJ900303XYZ', riskScore: 92, date: new Date() },
  ];
  
  showProfessionalReport = false;
  generateProfessionalReport(): void {
    this.showProfessionalReport = true;
    setTimeout(() => {
      this.pdfService.generatePdf('professional-report', 'Reporte_Ejecutivo_PLD');
      this.showProfessionalReport = false;
    }, 100);
  }
}