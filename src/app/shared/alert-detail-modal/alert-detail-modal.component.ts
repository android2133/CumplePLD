import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

// Interfaz para los datos que recibirá el modal
export interface AlertData {
  id: string;
  cliente: string;
  fecha: string;
  monto: number;
  coincidencias: string[];
}

@Component({
  selector: 'app-alert-detail-modal',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatSelectModule, MatFormFieldModule, FormsModule, MatCardModule
  ],
  templateUrl: './alert-detail-modal.component.html',
  styleUrls: ['./alert-detail-modal.component.scss']
})
export class AlertDetailModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AlertDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertData
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}