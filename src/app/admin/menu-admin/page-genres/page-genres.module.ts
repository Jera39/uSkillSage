import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageGenresPageRoutingModule } from './page-genres-routing.module';

import { PageGenresPage } from './page-genres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageGenresPageRoutingModule
  ],
  declarations: [PageGenresPage]
})
export class PageGenresPageModule {}
