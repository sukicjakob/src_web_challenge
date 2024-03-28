import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})

export class AppUserDetailsComponent implements OnInit {

  @Input() user: User = {} as User;
  route: ActivatedRoute = inject(ActivatedRoute);
  userId = -1;

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
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    })
  }
}
