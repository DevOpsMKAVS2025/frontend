import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestModalComponent } from './create-request-modal.component';
import { provideHttpClient } from '@angular/common/http';

describe('CreateRequestModalComponent', () => {
  let component: CreateRequestModalComponent;
  let fixture: ComponentFixture<CreateRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRequestModalComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
