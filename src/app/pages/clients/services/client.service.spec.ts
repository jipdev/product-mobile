import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { Gender } from '../enums/gender';
import { Client } from '../interfaces/client';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ClientService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be findAll method', () => {
    const mock: Client[] = [];

    service.findAll().subscribe({
      next: (value) => expect(value).toEqual(mock),
    });

    const req = controller.expectOne(`${ environment.apiUrl }/clientes`);
    req.flush(mock);
  });

  it('should be findById method', () => {
    const id = '1';
    const mock = { id } as Client;

    service.findById(id).subscribe({
      next: (value) => expect(value).toEqual(mock),
    });

    const req = controller.expectOne(`${ environment.apiUrl }/clientes/${ id }`);
    req.flush(mock);
  });

  it('should be create method', () => {
    const params: Client = {
      name: 'test',
      cpf: '12312313',
      email: 'test@email',
      gender: Gender.male
    };

    const mock: Client = {
      ...params,
      id: '1'
    };

    service.create(params).subscribe({
      next: (value) => expect(value).toEqual(mock),
    });

    const req = controller.expectOne(`${ environment.apiUrl }/clientes`);
    req.flush(mock);

    expect(req.request.body).toEqual(params);
  });

  it('should be update method', () => {
    const id = 'test';
    const mock = {
      id,
      name: 'Test'
    } as Client;

    service.update(id, mock).subscribe({
      next: value => expect(value).toEqual(mock)
    });

    const req = controller.expectOne(`${ environment.apiUrl }/clientes/${ id }`);
    req.flush(mock);

    expect(req.request.body).toEqual(mock);
  });

  it('should be remove method', () => {
    const id = '1';
    const mock = { id } as Client;

    service.remove(id).subscribe({
      next: value => expect(value).toEqual(mock)
    });

    const req = controller.expectOne(`${ environment.apiUrl }/clientes/${ id }`);
    req.flush(mock);
  });
});
