import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// URL base de la API (usando un proxy para evitar CORS)
const API_BASE_URL = 'https://webcontentdevnuevo.ies-webcontent.com.mx/webcontent-ocr/mini-prod/ocr/api/ocr';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private sessionId: string | null = null;

  constructor(private http: HttpClient) { }

  // Inicia una nueva sesión y guarda el ID
  startSession(): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/start-session`, {}).pipe(
      tap(response => {
        this.sessionId = response.sesion_id;
        console.log('Sesión iniciada:', this.sessionId);
      })
    );
  }

  // Extrae entidades de un documento en Base64
  extractEntities(base64: string, format: string): Observable<any> {
    if (!this.sessionId) {
      throw new Error('La sesión no ha sido iniciada.');
    }

    const payload = {
      base64: base64,
      mimetype: "application/pdf", // O el mimetype correcto
      formato: format,
      sesion_id: this.sessionId
    };

    return this.http.post<any>(`${API_BASE_URL}/extract-entities`, payload);
  }
}