import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { GENERIC_ERROR_MESSAGE } from '../../../../shared/constants/generic-error-message';
import { Client } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  clients: Client[];

  constructor(
    private service: ClientService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  async fetchClients(): Promise<void> {
    const loading = await this.loading.create({
      message: 'Carregando...',
    });

    await loading.present();

    this.service.findAll().subscribe({
      next: (clients) => this.clients = clients,
      error: ({ error }) => this.showError(error.message)
    }).add(() => {
      loading.remove();
      this.cd.detectChanges();
    });
  }

  edit(id: string): void {
    this.router.navigateByUrl(`/tabs/clientes/${ id }`);
  }

  register(): void {
    this.router.navigateByUrl('/tabs/clientes/novo');
  }

  remove(id: string, index: number): void {
    this.service.remove(id).subscribe({
      next: () => this.clients.splice(index, 1),
      error: ({ error }) => this.showError(error?.message),
    });
  }

  async showError(message?: string): Promise<void> {
    const toast = await this.toast.create({
      message: message ?? GENERIC_ERROR_MESSAGE,
      color: 'danger',
      position: 'top',
      duration: 800
    });

    await toast.present();
  }
}
