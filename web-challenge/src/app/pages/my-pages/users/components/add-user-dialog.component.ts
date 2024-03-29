import { Component, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Address } from "../models/address";
import { User } from "../models/user";
import { UsersService } from "../services/users.service";

@Component({
    selector: 'app-add-user-dialog',
    templateUrl: './add-user-dialog.component.html',
    styleUrls: ['./styles/users.component.scss']
  })

export class AppAddUserDialog{
  
    @Input() user: User = {} as User;
    @Input() userAddress: Address = {} as Address;
    selectedGender: string = "";
    constructor(private usersService: UsersService, private addUserDialog: MatDialogRef<AppAddUserDialog>){}
  
    addUserForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      birthDate: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      postalCode: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl('')
    })
  
    submitAddUser(){
        let address: Address = {
            "address": this.addUserForm.value.address ?? '',
            "city": this.addUserForm.value.city ?? '',
            "state": this.addUserForm.value.state ?? '',
            "postalCode": this.addUserForm.value.postalCode ?? '',
            "coordinates": {"lat": 0, "lng": 0}
          };
      
          let user: User = {
            firstName: this.addUserForm.value.firstName ?? '',
            lastName: this.addUserForm.value.lastName ?? '',
            birthDate: this.addUserForm.value.birthDate ?? '',
            email: this.addUserForm.value.email ?? '',
            phone: this.addUserForm.value.phone ?? '',
            address: address,
            image: '',
          };

          this.usersService.addUser(user).subscribe(res => {
            console.log(res)
          });

          this.closeAddUserDialog();
    }
  
    closeAddUserDialog(){
      this.addUserDialog.close();
    }
  }