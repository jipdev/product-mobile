import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  constructor(private service: ProductService, private router: Router, private toast: ToastController) {
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.service.findAll().subscribe({
      next: (products) => this.products = products,
      error: ({ error }) => this.showError(error.message)
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
      position: 'top'
    });

    await toast.present();
  }
}
