import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../shared/services/base-crud.service';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseCrudService<Client> {
  constructor(http: HttpClient) {
    super('clientes', http);
  }
}
