import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Se recomienda usar un proxy para esta URL en producción para evitar CORS
const AGENT_API_URL = 'https://agente-webcontent-pigae4vgqq-pv.a.run.app/api-agente/';

export interface ChatPayload {
  texto: string;
  contenidos?: any[];
  coleccion: string;
  historia: string; // El historial se envía como un string JSON
  instruccionesSistema?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatAgentService {
  constructor(private http: HttpClient) { }

  sendMessage(payload: ChatPayload): Observable<any> {
    return this.http.post<any>(AGENT_API_URL, payload);
  }
}