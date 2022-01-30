import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule, ToastController, ToastOptions } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { GENERIC_ERROR_MESSAGE } from '../../../../shared/constants/generic-error-message';
import { ROOT_PRODUCT_URL } from '../../constants/root-product-url';
import { Fabrication } from '../../enums/fabrication';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ProductsCreateComponent } from './products-create.component';

describe('ProductsCreateComponent', () => {
  let component: ProductsCreateComponent;
  let fixture: ComponentFixture<ProductsCreateComponent>;
  let router: Router;
  let service: ProductService;
  let toast: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsCreateComponent],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: (url: string) => null
          }
        },
        {
          provide: ToastController,
          useValue: {
            create: (opts: ToastOptions) => of().toPromise()
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(ProductService);
    toast = TestBed.inject(ToastController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be onSubmit', () => {
    const mock: Product = {
      name: 'test',
      size: 1,
      price: 1,
      fabrication: Fabrication.national
    };

    const createSpy = spyOn(service, 'create').and.returnValue(of(mock));
    const onSubmitSuccessSpy = spyOn(component, 'onSubmitSuccess').and.stub();

    component.onSubmit(mock);

    expect(createSpy).toHaveBeenCalledWith(mock);
    expect(onSubmitSuccessSpy).toHaveBeenCalled();
  });

  it('should be onSubmit when has error', () => {
    const mock = {} as Product;
    const errorMock = {
      error: {
        message: ''
      }
    };

    const createSpy = spyOn(service, 'create').and.returnValue(throwError(errorMock));
    const onSubmitErrorSpy = spyOn(component, 'onSubmitError').and.stub();

    component.onSubmit(mock);

    expect(createSpy).toHaveBeenCalledWith(mock);
    expect(onSubmitErrorSpy).toHaveBeenCalledWith(errorMock.error.message);
  });

  it('should be onSubmitSuccess', fakeAsync(() => {
    const toastMock = {
      present: () => null
    } as HTMLIonToastElement;

    const createSpy = spyOn(toast, 'create').and.returnValue(of(toastMock).toPromise());
    const presentSpy = spyOn(toastMock, 'present').and.stub();
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.onSubmitSuccess();

    tick();

    expect(createSpy).toHaveBeenCalledWith({
      message: 'Produto criado com sucesso!',
      color: 'success',
      position: 'top',
      duration: 800
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROOT_PRODUCT_URL);
  }));

  it('should be onSubmitError', fakeAsync(() => {
    const message = 'Test';
    const toastMock = {
      present: () => null
    } as HTMLIonToastElement;

    const createSpy = spyOn(toast, 'create').and.returnValue(of(toastMock).toPromise());
    const presentSpy = spyOn(toastMock, 'present').and.stub();

    component.onSubmitError(message);

    tick();

    expect(createSpy).toHaveBeenCalledWith({
      message,
      color: 'danger',
      position: 'top',
      duration: 800
    });
    expect(presentSpy).toHaveBeenCalled();
  }));

  it('should be onSubmitError when dont have message', fakeAsync(() => {
    const message = 'Test';
    const toastMock = {
      present: () => null
    } as HTMLIonToastElement;

    const createSpy = spyOn(toast, 'create').and.returnValue(of(toastMock).toPromise());
    const presentSpy = spyOn(toastMock, 'present').and.stub();

    component.onSubmitError();

    tick();

    expect(createSpy).toHaveBeenCalledWith({
      message: GENERIC_ERROR_MESSAGE,
      color: 'danger',
      position: 'top',
      duration: 800
    });
    expect(presentSpy).toHaveBeenCalled();
  }));
});
