import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAccommodationComponent } from './search-accommodation.component';

describe('SearchAccommodationComponent', () => {
  let component: SearchAccommodationComponent;
  let fixture: ComponentFixture<SearchAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAccommodationComponent]
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
