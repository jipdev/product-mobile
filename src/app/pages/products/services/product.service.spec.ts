import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { Fabrication } from '../enums/fabrication';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be findAll method', () => {
    const mock: Product[] = [];

    service.findAll().subscribe({
      next: (value) => expect(value).toEqual(mock),
    });

    const req = controller.expectOne(`${ environment.apiUrl }/produtos`);
    req.flush(mock);
  });

  it('should be findById method', () => {
    const id = '1';
    const mock = { id } as Product;

    service.findById(id).subscribe({
      next: (value) => expect(value).toEqual(mock),
    });

    const req = controller.expectOne(`${ environment.apiUrl }/produtos/${ id }`);
    req.flush(mock);
  });

  it('should be create method', () => {
    const params: Product = {
      name: 'test@email',
      fabrication: Fabrication.national,
      price: 1,
      size: 1
    };

    const mock: Product = {
      ...params,
      id: '1'
    };

    service.create(params).subscribe({
      next: (value) => expect(value).toEqual(mock),
    });

    const req = controller.expectOne(`${ environment.apiUrl }/produtos`);
    req.flush(mock);

    expect(req.request.body).toEqual(params);
  });

  it('should be update method', () => {
    const id = 'test';
    const mock = {
      id,
      name: 'Test'
    } as Product;

    service.update(id, mock).subscribe({
      next: value => expect(value).toEqual(mock)
    });

    const req = controller.expectOne(`${ environment.apiUrl }/produtos/${ id }`);
    req.flush(mock);

    expect(req.request.body).toEqual(mock);
  });

  it('should be remove method', () => {
    const id = '1';
    const mock = { id } as Product;

    service.remove(id).subscribe({
      next: value => expect(value).toEqual(mock)
    });

    const req = controller.expectOne(`${ environment.apiUrl }/produtos/${ id }`);
    req.flush(mock);
  });
});
