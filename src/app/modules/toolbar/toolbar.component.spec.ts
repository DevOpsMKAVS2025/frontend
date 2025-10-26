import { TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ToolbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
