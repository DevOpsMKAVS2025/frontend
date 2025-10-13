import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material/modules';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  readonly #router = inject(Router);

  userType = 'Host';

  protected logout(): void {
    this.#router.navigate(['/']);
  }
}
