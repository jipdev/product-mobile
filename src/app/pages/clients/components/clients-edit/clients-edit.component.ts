import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ROOT_CLIENTS_URL } from '../../constants/root-client-url';
import { Client } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.scss'],
})
export class ClientsEditComponent implements OnInit {
  id!: string;
  client!: Client;

  constructor(
    private service: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastController,
    private loading: LoadingController,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.fetchClient();
  }

  async fetchClient(): Promise<void> {
    const loading = await this.loading.create({
      message: 'Carregando...'
    });

    await loading.present();

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.service.findById(this.id).subscribe({
      next: (value) => this.client = value,
      error: ({ error }) => this.showError(error?.message),
    }).add(() => {
      loading.remove();
      this.cd.detectChanges();
    });
  }

  async onSubmit(product: Client): Promise<void> {
    const loading = await this.loading.create({
      message: 'Salvando...'
    });

    await loading.present();

    this.service.update(this.id, product).subscribe({
      next: () => this.onSubmitSuccess(),
      error: ({ error }) => this.showError(error?.message)
    }).add(() => loading.remove());
  }

  async showError(message?: string): Promise<void> {
    const toast = await this.toast.create({
      message: message ?? 'Ocorreu um erro ao tentar salvar, tente novamente mais tarde!',
      color: 'danger',
      position: 'top',
      duration: 800
    });

    await toast.present();

    this.router.navigateByUrl(ROOT_CLIENTS_URL);
  }

  async onSubmitSuccess(): Promise<void> {
    const toast = await this.toast.create({
      message: 'Alteração do produto realizada com sucesso!',
      color: 'success',
      position: 'top',
      duration: 800
    });

    await toast.present();

    this.router.navigateByUrl(ROOT_CLIENTS_URL);
  }
}
