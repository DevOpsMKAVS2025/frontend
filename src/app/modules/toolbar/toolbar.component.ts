import { Component } from '@angular/core';
import { MaterialModule } from '../../material/modules';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  userType = 'Guest';

  protected logout(): void {
    console.log('User logged out');
  }
}
