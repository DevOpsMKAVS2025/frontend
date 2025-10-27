import { TestBed } from '@angular/core/testing';
import { ToolbarComponent} from "../modules/toolbar/toolbar.component";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ToolbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToolbarComponent,
        RouterTestingModule,
        HttpClientTestingModule // <- Add this
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
