import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

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
    private router: Router
  ) { }

  view_add_input: Boolean = false;
  name_genre: string = '';
  off_input: boolean = true;
  tipoBoton: string = 'Agregar';
  datalistgenre: any = [];

  ngOnInit() {
  }

  backMenu(){
    this.router.navigate(['/menu-admin'], { replaceUrl: true }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 0);
    });
  }

  NuevoGenero(){
    this.view_add_input = true;
    this.name_genre = '';
    this.off_input = false;
  }

  Cancelar(){
    this.view_add_input = false;
    this.name_genre = '';
    this.off_input = true;
  }

  agregarGenero(){

  }

  editargenre(data: any, indice: any){

  }

  AlertaEliminar(data: any, indice: any){

  }
}
