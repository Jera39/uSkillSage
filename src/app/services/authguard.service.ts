import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Verifica si el usuario es administrador
      if (this.authService.isAdmin()) {
        this.router.navigate(['/menu-admin']); // Redirige a menu-admin
      } else {
        this.router.navigate(['/ruta-inicial']); // Redirige a ruta-inicial
      }
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false; // Bloquea el acceso
    }
  }
}
