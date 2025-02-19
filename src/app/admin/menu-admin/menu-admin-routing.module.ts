import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAdminPage } from './menu-admin.page';

const routes: Routes = [
  {
    path: '',
    component: MenuAdminPage,
    children: [
      {
        path: 'page-genres',
        loadChildren: () => import('./page-genres/page-genres.module').then( m => m.PageGenresPageModule)
      },
    
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAdminPageRoutingModule {}
