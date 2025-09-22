import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  // Datos simulados para las tarjetas de métricas
  metricCards: MetricCard[] = [
    {
      value: '12,530',
      title: 'Clientes Activos',
      icon: 'people_alt',
      colorClass: 'text-primary',
    },
    {
      value: '124',
      title: 'Clientes en Riesgo Alto',
      icon: 'trending_up',
      colorClass: 'text-danger',
      trend: 'up'
    },
    {
      value: '56',
      title: 'Alertas Activas',
      icon: 'notification_important',
      colorClass: 'text-warning',
    },
    {
      value: '8',
      title: 'Reportes Generados',
      icon: 'assignment_turned_in',
      colorClass: 'text-success',
    }
  ];

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
    { title: 'PLD Academy', description: 'Gestiona la capacitación del equipo.', icon: 'school', link: '/pld-academy' }
  ];

  constructor() { }
}