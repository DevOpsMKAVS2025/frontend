import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material/modules';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

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

  protected logout(): void {
    this.#router.navigate(['/']);
  }
}
