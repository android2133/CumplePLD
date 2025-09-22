import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatrixConfigModalComponent } from '../../shared/matrix-config-modal/matrix-config-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-risk-hub',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './risk-hub.component.html',
  styleUrls: ['./risk-hub.component.scss']
})
export class RiskHubComponent implements OnInit {

  // Calificación de Riesgo Institucional (de 0 a 100)
  institutionalRiskScore = 78;
  // Puntuación que se mostrará y animará en la vista
  displayRiskScore = 0;

  // Distribución de Clientes
  clientDistribution = {
    low: 45,    // 45%
    moderate: 35, // 35%
    high: 20      // 20%
  };
  
  // Datos para el Mapa de Calor [Actividad, Nivel de Riesgo 1-5]
  riskHeatmap = [
    { activity: 'Donativos', risks: [1, 2, 3, 4, 5] },
    { activity: 'Rifas', risks: [2, 3, 4, 4, 5] },
    { activity: 'Subastas', risks: [3, 3, 4, 5, 5] },
    { activity: 'Asesoría', risks: [1, 1, 2, 2, 3] },
    { activity: 'Casinos', risks: [4, 5, 5, 5, 5] }
  ];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.animateScore();
  }

  /**
   * Anima el contador del score de riesgo de 0 al valor final 
   * para una carga más dinámica y visual.
   */
  animateScore(): void {
    const animationDuration = 1500; // 1.5 segundos
    const frameRate = 1000 / 60; // 60 fps
    const totalFrames = Math.round(animationDuration / frameRate);
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      // Usamos una función de easing (easeOut) para una animación más suave
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      this.displayRiskScore = Math.round(this.institutionalRiskScore * easedProgress);

      if (currentFrame === totalFrames) {
        clearInterval(counter);
        this.displayRiskScore = this.institutionalRiskScore; // Asegurar que el valor final sea exacto
      }
    }, frameRate);
  }

  /**
   * Devuelve el ángulo de rotación para la aguja del velocímetro.
   * El arco va de -90 grados (valor 0) a +90 grados (valor 100).
   * @returns Una cadena de texto para la propiedad CSS 'transform'.
   */
  getGaugeRotation(): string {
    const angle = -90 + (this.institutionalRiskScore / 100) * 180;
    return `${angle}deg`;
  }
  
  /**
   * Devuelve la clase de color para una celda del mapa de calor 
   * basada en su nivel de riesgo.
   * @param riskLevel El nivel de riesgo (1-5).
   * @returns La clase CSS correspondiente.
   */
  getHeatmapCellClass(riskLevel: number): string {
    return `risk-level-${riskLevel}`;
  }

  /**
   * Genera el estilo CSS 'background' para el gráfico de pastel 
   * utilizando un gradiente cónico.
   * @returns Un objeto de estilo para [style].
   */
  getPieChartStyle(): object {
    const { low, moderate, high } = this.clientDistribution;
    // Se definen los porcentajes de parada de color para el gradiente
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

   getGaugeDashOffset(): number {
    const totalLength = 157; // Longitud del arco del semicírculo (π * r)
    const percentage = this.institutionalRiskScore / 100;
    return totalLength * (1 - percentage);
  }

  getRiskColor(): string {
    if (this.institutionalRiskScore <= 40) return '#28a745'; // Verde
    if (this.institutionalRiskScore <= 70) return '#ffc107'; // Amarillo
    return '#dc3545'; // Rojo
  }

  getRiskLabel(): string {
    if (this.institutionalRiskScore <= 40) return 'Bajo';
    if (this.institutionalRiskScore <= 70) return 'Moderado';
    return 'Alto';
  }

   getNeedleRotation(): string {
    // El -90 es el punto de partida (izquierda)
    // El 180 es el arco total a recorrer (de -90 a +90)
    const angle = -90 + (this.displayRiskScore / 100) * 180;
    return `rotate(${angle}deg)`;
  }

}