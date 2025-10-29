import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAccommodationComponent } from './host-accommodation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('HostAccommodationComponent', () => {
  let component: HostAccommodationComponent;
  let fixture: ComponentFixture<HostAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostAccommodationComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
