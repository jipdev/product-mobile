import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ROOT_PRODUCT_URL } from './constants/root-product-url';
import { ProductsPage } from './products.page';

const routerEventSubject = new Subject<RouterEvent>();

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsPage],
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

    fixture = TestBed.createComponent(ProductsPage);
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

    expect(navigateByUrlSpy).toHaveBeenCalledWith(ROOT_PRODUCT_URL);
  });
});
