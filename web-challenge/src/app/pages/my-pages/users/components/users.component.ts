import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './users.component.html',
})

export class AppUsersComponent implements OnInit {

  @Input() user: User = {} as User;
  usersList: User[];
  filteredUsersList: User[];
  searchValue: string = "";
  limitValue: number = 0;
  skipValue: number = 0;
  selectValue: string = "";
  displayedColumns: string[] = ['image', 'name', 'address', 'email', 'phone'];
  imports: [
    CommonModule,
    ReactiveFormsModule
  ];

  constructor(private usersService: UsersService) {
    this.getAllUsers();
  }

  getAllUsers(){
    this.usersService.getAllUsers(this.limitValue, this.skipValue, this.selectValue).subscribe(res => {
      this.usersList = res.users ?? [];
      this.filteredUsersList = this.usersList;
    });
  }

  searchUsers(){
    this.searchValue = (<HTMLInputElement>document.getElementById("searchInputField")).value;

    if(!this.searchValue){
      this.ngOnInit();
      return;
    }

    this.usersService.searchUsers(this.searchValue).subscribe(res => {
    this.filteredUsersList = res.users ?? []});
  }

  filterUsers(text: string){
    if(!text){
      this.filteredUsersList = this.usersList;
      return;
    }

    this.filteredUsersList = this.usersList.filter(user => user?.firstName.toLowerCase().includes(text.toLowerCase()));
  }

  applySettings(){
    this.limitValue = parseInt((<HTMLInputElement>document.getElementById("limitInputField")).value);
    this.skipValue = parseInt((<HTMLInputElement>document.getElementById("skipInputField")).value);
    this.selectValue = (<HTMLInputElement>document.getElementById("selectInputField")).value;
    this.getAllUsers();
  }

  handleTableRowClick(user: User){
    console.log("Clicked: " + user.id);
  }

  ngOnInit(): void {}
}
