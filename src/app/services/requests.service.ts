import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private apiUrl = environment._URL;

  constructor(private http: HttpClient) {}

  getData(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}`);
  }

  postData(path: string, json: Object): Observable<any> {
    return this.http.post(`${this.apiUrl}/${path}`, json);
  }

  putData(path: string, json: Object, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${path}/${id}`, json);
  }

  deleteData(path: string, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${path}/${id}`);
  }
}
