import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsPage } from './clients.page';
import { ClientsListComponent } from './components/clients-list/clients-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsPage,
    children: [
      {
        path: '',
        component: ClientsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsPageRoutingModule {
}
