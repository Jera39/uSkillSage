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
        loadChildren: () => import('./page-genres/page-genres.module').then(m => m.PageGenresPageModule)
      },
      {
        path: 'page-category',
        loadChildren: () => import('./page-category/page-category.module').then(m => m.PageCategoryPageModule)
      }, 
      {
        path: 'page-subcategory',
        loadChildren: () => import('./page-subcategory/page-subcategory.module').then(m => m.PageSubcategoryPageModule)
      },

    ]
  },






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAdminPageRoutingModule { }
