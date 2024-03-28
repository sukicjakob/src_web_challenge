import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductsResponse } from '../pages/my-pages/products/product';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private baseUrl = "https://dummyjson.com/products"

  constructor(private http: HttpClient) {}

  getAllProducts(limit: number, skip: number, select: string): Observable<ProductsResponse>{
    let params = "?limit=" + limit;
    
    if(skip > 0)
      params += "&skip=" + skip;

    if(select)
      params += "&select=" + select;

    return this.http.get<ProductsResponse>(this.baseUrl + params);
  }

  getProduct(productId: number): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + "/" + productId);
  }

  getProductsFromCategory(category: string): Observable<ProductsResponse>{
    return this.http.get<ProductsResponse>(this.baseUrl + "/category/" + category);
  }

  searchProducts(query: string): Observable<ProductsResponse>{
    return this.http.get<ProductsResponse>(this.baseUrl + "/search?q=" + query);
  }

  getCategories():Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + "/categories");
  }

  addProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(this.baseUrl + "/add", product);
  }

  updateProduct(product: Product):Observable<Product>{
    return this.http.put<Product>(this.baseUrl + "/" + product.id, product);
  }

  deleteProduct(productId: Number): Observable<Product>{
    return this.http.delete<Product>(this.baseUrl + "/" + productId);
  }
}