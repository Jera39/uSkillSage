import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'https://uskillsage-back.onrender.com/api';
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

    /**
   * Método genérico para gestionar géneros narrativos.
   * @param action - Acción a realizar ('C': Crear, 'U': Actualizar, 'D': Desactivar, 'G': Obtener)
   * @param genreId - ID del género (requerido para 'U' y 'D')
   * @param genreData - Datos del género (requerido para 'C' y 'U')
   * @returns Observable con la respuesta del backend
   */

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  manageGenres(action: string, genreId?: string, genreData?: any): Observable<any> {
    switch (action.toUpperCase()) {
      case 'C': // Crear un género
        return this.http.post(`${this.apiUrl}/genres?action=C`, genreData);

      case 'U': // Actualizar un género
        if (!genreId) throw new Error('El ID del género es obligatorio para actualizar.');
        return this.http.put(`${this.apiUrl}/genres/${genreId}?action=U`, genreData);

      case 'D': // Desactivar un género
        if (!genreId) throw new Error('El ID del género es obligatorio para desactivar.');
        return this.http.delete(`${this.apiUrl}/genres/${genreId}?action=D`);

      case 'G': // Obtener todos los géneros
        return this.http.get(`${this.apiUrl}/genres?action=G`);

      default:
        throw new Error('Acción no válida. Usa "C", "U", "D" o "G".');
    }
  }
}
