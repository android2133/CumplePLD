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
  fecha: string;
  description: string;
  monto_mxn: number;
}

interface TransactionHistoryItem {
  date: string;
  description: string;
  amount: number;
  client: string;
  paymentMethod:string;
  operationType:string;
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
    { id: '#1', fecha: '9/1/2025', description: 'Compra de inmueble en efectivo', monto_mxn: 3200000 },
    { id: '#2', fecha: '9/3/2025', description: 'Arrendamiento de inmueble con pagos fraccionados', monto_mxn: 550000 },
    { id: '#3', fecha: '9/5/2025', description: 'Venta de joyas con pago en criptomonedas', monto_mxn: 780000 },
    { id: '#4', fecha: '9/7/2025', description: 'Donativo atípico a asociación civil', monto_mxn: 1200000 },
    { id: '#5', fecha: '9/9/2025', description: 'Compra de vehículo de lujo por PEP', monto_mxn: 2500000 },
    { id: '#6', fecha: '9/10/2025', description: 'Compras recurrentes de metales preciosos con distintos beneficiarios', monto_mxn: 900000 },
    { id: '#7', fecha: '9/12/2025', description: 'Blindaje de vehículos para cliente extranjero', monto_mxn: 1800000 },
    { id: '#8', fecha: '9/14/2025', description: 'Transferencia internacional para adquisición de obra de arte', monto_mxn: 1600000 },
    { id: '#9', fecha: '9/16/2025', description: 'Compra de inmuebles usando intermediarios', monto_mxn: 4000000 }
  ];

transactionHistory: TransactionHistoryItem[] = [
  { date: '2025-09-01', client: 'Juan Pérez', description: 'Compra de inmueble en CDMX', amount: 3200000, paymentMethod: 'Efectivo', operationType: 'Compraventa inmueble' },
  { date: '2025-09-02', client: 'María Gómez', description: 'Renta mensual de local comercial', amount: 92000, paymentMethod: 'Transferencia', operationType: 'Arrendamiento' },
  { date: '2025-09-03', client: 'Juan Pérez', description: 'Compra de reloj de lujo', amount: 180000, paymentMethod: 'Tarjeta de crédito', operationType: 'Venta de joyería' },
  { date: '2025-09-04', client: 'Fundación Vida', description: 'Donativo único', amount: 1200000, paymentMethod: 'Transferencia', operationType: 'Donativo' },
  { date: '2025-09-05', client: 'Carlos Ruiz', description: 'Compra de vehículo blindado', amount: 1800000, paymentMethod: 'Transferencia', operationType: 'Blindaje' },
  { date: '2025-09-06', client: 'Sofía Martínez', description: 'Compra de obra de arte', amount: 1600000, paymentMethod: 'Transferencia int.', operationType: 'Venta de arte' },
  { date: '2025-09-07', client: 'Inversiones Delta', description: 'Compra de 3 inmuebles en 2 semanas', amount: 4000000, paymentMethod: 'Transferencia', operationType: 'Compraventa inmueble' },
  { date: '2025-09-08', client: 'Pedro Sánchez', description: 'Compra de joyas con criptomonedas', amount: 780000, paymentMethod: 'Criptomoneda', operationType: 'Venta de joyería' },
  { date: '2025-09-09', client: 'Laura Torres', description: 'Renta de 4 departamentos en zona turística', amount: 2200000, paymentMethod: 'Transferencia', operationType: 'Arrendamiento' },
  { date: '2025-09-10', client: 'Jorge Herrera', description: 'Compra de lingotes de oro', amount: 900000, paymentMethod: 'Efectivo', operationType: 'Venta de metales preciosos' },
  { date: '2025-09-11', client: 'Ana López', description: 'Renta mensual de oficina', amount: 85000, paymentMethod: 'Transferencia', operationType: 'Arrendamiento' },
  { date: '2025-09-12', client: 'Corporativo Zeta', description: 'Blindaje de flotilla de vehículos', amount: 5400000, paymentMethod: 'Transferencia', operationType: 'Blindaje' },
  { date: '2025-10-01', client: 'Juan Pérez', description: 'Compra de inmueble en CDMX', amount: 3800000, paymentMethod: 'Efectivo', operationType: 'Compraventa inmueble' },
  { date: '2025-09-07', client: 'Juan Pérez', description: 'Compra de inmueble en CDMX', amount: 2600000, paymentMethod: 'Efectivo', operationType: 'Compraventa inmueble' },
  { date: '2025-09-05', client: 'Juan Pérez', description: 'Compra de inmueble en CDMX', amount: 5700000, paymentMethod: 'Efectivo', operationType: 'Compraventa inmueble' }
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