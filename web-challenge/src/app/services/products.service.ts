import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductsResponse } from '../pages/my-pages/products/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private url = "https://dummyjson.com/products"

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductsResponse>{
    return this.http.get<ProductsResponse>(this.url + "?limit=0");
  }
}
