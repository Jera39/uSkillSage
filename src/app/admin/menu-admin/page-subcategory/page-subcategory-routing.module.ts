import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSubcategoryPage } from './page-subcategory.page';

const routes: Routes = [
  {
    path: '',
    component: PageSubcategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSubcategoryPageRoutingModule {}
