import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

// Definición de interfaces para los datos del cliente
interface ClientDocument {
  name: string;
  status: 'Vigente' | 'Por Vencer' | 'Vencido';
}

interface LinkedAlert {
  id: string;
  description: string;
}

interface TransactionHistoryItem {
  date: string;
  description: string;
  amount: number;
}

@Component({
  selector: 'app-client-360',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatIconModule,
    MatProgressBarModule, MatListModule, MatChipsModule
  ],
  templateUrl: './client-360.component.html',
  styleUrls: ['./client-360.component.scss']
})
export class Client360Component implements OnInit {

  // --- Datos Simulados para "Juan Pérez" ---
  clientInfo = {
    name: 'Juan Pérez',
    rfc: 'PEPJ800101ABC',
    status: 'Activo',
    riskScore: 85 // Un valor de 0 a 100
  };

  documents: ClientDocument[] = [
    { name: 'Identificación Oficial', status: 'Vigente' },
    { name: 'Comprobante de Domicilio', status: 'Por Vencer' }
  ];

  linkedAlerts: LinkedAlert[] = [
    { id: '#1138', description: 'Compra Inusual de Boletos' },
    { id: '#1055', description: 'Depósitos en Efectivo' },
    { id: '#974', description: 'Transferencia Internacional' },
    { id: '#812', description: 'Retiro en Efectivo' }
  ];
  
  transactionHistory: TransactionHistoryItem[] = [
    { date: '2025-09-20', description: 'Compra Boletos Rifa', amount: 100000 },
    { date: '2025-09-05', description: 'Depósito', amount: 25000 },
    { date: '2025-08-28', description: 'Retiro', amount: 5000 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Función para determinar el color de la barra de riesgo
  getRiskColor(): 'primary' | 'accent' | 'warn' {
    if (this.clientInfo.riskScore <= 40) {
      return 'primary'; // Riesgo bajo (azul)
    } else if (this.clientInfo.riskScore <= 70) {
      return 'accent'; // Riesgo moderado (amarillo)
    } else {
      return 'warn'; // Riesgo alto (rojo)
    }
  }

  // Función para determinar la clase CSS del chip de estado del documento
  getDocumentStatusClass(status: string): string {
    switch (status) {
      case 'Vigente': return 'chip-success';
      case 'Por Vencer': return 'chip-warning';
      case 'Vencido': return 'chip-danger';
      default: return '';
    }
  }
}