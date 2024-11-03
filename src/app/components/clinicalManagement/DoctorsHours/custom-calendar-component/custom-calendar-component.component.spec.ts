import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalendarComponentComponent } from './custom-calendar-component.component';

describe('CustomCalendarComponentComponent', () => {
  let component: CustomCalendarComponentComponent;
  let fixture: ComponentFixture<CustomCalendarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCalendarComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCalendarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
