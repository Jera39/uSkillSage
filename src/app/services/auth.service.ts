import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://uskillsage-back.onrender.com/api';
  // private apiUrl = 'http://localhost:3000/api';

  private tokenKey = 'authToken';
  private userKey = 'currentUser'; 

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

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token; // Devuelve true si el token existe, false si no
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem(this.userKey) || '{}');
    return user.isAdmin === true; // Verifica si el usuario es administrador
  }

  setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user)); // Almacena los datos del usuario
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
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

  manageCategories(action: string, categoryId?: string, categoryData?: any): Observable<any> {
    switch (action.toUpperCase()) {
      case 'C': // Crear una categoría
        return this.http.post(`${this.apiUrl}/categories?action=C`, categoryData);

      case 'U': // Actualizar una categoría
        if (!categoryId) throw new Error('El ID de la categoría es obligatorio para actualizar.');
        return this.http.put(`${this.apiUrl}/categories/${categoryId}?action=U`, categoryData);

      case 'D': // Desactivar una categoría
        if (!categoryId) throw new Error('El ID de la categoría es obligatorio para desactivar.');
        return this.http.delete(`${this.apiUrl}/categories/${categoryId}?action=D`);

      case 'G': // Obtener todas las categorías activas
        return this.http.get(`${this.apiUrl}/categories?action=G`);

      default:
        throw new Error('Acción no válida. Usa "C", "U", "D" o "G".');
    }
  }

  getGenresForCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/genres`);
  }
}
