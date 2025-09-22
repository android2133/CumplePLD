import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcrService } from '../../../services/ocr.service';
// ... Importaciones de Angular Material ...
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, 
    MatTabsModule, MatIconModule, MatButtonModule, MatExpansionModule
  ],
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  clientForm: FormGroup;
  validationResults: any[] = [];
  ocrDetails: any = null;

  constructor(private fb: FormBuilder, private ocrService: OcrService) {
    this.clientForm = this.fb.group({
      nombre: ['José Pérez'],
      rfc: ['PEPJ7701012B7']
    });
  }

  ngOnInit(): void {
    this.ocrService.startSession().subscribe();
  }

  onFileDropped(event: any): void {
    // Simulación de subida de archivo
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64 = e.target.result.split(',')[1];
        // Asumimos que es un Comprobante de Domicilio para la demo
        this.callOcrService(base64, 'INVEX_COMPROBANTE_DE_DOMICILIO');
      };
      reader.readAsDataURL(file);
    }
  }

  callOcrService(base64: string, format: string): void {
    this.ocrService.extractEntities(base64, format).subscribe({
      next: (response) => {
        if (response.exito) {
          const data = response.data;
          this.validationResults = data.validaciones_documento.validaciones;
          this.ocrDetails = data.extracted_data;

          // Simulación de auto-llenado
          if (format === 'IDENTIFICACION_OFICIAL') {
            this.clientForm.get('nombre')?.setValue(data.extracted_data.nombre);
          }
          if (format === 'COMPROBANTE_FISCAL') {
            this.clientForm.get('rfc')?.setValue(data.extracted_data.rfc);
          }
        }
      },
      error: (err) => console.error('Error en el servicio OCR', err)
    });
  }
}