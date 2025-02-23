import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  credentials = {
    identifier: '', // Puede ser heroName o email
    password: ''
  };
  
  error: string | null = null;

  constructor(
    private authService: AuthService, 
    private navCtrl: NavController, 
    private router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  backHome(){
    this.navCtrl.navigateRoot('/home');
  }

  async login() {
    try {
      // Verificar que los campos no estén vacíos
      if (!this.credentials.identifier || !this.credentials.password) {
        this.error = 'Por favor, completa todos los campos.';
        this.showAlert('Error', this.error);
        return;
      }
  
      const response = await this.authService.login(this.credentials).toPromise();
      console.log('Inicio de sesión exitoso:', response);
  
      // Guardar información del usuario en el almacenamiento local
      localStorage.setItem('user', JSON.stringify(response.user));
  
      // Redirigir al home después del login
      this.router.navigate(['/home']);
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);
  
      // Almacenar el mensaje de error en la variable `error`
      if (err.error && err.error.error) {
        this.error = err.error.error; // Mensaje del backend
      } else {
        this.error = 'Hubo un problema al iniciar sesión.';
      }
  
      // Mostrar una alerta con el mensaje de error
      this.showAlert('Error', this.error || 'Ocurrió un error inesperado.');
    }
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
