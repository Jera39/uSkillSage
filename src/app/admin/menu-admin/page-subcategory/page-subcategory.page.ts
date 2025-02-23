import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-subcategory',
  templateUrl: './page-subcategory.page.html',
  styleUrls: ['./page-subcategory.page.scss'],
  standalone: false,
})
export class PageSubcategoryPage implements OnInit {

  view_add_input: Boolean = false; // Controla la visibilidad del formulario
  name_subcategory: string = ''; // Nombre de la subcategoría
  description_subcategory: string = ''; // Descripción de la subcategoría
  off_input: boolean = true; // Controla si los inputs están deshabilitados
  tipoBoton: string = 'Agregar'; // Texto del botón (Agregar o Actualizar)
  subcategoriesList: any = []; // Lista de subcategorías
  categoriesList: any = []; // Lista de categorías
  selectedCategoryId: string = ''; // ID de la categoría seleccionada
  editingSubcategoryId: string | null = null; // ID de la subcategoría en edición
  selectedCategory: any = null; // Categoría seleccionada

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarCategorias(); // Cargar las categorías al iniciar
    this.cdr.detectChanges();
  }

  setOpen(isOpen: boolean) {
    this.view_add_input = isOpen;
  }

  backMenu() {
    this.router.navigate(['/menu-admin'], { replaceUrl: true }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 0);
    });
  }

  // Cargar las categorías desde el servidor
  async cargarCategorias() {
    try {
      const response: any = await this.authService.manageCategories('G').toPromise();
      this.categoriesList = response;
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
      this.presentAlert('Error al cargar las categorías.');
    }
  }

  // Cargar las subcategorías desde el servidor
  async cargarSubcategorias() {
    try {
      const response: any = await this.authService.manageCategories('G').toPromise();
      this.categoriesList = response;
      if (this.selectedCategoryId) {
        // Filtrar subcategorías por categoría seleccionada
        this.selectedCategory = response.find((cat: any) => cat.id === this.selectedCategoryId);
        this.subcategoriesList = this.selectedCategory ? this.selectedCategory.subcategories : [];
      } else {
        // Mostrar todas las categorías y sus subcategorías
        this.selectedCategory = null;
        this.subcategoriesList = response.flatMap((cat: any) => cat.subcategories || []);
      }
    } catch (error) {
      console.error('Error al cargar las subcategorías:', error);
      this.presentAlert('Error al cargar las subcategorías.');
    }
    this.cdr.detectChanges();
  }

  // Iniciar el formulario para agregar una nueva subcategoría
  nuevaSubcategoria(categoryId: string) {
    this.view_add_input = true;
    this.name_subcategory = '';
    this.description_subcategory = '';
    this.off_input = false;
    this.tipoBoton = 'Agregar';
    this.editingSubcategoryId = null;
    this.selectedCategoryId = categoryId; // Asignar la categoría seleccionada
  }

  // Cancelar la edición o creación de una subcategoría
  cancelarSubcategoria() {
    this.view_add_input = false;
    this.name_subcategory = '';
    this.description_subcategory = '';
    this.off_input = true;
    this.tipoBoton = 'Agregar';
    this.editingSubcategoryId = null;
  }

  // Guardar una nueva subcategoría (editar la categoría)
  async guardarSubcategoria() {
    if (!this.name_subcategory.trim() || !this.description_subcategory.trim() || !this.selectedCategoryId) {
      return; // Evitar enviar datos vacíos
    }
  
    try {
      const subcategoryData = {
        subcategory: {
          name: this.name_subcategory.trim(),
          description: this.description_subcategory.trim(),
        },
      };
  
      if (this.editingSubcategoryId) {
        // Estamos editando una subcategoría existente
        const categoria = this.categoriesList.find((cat: any) => cat.id === this.selectedCategoryId);
        if (categoria) {
          // Buscar la subcategoría que estamos editando
          const subcategoriaIndex = categoria.subcategories.findIndex((sub: any) => sub.id === this.editingSubcategoryId);
          if (subcategoriaIndex !== -1) {
            // Actualizar la subcategoría existente
            categoria.subcategories[subcategoriaIndex] = {
              ...categoria.subcategories[subcategoriaIndex],
              ...subcategoryData.subcategory,
            };
  
            // Enviar la categoría actualizada al servidor
            await this.authService.manageCategories('U', this.selectedCategoryId, { subcategories: categoria.subcategories }).toPromise();
            this.presentAlert('Subcategoría actualizada exitosamente.');
          }
        }
      } else {
        // Estamos creando una nueva subcategoría
        await this.authService.manageCategories('U', this.selectedCategoryId, subcategoryData).toPromise();
        this.presentAlert('Subcategoría agregada exitosamente.');
      }
  
      this.cancelarSubcategoria(); // Limpiar el formulario
      this.cargarSubcategorias(); // Actualizar la lista de subcategorías
    } catch (error) {
      console.error('Error al procesar la subcategoría:', error);
      this.presentAlert('Error al procesar la solicitud.');
    }
    this.cdr.detectChanges();
  }

  // Editar una subcategoría existente
  editarSubcategoria(subcategory: any) {
    this.view_add_input = true;
    this.name_subcategory = subcategory.name;
    this.description_subcategory = subcategory.description;
    this.off_input = false;
    this.tipoBoton = 'Actualizar';
    this.editingSubcategoryId = subcategory.id; // Guardar el ID de la subcategoría en edición
  }

  // Mostrar alerta de confirmación para eliminar una subcategoría
  async alertaEliminarSubcategoria(subcategory: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Estás seguro de que deseas eliminar la subcategoría "${subcategory.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              // Obtener la categoría actual
              const categoria = this.categoriesList.find((cat: any) => cat.id === this.selectedCategoryId);
  
              if (!categoria) {
                this.presentAlert('Categoría no encontrada.');
                return;
              }
  
              // Filtrar la lista de subcategorías para excluir la subcategoría que se desea eliminar
              const nuevasSubcategorias = categoria.subcategories.filter(
                (sub: any) => sub.id !== subcategory.id
              );
  
              // Actualizar la categoría con la nueva lista de subcategorías
              const updateData = {
                subcategories: nuevasSubcategorias, // Enviar la lista completa de subcategorías actualizada
              };
  
              await this.authService.manageCategories('U', this.selectedCategoryId, updateData).toPromise();
              this.presentAlert('Subcategoría eliminada exitosamente.');

              this.categoriesList = this.categoriesList.map((cat: any) =>
                cat.id === this.selectedCategoryId ? categoria : cat
              );
  
              // Actualizar la lista de subcategorías en la vista
              this.cargarSubcategorias();
            } catch (error) {
              console.error('Error al eliminar la subcategoría:', error);
              this.presentAlert('Error al eliminar la subcategoría.');
            }
          },
        },
      ],
    });
    this.cdr.detectChanges();
    await alert.present();
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