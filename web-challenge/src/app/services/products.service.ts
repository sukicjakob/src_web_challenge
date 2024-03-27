import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, ProductsResponse } from '../pages/my-pages/products/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private baseUrl = "https://dummyjson.com/products"

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductsResponse>{
    return this.http.get<ProductsResponse>(this.baseUrl + "?limit=0");
  }

  getProduct(productId: number): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + "/" + productId);
  }
}