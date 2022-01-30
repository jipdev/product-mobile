import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../shared/services/base-crud.service';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseCrudService<Product> {
  constructor(http: HttpClient) {
    super('produtos', http);
  }
}
