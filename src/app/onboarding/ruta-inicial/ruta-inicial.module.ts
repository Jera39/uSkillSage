import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutaInicialPageRoutingModule } from './ruta-inicial-routing.module';

import { RutaInicialPage } from './ruta-inicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutaInicialPageRoutingModule
  ],
  declarations: [RutaInicialPage]
})
export class RutaInicialPageModule {}
