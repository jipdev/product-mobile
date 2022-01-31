import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { ROOT_CLIENTS_URL } from '../../constants/root-client-url';
import { Gender } from '../../enums/gender';
import { Client } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';
import { ClientsEditComponent } from './clients-edit.component';

const ID = 'test';

const loadingAndToastMock = {
  present: async () => null,
  remove: () => null
};

fdescribe('ClientsEditComponent', () => {
  let component: ClientsEditComponent;
  let fixture: ComponentFixture<ClientsEditComponent>;
  let service: ClientService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let loading: LoadingController;
  let toast: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsEditComponent],
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
          provide: ClientService,
          useValue: {
            findById: (id: string) => of(),
            update: (data: Client) => of()
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

    fixture = TestBed.createComponent(ClientsEditComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ClientService);
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
    const fetchClientSpy = spyOn(component, 'fetchClient').and.stub();

    component.ngOnInit();

    expect(fetchClientSpy).toHaveBeenCalled();
  });

  it('should be fetchClient', fakeAsync(() => {
    const mock: Client = {
      name: 'test',
      email: 'test@email',
      cpf: '123123123123',
      gender: Gender.male
    };

    const findByIdSpy = spyOn(service, 'findById').and.returnValue(of(mock));
    const createSpy = spyOn(loading, 'create').and.returnValue(of(loadingAndToastMock as HTMLIonLoadingElement).toPromise());
    const presentSpy = spyOn(loadingAndToastMock, 'present').and.stub();
    const removeSpy = spyOn(loadingAndToastMock, 'remove').and.stub();

    component.fetchClient();

    tick();

    expect(findByIdSpy).toHaveBeenCalledWith(ID);
    expect(createSpy).toHaveBeenCalledWith({
      message: 'Carregando...'
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(component.id).toEqual(ID);
    expect(component.client).toEqual(mock);
  }));

  it('should be fetchClient when has error', fakeAsync(() => {
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

    component.fetchClient();

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
    const mock: Client = {
      name: 'test',
      email: 'test@email',
      cpf: '123123123123',
      gender: Gender.male
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
    const mock: Client = {
      name: 'test',
      email: 'test@email',
      cpf: '123123123123',
      gender: Gender.male
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
    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROOT_CLIENTS_URL);
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
    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROOT_CLIENTS_URL);
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
    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROOT_CLIENTS_URL);
  }));
});
