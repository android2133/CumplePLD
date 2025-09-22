import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfReportService {

  constructor() { }

  /**
   * Genera un reporte en PDF a partir de un elemento HTML.
   * @param elementId El ID del elemento HTML que contiene el reporte.
   * @param fileName El nombre del archivo PDF a generar.
   */
  public generatePdf(elementId: string, fileName: string): void {
    const reportElement = document.getElementById(elementId);

    if (!reportElement) {
      console.error(`Elemento con id "${elementId}" no encontrado.`);
      return;
    }

    // Usamos html2canvas para tomar una "captura" del elemento
    html2canvas(reportElement, {
      scale: 2, // Aumentamos la escala para mejorar la calidad de la imagen
      useCORS: true 
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter' // Formato carta
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${fileName}.pdf`);
    });
  }
}