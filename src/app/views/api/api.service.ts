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

  createUser(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}user/create`;
   
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
  deleteClient(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/client/delete`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  createRegion(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/region/create`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updateRegion(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/region/update`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  deleteRegion(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/region/delete`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getSuppliers(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/supplier/get`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createSupplier(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/supplier/create`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updatesupplier(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/supplier/update`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getAnalytics(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/analytics/get`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  getMaterials(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/material/get`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createMaterial(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/material/create`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updateMaterial(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/material/update`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getProducts(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/product/get`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createProduct(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/product/create`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updateProduct(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/product/update`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }

}
