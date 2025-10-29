import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAccommodationComponent } from './search-accommodation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('SearchAccommodationComponent', () => {
  let component: SearchAccommodationComponent;
  let fixture: ComponentFixture<SearchAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAccommodationComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
