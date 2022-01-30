import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { Fabrication } from '../../enums/fabrication';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ProductsListComponent } from './products-list.component';

const loadingCreateMock = {
  present: async () => of().toPromise(),
  remove: () => {
  }
};

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let router: Router;
  let service: ProductService;
  let toast: ToastController;
  let loading: LoadingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [IonicModule.forRoot(), HttpClientModule, IonicModule],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: (url: string) => null
          }
        },
        {
          provide: ProductService,
          useValue: {
            findAll: () => of(),
            remove: (id: string) => of()
          }
        },
        {
          provide: ToastController,
          useValue: {
            create: async (opt: ToastOptions) => of().toPromise()
          }
        },
        {
          provide: LoadingController,
          useValue: {
            create: (opts: LoadingOptions) => of(loadingCreateMock).toPromise()
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(ProductService);
    toast = TestBed.inject(ToastController);
    loading = TestBed.inject(LoadingController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const fetchProductsSpy = spyOn(component, 'fetchProducts').and.stub();

    component.ngOnInit();

    expect(fetchProductsSpy).toHaveBeenCalled();
  });

  it('should be fetchProducts', fakeAsync(() => {
    const mock: Product[] = [
      {
        id: '1',
        name: 'test',
        size: 1,
        price: 1,
        fabrication: Fabrication.national
      }
    ];

    const createSpy = spyOn(loading, 'create').and.returnValue(of(loadingCreateMock as HTMLIonLoadingElement).toPromise());
    const presentSpy = spyOn(loadingCreateMock, 'present').and.stub();
    const removeSpy = spyOn(loadingCreateMock, 'remove').and.stub();
    const findAllSpy = spyOn(service, 'findAll').and.returnValue(of(mock));

    component.fetchProducts();

    tick();

    expect(createSpy).toHaveBeenCalledWith({ message: 'Carregando...' });
    expect(presentSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(component.products).toEqual(mock);
    expect(findAllSpy).toHaveBeenCalled();
  }));

  it('should be fetchProducts when has error', fakeAsync(() => {
    const errorMock = {
      error: {
        message: 'test'
      }
    };

    const createSpy = spyOn(loading, 'create').and.returnValue(of(loadingCreateMock as HTMLIonLoadingElement).toPromise());
    const presentSpy = spyOn(loadingCreateMock, 'present').and.stub();
    const removeSpy = spyOn(loadingCreateMock, 'remove').and.stub();
    const findAllSpy = spyOn(service, 'findAll').and.returnValue(throwError(errorMock));
    const showErrorSpy = spyOn(component, 'showError').and.stub();

    component.fetchProducts();

    tick();

    expect(createSpy).toHaveBeenCalledWith({ message: 'Carregando...' });
    expect(presentSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(findAllSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith(errorMock.error.message);
  }));

  it('should be edit', () => {
    const id = 'test';

    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.edit(id);

    expect(navigateByUrlSpy).toHaveBeenCalledWith(`/tabs/produtos/${ id }`);
  });

  it('should be remove', () => {
    const id = 'test';
    const product: Product = {
      id: '1',
      name: 'test',
      size: 1,
      price: 1,
      fabrication: Fabrication.national
    };

    component.products = [product, product, product];

    const removeSpy = spyOn(service, 'remove').and.returnValue(of({} as Product));

    component.remove(id, 1);

    expect(component.products.length).toEqual(2);
    expect(removeSpy).toHaveBeenCalledWith(id);
  });

  it('should be remove when has error', () => {
    const id = 'test';
    const errorMock = {
      error: {
        message: 'test'
      }
    };

    const removeSpy = spyOn(service, 'remove').and.returnValue(throwError(errorMock));
    const showErrorSpy = spyOn(component, 'showError').and.stub();

    component.remove(id, 1);

    expect(removeSpy).toHaveBeenCalledWith(id);
    expect(showErrorSpy).toHaveBeenCalledWith(errorMock.error.message);
  });

  it('should be register', () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.register();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/tabs/produtos/novo');
  });

  it('should be showError when has message', fakeAsync(() => {
    const message = 'Test';
    const mock = {
      present: async () => {
      }
    } as HTMLIonToastElement;

    const createSpy = spyOn(toast, 'create').and.returnValue(of(mock).toPromise());
    const presentSpy = spyOn(mock, 'present').and.stub();

    component.showError(message);

    tick();

    expect(createSpy).toHaveBeenCalledWith({
      message,
      color: 'danger',
      position: 'top',
      duration: 800
    });
    expect(presentSpy).toHaveBeenCalled();
  }));

  it('should be showError when dont has message', fakeAsync(() => {
    const mock = {
      present: async () => {
      }
    } as HTMLIonToastElement;

    const createSpy = spyOn(toast, 'create').and.returnValue(of(mock).toPromise());
    const presentSpy = spyOn(mock, 'present').and.stub();

    component.showError();

    tick();

    expect(createSpy).toHaveBeenCalledWith({
      message: 'Ocorreu um erro inesperado, tente novamente mais tarde!',
      color: 'danger',
      position: 'top',
      duration: 800
    });
    expect(presentSpy).toHaveBeenCalled();
  }));
});
