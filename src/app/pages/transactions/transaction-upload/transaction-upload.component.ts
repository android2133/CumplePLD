import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropDirective } from '../../../directives/drag-drop.directive';
import { ExcelService } from '../../../services/excel.service';
import * as XLSX from 'xlsx';

type ConnectionStatus = 'CONECTADO' | 'CONECTANDO' | 'DESCONECTADO';

@Component({
  selector: 'app-transaction-upload',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule,
    MatChipsModule, MatDialogModule, DragDropDirective, MatTableModule, MatProgressBarModule
  ],
  templateUrl: './transaction-upload.component.html',
  styleUrls: ['./transaction-upload.component.scss']
})
export class TransactionUploadComponent implements OnInit {
  dataSources: { name: string, status: ConnectionStatus }[] = [];
  
  file: File | null = null;
  excelData: any[] = [];
  displayedColumns: string[] = ['FECHA', 'Cliente', 'Operación', 'Monto'];
  
  isSimulating = false;
  uploadSuccess = false;

  constructor(
    public dialogRef: MatDialogRef<TransactionUploadComponent>,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.dataSources = [
      { name: 'ERP', status: 'DESCONECTADO' },
      { name: 'API', status: 'DESCONECTADO' },
      { name: 'SAP', status: 'DESCONECTADO' },
    ];
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File): void {
    if (file.type.includes('spreadsheetml') || file.name.endsWith('.xlsx')) {
      this.file = file;
      this.excelData = []; // Resetea la previsualización si se sube un nuevo archivo
    } else {
      alert('Por favor, sube un archivo de Excel válido (.xlsx).');
      this.file = null;
    }
  }

  // NUEVO: Borra el archivo seleccionado y la previsualización
  clearFile(): void {
    this.file = null;
    this.excelData = [];
  }

  // Carga el archivo en la tabla de previsualización
  loadFileForPreview(): void {
    if (!this.file) return;
    this.parseExcelFile(this.file);
  }

  parseExcelFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: false });

      // **AQUÍ ESTÁ LA CORRECCIÓN**
      // Limpiamos la columna "Monto" de cada fila
      this.excelData = jsonData.map(row => {
        if (row.Monto && typeof row.Monto === 'string') {
          // Elimina las comas y convierte el texto a un número
          row.Monto = parseFloat(row.Monto.replace(/,/g, ''));
        }
        return row;
      });
    };
    reader.readAsArrayBuffer(file);
  }

  // Inicia la simulación y guarda al finalizar
  validateAndSave(): void {
    this.isSimulating = true;
    this.uploadSuccess = false;

    this.dataSources.forEach((source, index) => {
      setTimeout(() => {
        source.status = 'CONECTANDO';
        setTimeout(() => {
          source.status = 'CONECTADO';
          if (index === this.dataSources.length - 1) {
            this.completeUpload();
          }
        }, 1000);
      }, index * 1000);
    });
  }

  completeUpload(): void {
    setTimeout(() => {
      this.uploadSuccess = true;
      setTimeout(() => {
        this.dialogRef.close({ success: true, data: this.excelData });
      }, 2000);
    }, 1000);
  }
  
  downloadTemplate(): void {
    this.excelService.downloadProfessionalTemplate(); // Descarga con datos de ejemplo
  }

  close(): void {
    this.dialogRef.close();
  }
}