import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesAdminPageRoutingModule } from './pages-admin-routing.module';

import { PagesAdminPage } from './pages-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesAdminPageRoutingModule
  ],
  declarations: [PagesAdminPage]
})
export class PagesAdminPageModule {}
