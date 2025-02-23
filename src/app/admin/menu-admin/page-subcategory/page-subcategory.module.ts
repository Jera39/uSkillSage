import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageSubcategoryPageRoutingModule } from './page-subcategory-routing.module';

import { PageSubcategoryPage } from './page-subcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageSubcategoryPageRoutingModule
  ],
  declarations: [PageSubcategoryPage]
})
export class PageSubcategoryPageModule {}
