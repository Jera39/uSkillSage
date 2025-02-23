import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageCategoryPageRoutingModule } from './page-category-routing.module';

import { PageCategoryPage } from './page-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageCategoryPageRoutingModule
  ],
  declarations: [PageCategoryPage]
})
export class PageCategoryPageModule {}
