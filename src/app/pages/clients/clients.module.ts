import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { ClientsPageRoutingModule } from './clients-routing.module';
import { ClientsPage } from './clients.page';
import { ClientsCreateComponent } from './components/clients-create/clients-create.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientService } from './services/client.service';

@NgModule({
  declarations: [
    ClientsPage,
    ClientsListComponent,
    ClientsCreateComponent,
    ClientsFormComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientsPageRoutingModule,
    SimpleMaskModule
  ],
  providers: [ClientService]
})
export class ClientsPageModule {
}
