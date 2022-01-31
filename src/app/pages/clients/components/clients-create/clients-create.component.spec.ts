import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { GENERIC_ERROR_MESSAGE } from '../../../../shared/constants/generic-error-message';
import { ROOT_CLIENTS_URL } from '../../constants/root-client-url';
import { Gender } from '../../enums/gender';
import { Client } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';
import { ClientsCreateComponent } from './clients-create.component';

const loadingMock = {
  present: async () => null,
  remove: () => null
};

describe('ClientsCreateComponent', () => {
  let component: ClientsCreateComponent;
  let fixture: ComponentFixture<ClientsCreateComponent>;
  let router: Router;
  let service: ClientService;
  let toast: ToastController;
  let loading: LoadingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsCreateComponent],
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
        },
        {
          provide: LoadingController,
          useValue: {
            create: (opts: LoadingOptions) => of(loadingMock).toPromise()
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(ClientService);
    toast = TestBed.inject(ToastController);
    loading = TestBed.inject(LoadingController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be onSubmit', fakeAsync(() => {
    const mock: Client = {
      name: 'test',
      email: 'test@email',
      cpf: '123123123123',
      gender: Gender.male
    };

    const createLoadingSpy = spyOn(loading, 'create').and.returnValue(of(loadingMock as HTMLIonLoadingElement).toPromise());
    const presentSpy = spyOn(loadingMock, 'present').and.stub();
    const createSpy = spyOn(service, 'create').and.returnValue(of(mock));
    const onSubmitSuccessSpy = spyOn(component, 'onSubmitSuccess').and.stub();
    const removeSpy = spyOn(loadingMock, 'remove').and.stub();

    component.onSubmit(mock);

    tick();

    expect(createLoadingSpy).toHaveBeenCalledWith({
      message: 'Salvando...'
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalledWith(mock);
    expect(onSubmitSuccessSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
  }));

  it('should be onSubmit when has error', fakeAsync(() => {
    const mock = {} as Client;
    const errorMock = {
      error: {
        message: ''
      }
    };

    const createLoadingSpy = spyOn(loading, 'create').and.returnValue(of(loadingMock as HTMLIonLoadingElement).toPromise());
    const presentSpy = spyOn(loadingMock, 'present').and.stub();
    const createSpy = spyOn(service, 'create').and.returnValue(throwError(errorMock));
    const onSubmitErrorSpy = spyOn(component, 'onSubmitError').and.stub();
    const removeSpy = spyOn(loadingMock, 'remove').and.stub();

    component.onSubmit(mock);

    tick();

    expect(createLoadingSpy).toHaveBeenCalledWith({
      message: 'Salvando...'
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalledWith(mock);
    expect(onSubmitErrorSpy).toHaveBeenCalledWith(errorMock.error.message);
    expect(removeSpy).toHaveBeenCalled();
  }));

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
      message: 'Cliente criado com sucesso!',
      color: 'success',
      position: 'top',
      duration: 800
    });
    expect(presentSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROOT_CLIENTS_URL);
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
