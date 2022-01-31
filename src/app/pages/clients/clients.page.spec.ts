import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ClientsPage } from './clients.page';
import { ROOT_CLIENTS_URL } from './constants/root-client-url';

const routerEventSubject = new Subject<RouterEvent>();

describe('ClientsPage', () => {
  let component: ClientsPage;
  let fixture: ComponentFixture<ClientsPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: (url: string) => null,
            events: routerEventSubject
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const listenRouteEventSpy = spyOn(component, 'listenRouteEvent').and.stub();

    component.ngOnInit();

    expect(listenRouteEventSpy).toHaveBeenCalled();
  });

  it('should be listenRouteEvent', () => {
    const mock = new NavigationEnd(1, '/test', '/test');

    const onNavigateSpy = spyOn(component, 'onNavigate').and.stub();

    component.listenRouteEvent();

    routerEventSubject.next(mock);

    expect(onNavigateSpy).toHaveBeenCalledWith(mock);
  });

  it('should be onNavigate', () => {
    const expectedUrl = '/test';

    component.onNavigate(new NavigationEnd(1, expectedUrl, expectedUrl));

    expect(component.activeUrl).toEqual(expectedUrl);
  });

  it('should be back', () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.back();

    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROOT_CLIENTS_URL);
  });
});
