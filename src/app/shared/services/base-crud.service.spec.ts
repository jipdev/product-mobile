import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { BaseCrudService } from './base-crud.service';

const URL = 'testing';

describe('BaseCrudService', () => {
  let service: BaseCrudService<unknown>;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: String, useValue: URL }
      ]
    });
    service = TestBed.inject(BaseCrudService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be findAll method', () => {
    const mock: unknown[] = [];

    service.findAll().subscribe({
      next: value => expect(value).toEqual(mock)
    });

    const req = controller.expectOne(`${ environment.apiUrl }/${ URL }`);
    req.flush(mock);
  });

  it('should be findById method', () => {
    const mock = {};
    const id = 'test';

    service.findById(id).subscribe({
      next: value => expect(value).toEqual(mock)
    });

    const req = controller.expectOne(`${ environment.apiUrl }/${ URL }/${ id }`);
    req.flush(mock);
  });

  it('should be create method', () => {
    const id = 'test';
    const mock = {
      name: 'Test'
    };

    service.create(mock).subscribe({
      next: value => expect(value).toEqual({ id, ...mock })
    });

    const req = controller.expectOne(`${ environment.apiUrl }/${ URL }`);

    expect(req.request.body).toEqual(mock);

    req.flush({ id, ...mock });
  });

  it('should be update method', () => {
    const id = 'test';
    const mock = {
      id,
      name: 'Test'
    };

    service.update(id, mock).subscribe({
      next: value => expect(value).toEqual(mock)
    });

    const req = controller.expectOne(`${ environment.apiUrl }/${ URL }/${ id }`);

    expect(req.request.body).toEqual(mock);

    req.flush(mock);
  });

  it('should be remove method', () => {
    const id = 'test';
    const mock = {};

    service.remove(id).subscribe({
      next: value => expect(value).toEqual(mock)
    });

    const req = controller.expectOne(`${ environment.apiUrl }/${ URL }/${ id }`);
    req.flush(mock);
  });
});
