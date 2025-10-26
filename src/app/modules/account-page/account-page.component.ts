import {Component, OnInit} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit{
  constructor(private userService: UserService) {
  }
  user: UserData = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    username: 'johndoe',
    email: 'john@example.com',
    password: ''
  };

  editing = {
    firstName: false,
    lastName: false,
    address: false
  };
  ngOnInit(): void {
    this.userService.getAccountInformation().subscribe({
      next: (resp) => {
        this.user.firstName = resp.firstName;
        this.user.lastName = resp.lastName;
        this.user.address = resp.address;
        this.user.username = resp.username;
        this.user.email = resp.email;
      }
    })
  }

  edit(field: keyof typeof this.editing) {
    this.editing[field] = true;
  }

  confirm(field: keyof UserData) {
    // Only toggle editing if the field exists in editing
    if (field in this.editing) {
      this.editing[field as keyof typeof this.editing] = false;
    }

    // Call API to update backend
    console.log(`${field} updated to:`, this.user[field]);

    this.userService.updateAccountInformation({value: this.user[field], property: field}).subscribe({})

    // Reset password input after confirm
    if (field === 'password') {
      this.user.password = '';
    }
  }
}

interface UserData {
  firstName: string;
  lastName: string;
  address: string;
  username: string;
  email: string;
  password: string;
}
