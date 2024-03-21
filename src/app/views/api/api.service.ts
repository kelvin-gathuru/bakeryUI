import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

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
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
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
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }

  getRegions(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/region/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createClient(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/client/create`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updateClient(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/client/update`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  deleteClient(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/client/delete`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  createRegion(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/region/create`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updateRegion(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/region/update`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  deleteRegion(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/region/delete`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getSuppliers(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/supplier/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createSupplier(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/supplier/create`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updatesupplier(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/supplier/update`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getAnalytics(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/analytics/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  getSalesAnalytics(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/salesAnalytics/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  getMaterials(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/material/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createMaterial(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/material/create`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updateMaterial(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/material/update`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getProducts(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/product/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createProduct(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/product/create`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updateProduct(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/product/update`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getMaterialStocks(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/materialStock/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  creatematerialStock(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/materialStock/create`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updatematerialStock(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/materialStock/update`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getMaterialsLowOnStock(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/material/getLowOnStock`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  getMaterialDispatch(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/materialDispatch/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createMaterialDispatch(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/materialDispatch/create`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updateMaterialDispatch(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/materialDispatch/update`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getProductStock(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/productStock/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createProductStock(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/productStock/create`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  updateProductStock(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/productStock/update`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getProductDispatch(): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/productDispatch/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(endpoint, {headers});
  }
  createProductdispatch(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/productDispatch/create`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getProductDispatchReturn( startDate: string, endDate: string): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/productDispatchReturn/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = { startDate: startDate, endDate: endDate };
    return this.http.get<any[]>(endpoint, {headers, params});
  }
  createProductdispatchReturn(payload: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/productDispatchReturn/create`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any[]>(endpoint, payload, {headers});
  }
  getIngredientVsProduct( startDate: string, endDate: string): Observable<any[]> {
    const endpoint = `${this.baseUrl}sales/ingredientVsProduct/get`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = { startDate: startDate, endDate: endDate };
    return this.http.get<any[]>(endpoint, {headers, params});
  }
}
