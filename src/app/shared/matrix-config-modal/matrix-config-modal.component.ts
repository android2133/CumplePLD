import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-matrix-config-modal',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatTableModule, MatSliderModule, FormsModule
  ],
  templateUrl: './matrix-config-modal.component.html',
  styleUrls: ['./matrix-config-modal.component.scss']
})
export class MatrixConfigModalComponent {
  riskVariables = [
    { name: 'Antigüedad del Cliente', weight: 30 },
    { name: 'Tipo de Operación', weight: 50 },
    { name: 'Geografía', weight: 10 },
    { name: 'Volumen Transaccional', weight: 10 },
  ];
  displayedColumns: string[] = ['name', 'weight', 'actions'];

  constructor(public dialogRef: MatDialogRef<MatrixConfigModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}