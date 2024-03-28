import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { Cart } from '../../carts/models/cart';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../models/post';
import { Todo } from '../models/todo';
import { Product } from '../../products/models/product';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./styles/user-details.component.scss']
})

export class AppUserDetailsComponent implements OnInit {

  @Input() user: User = {} as User;
  @Input() userCarts: Cart[] = [];
  @Input() productsInCart: Product[] = [];
  @Input() userPosts: Post[] = [];
  @Input() userTodos: Todo[] = [];

  route: ActivatedRoute = inject(ActivatedRoute);
  userId = -1;
  imports: [
    CommonModule,
    ReactiveFormsModule
  ];

  updateProductForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
    discountPercentage: new FormControl(0.0),
    rating: new FormControl(0),
    stock: new FormControl(0),
    brand: new FormControl(''),
    category: new FormControl(''),
  })

  constructor(private usersService: UsersService) {
    this.userId = Number(this.route.snapshot.params['id']);
    this.usersService.getUser(this.userId).subscribe(res => {
      this.user = res || {}; 
    });
    this.usersService.getUsersCarts(this.userId).subscribe(res => {
      this.userCarts = res.carts ?? [];
    });
    this.usersService.getUsersPosts(this.userId).subscribe(res => {
      this.userPosts = res.posts ?? [];
    });
    this.usersService.getUsersTodos(this.userId).subscribe(res => {
      this.userTodos = res.todos ?? [];
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    })
  }
}
