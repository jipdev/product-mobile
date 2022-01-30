import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseCrudService<T> {
  protected baseUrl!: string;

  protected constructor(@Inject(String) protected url: string, protected http: HttpClient) {
    this.baseUrl = `${ environment.apiUrl }/${ this.url }`;
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  findById(id: string): Observable<T | null> {
    return this.http.get<T | null>(`${ this.baseUrl }/${ id }`);
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, data);
  }

  update(id: string, data: T): Observable<T> {
    return this.http.put<T>(`${ this.baseUrl }/${ id }`, data);
  }

  remove(id: string): Observable<T> {
    return this.http.delete<T>(`${ this.baseUrl }/${ id }`);
  }
}
