import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  private token = sessionStorage.getItem('token');

  constructor(private http: HttpClient) { }

  login(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}user/authenticate`;
   
    return this.http.post<any[]>(endpoint, payload);
  }

  changePassword(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}user/changePassword`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }

  forgotPassword(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}user/forgotPassword`;
    return this.http.post<any[]>(endpoint, payload);
  }

  resetPassword(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}user/resetPassword`;
    return this.http.post<any[]>(endpoint, payload);
  }

  getClients(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/client/get`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }

  getRegions(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/region/get`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createClient(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/client/create`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updateClient(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/client/update`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }

}
