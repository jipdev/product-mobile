import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClientsPageRoutingModule } from './clients-routing.module';
import { ClientsPage } from './clients.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ClientsPageRoutingModule
  ],
  declarations: [ClientsPage]
})
export class ClientsPageModule {
}
