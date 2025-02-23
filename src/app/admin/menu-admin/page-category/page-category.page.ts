import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.page.html',
  styleUrls: ['./page-category.page.scss'],
  standalone: false,
})
export class PageCategoryPage implements OnInit {

  view_add_input: Boolean = false; // Controla la visibilidad del formulario
  name_category: string = ''; // Nombre de la categoría
  description: string = ''; // Descripción de la categoría
  off_input: boolean = true; // Controla si los inputs están deshabilitados
  tipoBoton: string = 'Agregar'; // Texto del botón (Agregar o Actualizar)
  datalistCategory: any = []; // Lista de categorías
  editingCategoryId: string | null = null; // ID de la categoría en edición

  constructor(
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private menuController: MenuController,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.obtenerCategories(); // Obtener las categorías al cargar la página
  }

  // Navegar de regreso al menú
  backMenu() {
    this.router.navigate(['/menu-admin'], { replaceUrl: true }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 0);
    });
  }

  // Iniciar el formulario para agregar una nueva categoría
  NuevoCategoria() {
    this.view_add_input = true;
    this.name_category = '';
    this.description = '';
    this.off_input = false;
    this.tipoBoton = 'Agregar';
    this.editingCategoryId = null;
  }

  // Cancelar la edición o creación de una categoría
  Cancelar() {
    this.view_add_input = false;
    this.name_category = '';
    this.description = '';
    this.off_input = true;
    this.tipoBoton = 'Agregar';
    this.editingCategoryId = null;
  }

  // Agregar o actualizar una categoría
  async agregarCategoria() {
    if (!this.name_category.trim() || !this.description.trim()) {
      return; // Evitar enviar datos vacíos
    }

    try {
      const categoryData = {
        name: this.name_category.trim(),
        description: this.description.trim(),
      };

      if (this.editingCategoryId) {
        // Actualizar categoría existente
        await this.authService.manageCategories('U', this.editingCategoryId, categoryData).toPromise();
        this.presentAlert('Categoría actualizada exitosamente.');
      } else {
        // Crear una nueva categoría
        await this.authService.manageCategories('C', undefined, categoryData).toPromise();
        this.presentAlert('Categoría agregada exitosamente.');
      }

      this.Cancelar(); // Limpiar el formulario
      this.obtenerCategories(); // Actualizar la lista de categorías
    } catch (error) {
      console.error('Error al agregar/actualizar la categoría:', error);
      this.presentAlert('Error al procesar la solicitud.');
    }
  }

  // Editar una categoría existente
  editCategory(data: any) {
    this.view_add_input = true;
    this.name_category = data.name;
    this.description = data.description;
    this.off_input = false;
    this.tipoBoton = 'Actualizar';
    this.editingCategoryId = data.id; // Guardar el ID de la categoría en edición
  }

  // Mostrar alerta de confirmación para desactivar una categoría
  async AlertaEliminar(data: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Estás seguro de que deseas desactivar la categoría "${data.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Desactivar',
          handler: async () => {
            try {
              await this.authService.manageCategories('D', data.id).toPromise();
              this.presentAlert('Categoría desactivada exitosamente.');
              this.obtenerCategories(); // Actualizar la lista de categorías
            } catch (error) {
              console.error('Error al desactivar la categoría:', error);
              this.presentAlert('Error al desactivar la categoría.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Obtener todas las categorías
  async obtenerCategories() {
    try {
      const response: any = await this.authService.manageCategories('G').toPromise();
      this.datalistCategory = response; // Asignar la lista de categorías
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      this.presentAlert('Error al cargar las categorías.');
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