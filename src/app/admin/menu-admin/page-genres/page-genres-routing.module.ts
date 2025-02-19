import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageGenresPage } from './page-genres.page';

const routes: Routes = [
  {
    path: '',
    component: PageGenresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageGenresPageRoutingModule {}
