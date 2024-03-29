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

  getAllCarts(): Observable<CartsResponse>{
    return this.http.get<CartsResponse>(this.baseUrl);
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
    return this.http.patch<Cart>(this.baseUrl + "/" + cart.id, cart);
  }

  deleteCart(cartId: Number): Observable<Cart>{
    return this.http.delete<Cart>(this.baseUrl + "/" + cartId);
  }
}