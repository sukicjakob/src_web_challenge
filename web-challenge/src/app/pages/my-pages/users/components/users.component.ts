import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Address } from '../models/address';
import { AppAddUserDialog } from './add-user-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './users.component.html',
  styleUrls: ['./styles/users.component.scss']
})

export class AppUsersComponent implements OnInit {

  @Input() user: User = {} as User;
  public usersList: User[];
  filteredUsersList: User[];
  searchValue: string = "";
  filterValue: string = "";
  limitValue: number = 0;
  skipValue: number = 0;
  selectValue: string = "";
  displayedColumns: string[] = ['image', 'name', 'birthDate', 'address', 'email'];
  dialogOpened = false;

  imports: [
    CommonModule,
    ReactiveFormsModule
  ];
    static usersList: any;

  constructor(private usersService: UsersService, private addUserDialog: MatDialog) {
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
      this.filteredUsersList = res.users ?? []
    });
  }

  filterUsers(){
    this.filterValue = (<HTMLInputElement>document.getElementById("filterInputField")).value;

    if(!this.filterValue){
      this.ngOnInit();
      return;
    }

    this.usersService.filterUsers(this.filterValue).subscribe(res => {
      this.filteredUsersList = res.users ?? [];
    });
  }

  applySettings(){
    this.limitValue = parseInt((<HTMLInputElement>document.getElementById("limitInputField")).value);
    this.skipValue = parseInt((<HTMLInputElement>document.getElementById("skipInputField")).value);
    this.selectValue = (<HTMLInputElement>document.getElementById("selectInputField")).value;
    this.getAllUsers();
  }

  openAddUserDialog(){
    this.addUserDialog.open(AppAddUserDialog,{width:'50%'});
  }

  ngOnInit(): void {}
}