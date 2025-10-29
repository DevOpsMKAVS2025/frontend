import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material/modules';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  readonly #router = inject(Router);

  userType = 'Guest';
  constructor(private userService: UserService) {
    this.userService.user.subscribe({
      next: (user) => {
        this.userType = user?.role!;
      }
    })
  }
  // userType = 'Host';

  protected logout(): void {
    this.userService.logOut();
    this.#router.navigate(['/login']);
  }
}
