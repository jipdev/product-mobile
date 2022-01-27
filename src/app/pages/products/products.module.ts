import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductsPage } from './products.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProductsPageRoutingModule
  ],
  declarations: [ProductsPage]
})
export class Tab2PageModule {}
