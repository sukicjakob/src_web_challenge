import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, CartsResponse } from '../models/cart';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartsService {

  private baseUrl = "https://dummyjson.com/carts"

  constructor(private http: HttpClient) {}

  getAllCarts(limit: number, skip: number, select: string): Observable<CartsResponse>{
    let params = "?limit=" + limit;
    
    if(skip > 0)
      params += "&skip=" + skip;

    if(select)
      params += "&select=" + select;

    return this.http.get<CartsResponse>(this.baseUrl + params);
  }

  getCart(cartId: number): Observable<Cart>{
    return this.http.get<Cart>(this.baseUrl + "/" + cartId);
  }

  getCartsOfUser(userId: number): Observable<CartsResponse>{
    return this.http.get<CartsResponse>(this.baseUrl + "/user/" + userId);
  }

  addCart(cart: Cart):Observable<Cart>{
    return this.http.post<Cart>(this.baseUrl + "/add", cart);
  }

  updateCart(cart: Cart):Observable<Cart>{
    return this.http.put<Cart>(this.baseUrl + "/" + cart.id, cart);
  }

  deleteCart(cartId: Number): Observable<Cart>{
    return this.http.delete<Cart>(this.baseUrl + "/" + cartId);
  }
}