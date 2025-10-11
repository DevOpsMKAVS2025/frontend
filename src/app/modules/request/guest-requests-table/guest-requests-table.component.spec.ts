import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRequestsTableComponent } from './guest-requests-table.component';

describe('GuestRequestsTableComponent', () => {
  let component: GuestRequestsTableComponent;
  let fixture: ComponentFixture<GuestRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestRequestsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
