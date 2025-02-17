import { AuthService } from './../../services/auth.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  generoNarrativo: string = ''
  imagenFondo: string = ''


  user = {
    heroName: '', // Nombre del héroe
    email: '',    // Correo electrónico
    genre: '',    // Género narrativo
    gender: '',
    password: ''  // Contraseña
  };

  error: string | null = null;

  constructor(
    private navCtrl: NavController, 
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  backHome(){
    this.navCtrl.back();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['generoNarrativo']) {
      this.imagenFondo = this.fondo();
    }
  }

  async register() {
    try {
      const response = await this.authService.register(this.user).toPromise();
      console.log('Registro exitoso:', response);
      this.router.navigate(['/login']); // Redirigir al login después del registro
    } catch (err: any) {
      console.error('Error al registrar:', err);
  
      // Almacenar el mensaje de error en la variable `error`
      if (err.error && err.error.error) {
        this.error = err.error.error; // Mensaje del backend
      } else {
        this.error = 'Hubo un problema al registrar el usuario.';
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

  claseFondo() {
    switch (this.user.genre) {
      case 'Fantasía':
        return 'fondo-fantasy';
      case 'Ciencia Ficción':
        return 'fondo-sci-fi';
      case 'Mitología':
        return 'fondo-mitology';
      default:
        return 'fondo-default';
    }
  }

  fondo() {
    switch (this.user.genre) {
      case 'Fantasía':
        return 'https://i.postimg.cc/KY3wr7xx/fantasy-6835790.jpg';
      case 'Ciencia Ficción':
        return 'https://i.postimg.cc/ryfjs02J/ai-generated-8548276.jpg';
      case 'Mitología':
        return 'https://i.postimg.cc/8k4KvXML/dragon-9017341-1920.png';
      default:
        return 'https://i.postimg.cc/qqWCndLk/warrior-7795480.jpg';
    }
  }

}
