import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map } from 'rxjs';
import { fetchproduct } from '../../store/products/products.actions';
import { productInterface } from '../../store/products/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiurl = "http://localhost:5000/api"
  constructor(private http:HttpClient){}
  store = inject(Store)

  getProducts(): Observable<any[]>{

    return this.http.get<any[]>(`${this.apiurl}/fetchproduct`).pipe(
      map(products => {
        this.store.dispatch(fetchproduct({ products }));
        return products;
      }))
  }

  addProducts(productObject:productInterface): Observable<any>{
    return this.http.post<productInterface>(`${this.apiurl}/addproduct`, productObject);
  }

  editProducts(productObject:productInterface,productId:string): Observable<any>{
    return this.http.patch<productInterface>(`${this.apiurl}/updateproduct/${productId}`, productObject);
  }

  dltProducts(productId:string): Observable<any>{
    return this.http.delete<productInterface>(`${this.apiurl}/deleteproduct/${productId}`);
  }

}
