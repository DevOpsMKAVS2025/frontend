import { TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../material/modules';

describe('ToolbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToolbarComponent,        // standalone component
        RouterTestingModule,     // router dependencies
        HttpClientTestingModule, // HttpClient mock for UserService
        MaterialModule           // any module ToolbarComponent imports
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
