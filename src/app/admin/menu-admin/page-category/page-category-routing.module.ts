import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageCategoryPage } from './page-category.page';

const routes: Routes = [
  {
    path: '',
    component: PageCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageCategoryPageRoutingModule {}
