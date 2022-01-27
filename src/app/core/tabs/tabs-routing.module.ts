import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('../../pages/clients/clients.module').then(m => m.ClientsPageModule)
      },
      {
        path: 'produtos',
        loadChildren: () => import('../../pages/products/products.module').then(m => m.Tab2PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/clientes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/clientes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
