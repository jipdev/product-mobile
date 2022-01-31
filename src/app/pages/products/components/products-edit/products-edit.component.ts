import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ROOT_PRODUCT_URL } from '../../constants/root-product-url';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
})
export class ProductsEditComponent implements OnInit {
  id!: string;
  product!: Product;

  constructor(
    private service: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastController,
    private loading: LoadingController,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.fetchProduct();
  }

  async fetchProduct(): Promise<void> {
    const loading = await this.loading.create({
      message: 'Carregando...'
    });

    await loading.present();

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.service.findById(this.id).subscribe({
      next: (value) => this.product = value,
      error: ({ error }) => this.showError(error?.message),
    }).add(() => {
      loading.remove();
      this.cd.detectChanges();
    });
  }

  async onSubmit(product: Product): Promise<void> {
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

    this.router.navigateByUrl(ROOT_PRODUCT_URL);
  }

  async onSubmitSuccess(): Promise<void> {
    const toast = await this.toast.create({
      message: 'Alteração do produto realizada com sucesso!',
      color: 'success',
      position: 'top',
      duration: 800
    });

    await toast.present();

    this.router.navigateByUrl(ROOT_PRODUCT_URL);
  }
}
