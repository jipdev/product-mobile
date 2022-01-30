import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  constructor(
    private service: ProductService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  async fetchProducts(): Promise<void> {
    const loading = await this.loading.create({
      message: 'Carregando...',
    });

    await loading.present();

    this.service.findAll().subscribe({
      next: (products) => this.products = products,
      error: ({ error }) => this.showError(error.message)
    }).add(() => {
      loading.remove();
      this.cd.detectChanges();
    });
  }

  edit(id: string): void {
    this.router.navigateByUrl(`/tabs/produtos/${ id }`);
  }

  register(): void {
    this.router.navigateByUrl('/tabs/produtos/novo');
  }

  remove(id: string, index: number): void {
    this.service.remove(id).subscribe({
      next: () => this.products.splice(index, 1),
      error: ({ error }) => this.showError(error?.message),
    });
  }

  async showError(message?: string): Promise<void> {
    const toast = await this.toast.create({
      message: message ?? 'Ocorreu um erro inesperado, tente novamente mais tarde!',
      color: 'danger',
      position: 'top',
      duration: 800
    });

    await toast.present();
  }
}
