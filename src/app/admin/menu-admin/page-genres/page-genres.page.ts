import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-page-genres',
  templateUrl: './page-genres.page.html',
  styleUrls: ['./page-genres.page.scss'],
  standalone: false,
})
export class PageGenresPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private menuController: MenuController,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
  ) { }

  view_add_input: Boolean = false;
  name_genre: string = '';
  image_genre: string = '';
  welcomeMessageMale: string = '';
  welcomeMessageFemale: string = '';
  off_input: boolean = true;
  tipoBoton: string = 'Agregar';
  datalistgenre: any = [];
  editingGenreId: string | null = null;

  ngOnInit() {
    this.obtenerGenres();
  }

  backMenu() {
    this.router.navigate(['/menu-admin'], { replaceUrl: true }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 0);
    });
  }

  NuevoGenero() {
    this.view_add_input = true;
    this.name_genre = '';
    this.image_genre = '';
    this.welcomeMessageMale = '';
    this.welcomeMessageFemale = '';
    this.off_input = false;
    this.tipoBoton = 'Agregar';
    this.editingGenreId = null;
  }

  Cancelar() {
    this.view_add_input = false;
    this.name_genre = '';
    this.image_genre = '';
    this.welcomeMessageMale = '';
    this.welcomeMessageFemale = '';
    this.off_input = true;
    this.tipoBoton = 'Agregar';
    this.editingGenreId = null; 
  }

  // Agregar o actualizar un género
  async agregarGenero() {
    if (!this.name_genre.trim() || !this.image_genre.trim() || !this.welcomeMessageMale.trim() || !this.welcomeMessageFemale.trim()) {
      return; // Evitar enviar datos vacíos
    }

    try {
      const genreData = {
        name: this.name_genre.trim(),
        image: this.image_genre.trim(),
        welcomeMessageMale: this.welcomeMessageMale.trim(),
        welcomeMessageFemale: this.welcomeMessageFemale.trim(),
      };

      if (this.editingGenreId) {
        // Actualizar género existente
        await this.authService.manageGenres('U', this.editingGenreId, genreData).toPromise();
        this.presentAlert('Género actualizado exitosamente.');
      } else {
        // Crear un nuevo género
        await this.authService.manageGenres('C', undefined, genreData).toPromise();
        this.presentAlert('Género agregado exitosamente.');
      }

      this.Cancelar(); // Limpiar el formulario
      this.obtenerGenres(); // Actualizar la lista de géneros
    } catch (error) {
      console.error('Error al agregar/actualizar el género:', error);
      this.presentAlert('Error al procesar la solicitud.');
    }
  }

  // Editar un género
  editargenre(data: any, indice: number) {
    this.view_add_input = true;
    this.name_genre = data.name;
    this.image_genre = data.image;
    this.welcomeMessageMale = data.welcomeMessageMale;
    this.welcomeMessageFemale = data.welcomeMessageFemale;
    this.off_input = false;
    this.tipoBoton = 'Actualizar';
    this.editingGenreId = data.id; // Guardar el ID del género en edición
  }

  // Mostrar alerta de confirmación para desactivar un género
  async AlertaEliminar(data: any, indice: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Estás seguro de que deseas desactivar el género "${data.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Desactivar',
          handler: async () => {
            try {
              await this.authService.manageGenres('D', data.id).toPromise();
              this.presentAlert('Género desactivado exitosamente.');
              this.obtenerGenres(); // Actualizar la lista de géneros
            } catch (error) {
              console.error('Error al desactivar el género:', error);
              this.presentAlert('Error al desactivar el género.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async obtenerGenres() {
    try {
      const response: any = await this.authService.manageGenres('G').toPromise();
      this.datalistgenre = response; // Asignar la lista de géneros
      console.log('datalistgenre', JSON.stringify(response));
    } catch (error) {
      console.error('Error al obtener los géneros:', error);
      this.presentAlert('Error al cargar los géneros.');
    }
  }

  // Mostrar una alerta genérica
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Notificación',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
