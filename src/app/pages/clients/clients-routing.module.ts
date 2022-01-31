import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsPage } from './clients.page';
import { ClientsCreateComponent } from './components/clients-create/clients-create.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsPage,
    children: [
      {
        path: '',
        component: ClientsListComponent
      },
      {
        path: 'novo',
        component: ClientsCreateComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsPageRoutingModule {
}
