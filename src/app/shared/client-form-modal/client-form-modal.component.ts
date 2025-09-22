import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // <-- Importar Spinner
import { OcrService } from '../../services/ocr.service';


// Interfaces para un mejor manejo de tipos
interface ValidationResult {
  resultado: boolean;
  explicacion: string;
  validacion: string;
}

interface DocumentState {
  label: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  fileName?: string;
  format: string;
}

@Component({
  selector: 'app-client-form-modal',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatTabsModule, MatIconModule, MatButtonModule, MatExpansionModule, MatProgressSpinnerModule
  ],
  templateUrl: './client-form-modal.component.html',
  styleUrls: ['./client-form-modal.component.scss']
})
export class ClientFormModalComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  validationResults: ValidationResult[] = [];
  ocrDetails: { [key: string]: any } = {};
  
  // Objeto para manejar el estado de cada documento
  documentStates: { [key: string]: DocumentState } = {
    identificacion: { label: 'Identificación Oficial', status: 'idle', format: "PLD_IDENTIFICACION" },
    csf: { label: 'Comprobante Fiscal (CSF)', status: 'idle', format: "PLD_CSF" },
    curp: { label: 'CURP', status: 'idle', format: "PDL_CURP" },
    domicilio: { label: 'Comprobante de Domicilio', status: 'idle', format: "PDL_COMPROBANTE_DOMICILIO" }
  };

  // Helper para iterar sobre los estados en la plantilla
  documentKeys = Object.keys(this.documentStates);

  constructor(
    private fb: FormBuilder,
    private ocrService: OcrService,
    public dialogRef: MatDialogRef<ClientFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clientForm = this.fb.group({
      nombre: ['', Validators.required],
      rfc: ['', Validators.required]
    });

    if (this.data) {
      this.isEditMode = true;
      this.clientForm.patchValue(this.data);
    }
  }

  ngOnInit(): void {
    this.ocrService.startSession().subscribe();
  }

  onFileChange(event: any, docKey: string): void {
    const file = event.target.files[0];
    if (!file) return;

    this.documentStates[docKey].status = 'loading';
    this.documentStates[docKey].fileName = file.name;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64 = e.target.result.split(',')[1];
      this.callOcrService(base64, docKey);
    };
    reader.readAsDataURL(file);
  }

  callOcrService(base64: string, docKey: string): void {
    const format = this.documentStates[docKey].format;
    this.ocrService.extractEntities(base64, format).subscribe({
      next: (response) => {
        if (response.exito && response.data) {
          this.documentStates[docKey].status = 'success';
          this.validationResults.push(...response.data.validaciones_documento.validaciones);
          this.ocrDetails[docKey] = response.data.extracted_data;

          if (response.data.extracted_data.nombre && this.clientForm.get('nombre')?.value === '') {
            this.clientForm.get('nombre')?.setValue(response.data.extracted_data.nombre);
          }
          if (response.data.extracted_data.rfc && this.clientForm.get('rfc')?.value === '') {
            this.clientForm.get('rfc')?.setValue(response.data.extracted_data.rfc);
          }
        } else {
          this.documentStates[docKey].status = 'error';
        }
      },
      error: (err) => {
        console.error('Error en el servicio OCR', err);
        this.documentStates[docKey].status = 'error';
      }
    });
  }

  hasOcrDetails(): boolean {
    return Object.keys(this.ocrDetails).length > 0;
  }

  save(): void {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}