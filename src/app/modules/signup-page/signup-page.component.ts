import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignupData} from "../../models/user";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  registerForm!: FormGroup;
  errorMessage: string = "";

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.initializeForm();
  }

  private initializeForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  private setErrorMessage() {
    const nameControl = this.registerForm.get('name');
    const surnameControl = this.registerForm.get('surname');
    const emailControl = this.registerForm.get('email');
    const passwordControl = this.registerForm.get('password');
    const usernameControl = this.registerForm.get('username');
    const addressControl = this.registerForm.get('address');
    if (nameControl?.errors?.['required']) {
      this.errorMessage = 'Name is required';
    } else if (surnameControl?.errors?.['required']) {
      this.errorMessage = 'Surname is required';
    } else if (usernameControl?.errors?.['required']) {
      this.errorMessage = 'Username is required';
    } else if (addressControl?.errors?.['required']) {
      this.errorMessage = 'Address is required';
    } else if (emailControl?.errors?.['required']) {
      this.errorMessage = 'Email is required';
    } else if (emailControl?.errors?.['pattern']) {
      this.errorMessage = 'Invalid email format';
    } else if (passwordControl?.errors?.['required']) {
      this.errorMessage = 'Password is required';
    } else if (passwordControl?.errors?.['minlength']) {
      this.errorMessage = 'Password must be at least 6 characters long';
    } else {
      this.errorMessage = 'Please fill all required fields correctly';
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const signupData = this.getSignupData();
      this.userService.signUp(signupData).subscribe({
        next: () => {
          this.router.navigate(["login"]);
        },
        error: () => {

        }
      })

    } else {
      this.setErrorMessage();
    }
  }

  getSignupData(): SignupData {
    if (!this.registerForm.valid) {
      throw new Error('Form is invalid');
    }

    const formValues = this.registerForm.value;

    const data: SignupData = {
      firstName: formValues.name,
      lastName: formValues.surname,
      address: formValues.address,
      email: formValues.email,
      password: formValues.password,
      username: formValues.username,
      type: formValues.role
    };

    return data;
  }

}
