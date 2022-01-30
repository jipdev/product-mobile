import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductsPage } from './products.page';
import { ProductService } from './services/product.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProductsPageRoutingModule
  ],
  declarations: [ProductsPage, ProductsListComponent],
  providers: [ProductService]
})
export class Tab2PageModule {}
