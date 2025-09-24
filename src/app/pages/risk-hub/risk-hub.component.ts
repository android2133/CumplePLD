import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatrixConfigModalComponent } from '../../shared/matrix-config-modal/matrix-config-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-risk-hub',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './risk-hub.component.html',
  styleUrls: ['./risk-hub.component.scss']
})
export class RiskHubComponent implements OnInit {

  // Calificación de Riesgo Institucional (de 0 a 100)
  institutionalRiskScore = 78;
  displayRiskScore = 0;

  // Datos de clientes (números absolutos)
  clientDistribution = {
    low: 135,
    moderate: 105,
    high: 60
  };

  totalClients = 0;
  clientDistributionPercentages = { low: 0, moderate: 0, high: 0 };

  // --- NUEVO: Base de datos de clientes simulada ---
  clientDatabase = [
    { name: 'Construcciones Acme S.A. de C.V.', rfc: 'CAC010101AC1', riskScore: 85 },
    { name: 'Transportes Rápidos del Norte S.C.', rfc: 'TRN050505XY1', riskScore: 65 },
    { name: 'Joyería El Diamante Azul', rfc: 'JDA101010ZZA', riskScore: 92 },
    { name: 'Servicios Legales Integrales', rfc: 'SLI200220A2B', riskScore: 35 },
    { name: 'Galería de Arte Moderno', rfc: 'GAM850815MN2', riskScore: 75 },
    { name: 'Fundación Ayuda y Esperanza', rfc: 'FAE900925PL1', riskScore: 45 }
  ];

  // --- MODIFICADO: Propiedades para la búsqueda ---
  searchName: string = '';
  searchRfc: string = '';
  searchResult: { name: string; rfc: string; score: number; level: string; color: string; } | null = null;
  searchNotFound: boolean = false; // Para mostrar mensaje de "No encontrado"

  // Datos para el Mapa de Calor
  riskHeatmap = [
    { activity: 'Compraventa de inmuebles', risks: [4, 5, 5, 5, 5] },
    { activity: 'Arrendamiento de inmuebles', risks: [2, 3, 3, 4, 4] },
    { activity: 'Venta de joyas y relojes', risks: [3, 4, 4, 5, 5] },
    { activity: 'Blindaje de vehículos', risks: [3, 4, 5, 5, 5] },
    { activity: 'Donativos a asociaciones civiles', risks: [2, 3, 4, 4, 5] },
    { activity: 'Venta de obras de arte', risks: [3, 4, 4, 5, 5] },
    { activity: 'Venta de metales preciosos', risks: [3, 4, 5, 5, 5] },
    { activity: 'Servicios de creación de empresas/fideicomisos', risks: [4, 4, 5, 5, 5] },
    { activity: 'Actividades con activos virtuales', risks: [5, 5, 5, 5, 5] },
    { activity: 'Transporte y custodia de valores', risks: [3, 4, 4, 4, 5] }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.animateScore();
    this.calculateClientData();
  }

  calculateClientData(): void {
    this.totalClients = this.clientDistribution.low + this.clientDistribution.moderate + this.clientDistribution.high;
    if (this.totalClients > 0) {
      this.clientDistributionPercentages.low = Math.round((this.clientDistribution.low / this.totalClients) * 100);
      this.clientDistributionPercentages.moderate = Math.round((this.clientDistribution.moderate / this.totalClients) * 100);
      this.clientDistributionPercentages.high = 100 - this.clientDistributionPercentages.low - this.clientDistributionPercentages.moderate;
    }
  }

  /**
   * --- RECONSTRUIDO: Busca un cliente en la base de datos simulada ---
   */
  simulateSearch(): void {
    this.searchResult = null;
    this.searchNotFound = false;

    const termName = this.searchName.trim().toLowerCase();
    const termRfc = this.searchRfc.trim().toLowerCase();

    if (!termName && !termRfc) {
      return;
    }

    let foundClient = null;

    // Búsqueda por RFC tiene prioridad por ser único
    if (termRfc) {
      foundClient = this.clientDatabase.find(c => c.rfc.toLowerCase() === termRfc);
    }
    // Si no se encontró por RFC, buscar por nombre
    if (!foundClient && termName) {
      foundClient = this.clientDatabase.find(c => c.name.toLowerCase().includes(termName));
    }

    if (foundClient) {
      const score = foundClient.riskScore;
      let level = '';
      let color = '';

      if (score <= 40) {
        level = 'Bajo';
        color = '#28a745';
      } else if (score <= 70) {
        level = 'Moderado';
        color = '#ffc107';
      } else {
        level = 'Alto';
        color = '#dc3545';
      }

      this.searchResult = {
        name: foundClient.name,
        rfc: foundClient.rfc,
        score: score,
        level: level,
        color: color
      };
    } else {
      this.searchNotFound = true;
    }
  }

  animateScore(): void {
    const animationDuration = 1500;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(animationDuration / frameRate);
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      this.displayRiskScore = Math.round(this.institutionalRiskScore * easedProgress);

      if (currentFrame === totalFrames) {
        clearInterval(counter);
        this.displayRiskScore = this.institutionalRiskScore;
      }
    }, frameRate);
  }

  getNeedleRotation(): string {
    const angle = -90 + (this.displayRiskScore / 100) * 180;
    return `rotate(${angle}deg)`;
  }

  getHeatmapCellClass(riskLevel: number): string {
    return `risk-level-${riskLevel}`;
  }

  getPieChartStyle(): object {
    const { low, moderate, high } = this.clientDistributionPercentages;
    const conicGradient = `conic-gradient(
      #28a745 0% ${low}%,
      #ffc107 ${low}% ${low + moderate}%,
      #dc3545 ${low + moderate}% 100%
    )`;
    return { background: conicGradient };
  }

  openMatrixConfigModal(): void {
    this.dialog.open(MatrixConfigModalComponent, {
      width: '800px',
      autoFocus: false,
    });
  }

  clearSearch(): void {
    this.searchName = '';
    this.searchRfc = '';
    this.searchResult = null;
    this.searchNotFound = false;
  }
}