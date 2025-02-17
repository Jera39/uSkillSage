import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutaInicialPage } from './ruta-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: RutaInicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutaInicialPageRoutingModule {}
