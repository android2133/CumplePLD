import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  /**
   * Crea un archivo de Excel a partir de una plantilla de cabeceras y lo descarga.
   * @param headers Las cabeceras para la plantilla (ej: ['FECHA', 'Cliente']).
   * @param fileName El nombre del archivo a descargar.
   */
  public downloadExcelTemplate(headers: string[], fileName: string): void {
    // Crea una hoja de trabajo vacía con solo las cabeceras
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers]);
    
    // Ajusta el ancho de las columnas (opcional, pero mejora la apariencia)
    ws['!cols'] = headers.map(() => ({ wch: 30 }));

    // Crea el libro de trabajo y añade la hoja
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Plantilla');

    // Escribe el archivo y lo descarga
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }


  public downloadProfessionalTemplate(): void {
    const fileName = 'Plantilla_Carga_Transacciones.xlsx';
    const headers = ['Fecha de la operación', 'Nombre o razón social del cliente', 'RFC del cliente', 'Tipo de operación','Descripción de la operación','Monto de la operación','Moneda','Medio de pago','Nombre del beneficiario final','RFC del beneficiario final'];

    // 1. Crear una hoja de trabajo vacía con las cabeceras
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers]);

    // 2. Definir estilos
    const headerStyle = {
      fill: { fgColor: { rgb: "000000" } }, // Fondo Negro
      font: { color: { rgb: "88ba1c" }, bold: true },
      alignment: { horizontal: 'center', vertical: 'center' }
    };
    
    // 3. Aplicar estilos a las celdas de la cabecera (A1, B1, C1, D1)
    headers.forEach((_header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      if (ws[cellAddress]) {
        ws[cellAddress].s = headerStyle;
      }
    });

    // 4. Ajustar el ancho de las columnas
    ws['!cols'] = [
      { wch: 20 }, // Fecha
      { wch: 40 }, // Cliente
      { wch: 30 }, // Operación
      { wch: 20 }  // Monto
    ];

    // 5. Crear el libro y descargar
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transacciones');
    
    // NOTA: La inserción de logos es una característica avanzada y compleja en js-xlsx.
    // Esta implementación se enfoca en los estilos, que es lo más robusto.
    
    XLSX.writeFile(wb, fileName);
  }
}