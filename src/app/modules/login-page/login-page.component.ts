import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgClass, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgIf,
    HttpClientModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  errorMessage: string = "";
  emailError: boolean = false;
  passwordError: boolean = false;

  constructor(private userService: UserService, private router: Router) {
  }

  authForm: FormGroup      = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required])
  })

  onSubmit() {
    this.login();
  }

  private hasEmailErrorMessage(): boolean {
    const emailErrors = this.authForm.get("email")?.errors;

    if (emailErrors) {
      this.emailError = true;
      if (emailErrors["required"]) {
        this.errorMessage = "Email is required";
        return true;
      }
      if (emailErrors["email"]) {
        this.errorMessage = "Email is not in correct format"
        return true;
      }
    }
    return false;
  }
  private hasPasswordErrorMessage(): boolean {
    const passwordErrors = this.authForm.get("pass")?.errors;

    if (passwordErrors) {
      this.passwordError = true;
      if (passwordErrors["required"]) {
        this.errorMessage = "Password is required";
        return true;
      }
    }
    return false;
  }

  login() {
    this.emailError = false;
    this.passwordError = false;
    this.errorMessage = "";
    if (this.hasEmailErrorMessage() || this.hasPasswordErrorMessage()) {
      return;
    }
    let credentials = {
      email: this.authForm.controls["email"].value,
      password: this.authForm.controls["pass"].value
    };

    this.userService.loginUser(credentials).subscribe({
      next: (resp: any) => {

        this.userService.setToken(resp);
        this.userService.loadUser();
        this.userService.user.subscribe((user: any) => {
          this.router.navigate(["/home"])
        });
      },
      error: (error: any) => {
        this.authForm.get('pass')?.setValue(null);
        this.errorMessage = error.error.message;
      }
    });
  }
}
