import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GENERIC_ERROR_MESSAGE } from '../../../../shared/constants/generic-error-message';
import { ROOT_PRODUCT_URL } from '../../constants/root-product-url';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss'],
})
export class ProductsCreateComponent {
  constructor(private service: ProductService, private router: Router, private toast: ToastController) {
  }

  onSubmit(data: Product): void {
    this.service.create(data).subscribe({
      next: () => this.onSubmitSuccess(),
      error: ({ error }) => this.onSubmitError(error?.message)
    });
  }

  async onSubmitSuccess(): Promise<void> {
    const toast = await this.toast.create({
      message: 'Produto criado com sucesso!',
      color: 'success',
      position: 'top',
      duration: 800
    });

    await toast.present();
    this.router.navigateByUrl(ROOT_PRODUCT_URL);
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
