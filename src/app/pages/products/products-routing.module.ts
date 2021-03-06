import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsCreateComponent } from './components/products-create/products-create.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
    children: [
      {
        path: '',
        component: ProductsListComponent
      },
      {
        path: 'novo',
        component: ProductsCreateComponent
      },
      {
        path: ':id',
        component: ProductsEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsPageRoutingModule {
}
