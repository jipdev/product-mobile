import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClientsPageRoutingModule } from './clients-routing.module';
import { ClientsPage } from './clients.page';
import { ClientsListComponent } from './components/clients-list/clients-list.component';

@NgModule({
  declarations: [ClientsPage, ClientsListComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ClientsPageRoutingModule
  ],
})
export class ClientsPageModule {
}
