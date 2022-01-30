import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ROOT_PRODUCT_URL } from './constants/root-product-url';

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPage implements OnInit {
  activeUrl: string;

  constructor(private router: Router, private cd: ChangeDetectorRef) {
  }

  get isRootUrl(): boolean {
    return this.activeUrl === ROOT_PRODUCT_URL;
  }

  ngOnInit(): void {
    this.listenRouteEvent();
  }

  listenRouteEvent(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe({
      next: event => this.onNavigate(event as NavigationEnd)
    });
  }

  onNavigate(event: NavigationEnd): void {
    this.activeUrl = event.urlAfterRedirects;
    this.cd.detectChanges();
  }

  back(): void {
    this.router.navigateByUrl(ROOT_PRODUCT_URL);
  }
}
