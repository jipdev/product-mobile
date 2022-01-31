import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { GENERIC_ERROR_MESSAGE } from '../../../../shared/constants/generic-error-message';
import { ROOT_CLIENTS_URL } from '../../constants/root-client-url';
import { Client } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients-create.component.scss'],
})
export class ClientsCreateComponent {
  constructor(private service: ClientService, private router: Router, private toast: ToastController, private loading: LoadingController) {
  }

  async onSubmit(data: Client): Promise<void> {
    const loading = await this.loading.create({
      message: 'Salvando...'
    });

    await loading.present();

    this.service.create(data).subscribe({
      next: () => this.onSubmitSuccess(),
      error: ({ error }) => this.onSubmitError(error?.message)
    }).add(() => loading.remove());
  }

  async onSubmitSuccess(): Promise<void> {
    const toast = await this.toast.create({
      message: 'Cliente criado com sucesso!',
      color: 'success',
      position: 'top',
      duration: 800
    });

    await toast.present();
    this.router.navigateByUrl(ROOT_CLIENTS_URL);
  }

  async onSubmitError(message?: string): Promise<void> {
    const toast = await this.toast.create({
      message: message ?? GENERIC_ERROR_MESSAGE,
      color: 'danger',
      position: 'top',
      duration: 800
    });

    await toast.present();
  }
}
