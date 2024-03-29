import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { Cart } from '../../carts/models/cart';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../models/post';
import { Address } from '../models/address';
import { Todo } from '../models/todo';
import { Product } from '../../products/models/product';
import { Bank } from '../models/bank';
import { Company } from '../models/company';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./styles/users.component.scss']
})

export class AppUserDetailsComponent implements OnInit {

  @Input() user: User = {} as User;
  @Input() userAddress: Address = {} as Address;
  @Input() userBank: Bank = {} as Bank;
  @Input() userCompany: Company = {} as Company;

  @Input() userCarts: Cart[] = [];
  @Input() productsInCart: Product[] = [];
  @Input() userPosts: Post[] = [];
  @Input() userTodos: Todo[] = [];

  route: ActivatedRoute = inject(ActivatedRoute);
  userId = -1;
  selectedGender = "";
  updatingUser = false;
  userDeleted = false;

  imports: [
    CommonModule,
    ReactiveFormsModule
  ];

  updateUserForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthDate: new FormControl(''),
    gender: new FormControl(''),
    height: new FormControl(0),
    weight: new FormControl(0),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    postalCode: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl('')
  })

  constructor(private usersService: UsersService) {
    this.userId = Number(this.route.snapshot.params['id']);

    if(!this.updatingUser)
      this.updateUserForm.disable();

    this.usersService.getUser(this.userId).subscribe(res => {
      this.user = res || {}; 
      this.userAddress = res.address;
      this.userBank = res.bank || {} as Bank;
      this.userCompany = res.company || {} as Company;
      this.selectedGender = this.user.gender || "";
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

  submitUpdateUser(){
    this.updatingUser = !this.updatingUser;
    console.log(this.updatingUser);

    if(!this.updatingUser){
      this.updateUserForm.disable();
      let address: Address = {
        "address": this.updateUserForm.value.address ?? '',
        "city": this.updateUserForm.value.city ?? '',
        "state": this.updateUserForm.value.state ?? '',
        "postalCode": this.updateUserForm.value.postalCode ?? '',
        "coordinates": {"lat": 0, "lng": 0}
      };
  
      let user: User = {
        id: this.userId,
        firstName: this.updateUserForm.value.firstName ?? '',
        lastName: this.updateUserForm.value.lastName ?? '',
        birthDate: this.updateUserForm.value.birthDate ?? '',
        gender: this.updateUserForm.value.gender ?? '',
        height: this.updateUserForm.value.height ?? 0,
        weight: this.updateUserForm.value.weight ?? 0,
        email: this.updateUserForm.value.email ?? '',
        phone: this.updateUserForm.value.phone ?? '',
        address: address,
        image: '',
        bank: this.userBank,
        company: this.userCompany
      };
  
      this.usersService.updateUser(user).subscribe(res => {
        console.log(res);
      });

      return;
    }
    this.updateUserForm.enable();
  }

  deleteUser(){
    this.usersService.deleteUser(this.user.id!).subscribe(res => {
      this.userDeleted = res.isDeleted ?? false;
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    })
  }
}
