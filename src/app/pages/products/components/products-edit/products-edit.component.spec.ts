import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { ROOT_PRODUCT_URL } from '../../constants/root-product-url';
import { Fabrication } from '../../enums/fabrication';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ProductsEditComponent } from './products-edit.component';

const ID = 'test';

const loadingAndToastMock = {
  present: async () => null,
  remove: () => null
};

describe('ProductsEditComponent', () => {
  let component: ProductsEditComponent;
  let fixture: ComponentFixture<ProductsEditComponent>;
  let service: ProductService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let loading: LoadingController;
  let toast: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsEditComponent],
      imports: [IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: (url: string) => {
            }
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => ID
              }
            }
          }
        },
        {
          provide: ProductService,
          useValue: {
            findById: (id: string) => of(),
            update: (product: Product) => of()
          }
        },
        {
          provide: LoadingController,
          useValue: {
            create: async (opt: LoadingOptions) => loadingAndToastMock
          }
        },
        {
          provide: ToastController,
          useValue: {
            create: (opts: ToastOptions) => loadingAndToastMock
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsEditComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    loading = TestBed.inject(LoadingController);
    toast = TestBed.inject(ToastController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should be ngOnInit', () => {
    const fetchProductSpy = spyOn(component, 'fetchProduct').and.stub();

    component.ngOnInit();

    expect(fetchProductSpy).toHaveBeenCalled();
  });

  it('should be fetchProduct', fakeAsync(() => {
    const mock = {
      id: 'test',
      name: 'test',
      fabrication: Fabrication.national,
      price: 1,
      size: 1
    } as Product;

    const findByIdSpy = spyOn(service, 'findById').and.returnValue(of(mock));
    const createSpy = spyOn(loading, 'create').and.returnValue(of(loadingAndToastMock as HTMLIonLoadingElement).toPromise());
    const presentSpy = spyOn(loadingAndToastMock, 'present').and.stub();
    const removeSpy = spyOn(loadingAndToastMock, 'remove').and.stub();

    component.fetchProduct();

    tick();

    expect(findByIdSpy).toHaveBeenCalledWith(ID);
    expect(createSpy).toHaveBeenCalledWith({
      message: 'Carregando...'
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(component.id).toEqual(ID);
    expect(component.product).toEqual(mock);
  }));

  it('should be fetchProduct when has error', fakeAsync(() => {
    const errorMock = {
      error: {
        message: 'test'
      }
    };

    const findByIdSpy = spyOn(service, 'findById').and.returnValue(throwError(errorMock));
    const createSpy = spyOn(loading, 'create').and.returnValue(of(loadingAndToastMock as HTMLIonLoadingElement).toPromise());
    const presentSpy = spyOn(loadingAndToastMock, 'present').and.stub();
    const showErrorSpy = spyOn(component, 'showError').and.stub();
    const removeSpy = spyOn(loadingAndToastMock, 'remove').and.stub();

    component.fetchProduct();

    tick();

    expect(findByIdSpy).toHaveBeenCalledWith(ID);
    expect(createSpy).toHaveBeenCalledWith({
      message: 'Carregando...'
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith(errorMock.error.message);
    expect(removeSpy).toHaveBeenCalled();
  }));

  it('should be onSubmit', fakeAsync(() => {
    const mock: Product = {
      id: '1',
      name: 'test',
      price: 1,
      size: 1,
      fabrication: Fabrication.national
    };

    component.id = ID;

    const createSpy = spyOn(loading, 'create').and.returnValue(of(loadingAndToastMock as HTMLIonLoadingElement).toPromise());
    const presentSpy = spyOn(loadingAndToastMock, 'present').and.stub();
    const updateSpy = spyOn(service, 'update').and.returnValue(of(mock));
    const onSubmitSuccessSpy = spyOn(component, 'onSubmitSuccess').and.stub();
    const removeSpy = spyOn(loadingAndToastMock, 'remove').and.stub();

    component.onSubmit(mock);

    tick();

    expect(createSpy).toHaveBeenCalledWith({
      message: 'Salvando...'
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledWith(ID, mock);
    expect(onSubmitSuccessSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
  }));

  it('should be onSubmit', fakeAsync(() => {
    const mock: Product = {
      id: '1',
      name: 'test',
      price: 1,
      size: 1,
      fabrication: Fabrication.national
    };

    const errorMock = {
      error: {
        message: 'test'
      }
    };

    component.id = ID;

    const createSpy = spyOn(loading, 'create').and.returnValue(of(loadingAndToastMock as HTMLIonLoadingElement).toPromise());
    const presentSpy = spyOn(loadingAndToastMock, 'present').and.stub();
    const updateSpy = spyOn(service, 'update').and.returnValue(throwError(errorMock));
    const showErrorSpy = spyOn(component, 'showError').and.stub();
    const removeSpy = spyOn(loadingAndToastMock, 'remove').and.stub();

    component.onSubmit(mock);

    tick();

    expect(createSpy).toHaveBeenCalledWith({
      message: 'Salvando...'
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledWith(ID, mock);
    expect(showErrorSpy).toHaveBeenCalledWith(errorMock.error.message);
    expect(removeSpy).toHaveBeenCalled();
  }));

  it('should be showError', fakeAsync(() => {
    const message = 'test';

    const createSpy = spyOn(toast, 'create').and.returnValue(of(loadingAndToastMock as HTMLIonToastElement).toPromise());
    const presentSpy = spyOn(loadingAndToastMock, 'present').and.stub();
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.showError(message);

    tick();

    expect(createSpy).toHaveBeenCalledWith({
      message,
      color: 'danger',
      position: 'top',
      duration: 800
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROOT_PRODUCT_URL);
  }));

  it('should be showError when dont has message', fakeAsync(() => {
    const createSpy = spyOn(toast, 'create').and.returnValue(of(loadingAndToastMock as HTMLIonToastElement).toPromise());
    const presentSpy = spyOn(loadingAndToastMock, 'present').and.stub();
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.showError();

    tick();

    expect(createSpy).toHaveBeenCalledWith({
      message: 'Ocorreu um erro ao tentar salvar, tente novamente mais tarde!',
      color: 'danger',
      position: 'top',
      duration: 800
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROOT_PRODUCT_URL);
  }));

  it('should be onSubmitSuccess', fakeAsync(() => {
    const createSpy = spyOn(toast, 'create').and.returnValue(of(loadingAndToastMock as HTMLIonToastElement).toPromise());
    const presentSpy = spyOn(loadingAndToastMock, 'present').and.stub();
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.onSubmitSuccess();

    tick();

    expect(createSpy).toHaveBeenCalledWith({
      message: 'Alteração do produto realizada com sucesso!',
      color: 'success',
      position: 'top',
      duration: 800
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROOT_PRODUCT_URL);
  }));
});
