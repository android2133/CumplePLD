import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'; // 'of' simula una respuesta de API
import { MOCK_TRANSACTIONS } from '../data/mock-transactions';

@Injectable({
  providedIn: 'root'
})
export class PldApiService {
  constructor() { }

  getTransactions(): Observable<any[]> {
    // Simulamos una respuesta asíncrona como si fuera una API real
    return of(MOCK_TRANSACTIONS);
  }
}