import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UsersResponse} from '../models/user';
import { PostsResponse } from '../models/post';
import { TodosResponse } from '../models/todo';
import { Observable, catchError } from 'rxjs';
import { CartsResponse } from '../../carts/models/cart';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private baseUrl = "https://dummyjson.com/users"

  constructor(private http: HttpClient) {}

  getAllUsers(limit: number, skip: number, select: string): Observable<UsersResponse>{
    let params = "?limit=" + limit;
    
    if(skip > 0)
      params += "&skip=" + skip;

    if(select)
      params += "&select=" + select;

    return this.http.get<UsersResponse>(this.baseUrl + params);
  }

  getCurrentAuthUser(): Observable<User>{
    return this.http.get<User>("https://dummyjson.com/user/me");
  }

  getUser(userId: number): Observable<User>{
    return this.http.get<User>(this.baseUrl + "/" + userId);
  }

  searchUsers(query: string): Observable<UsersResponse>{
    return this.http.get<UsersResponse>(this.baseUrl + "/search?q=" + query);
  }

  filterUsers(filter: string): Observable<UsersResponse>{
    return this.http.get<UsersResponse>(this.baseUrl + "/filter?" + filter);
  }

  getUsersCarts(userId: string): Observable<CartsResponse>{
    return this.http.get<CartsResponse>(this.baseUrl + "/users/" + userId + "/carts");
  }

  getUsersPosts(userId: string): Observable<PostsResponse>{
    return this.http.get<PostsResponse>(this.baseUrl + "/users/" + userId + "/posts");
  }

  getUsersTodos(userId: string): Observable<TodosResponse>{
    return this.http.get<TodosResponse>(this.baseUrl + "/users/" + userId + "/todos");
  }

  addUser(user: User):Observable<User>{
    return this.http.post<User>(this.baseUrl + "/add", user);
  }

  updateUser(user: User):Observable<User>{
    return this.http.put<User>(this.baseUrl + "/" + user.id, user);
  }

  deleteUser(userId: Number): Observable<User>{
    return this.http.delete<User>(this.baseUrl + "/" + userId);
  }
}