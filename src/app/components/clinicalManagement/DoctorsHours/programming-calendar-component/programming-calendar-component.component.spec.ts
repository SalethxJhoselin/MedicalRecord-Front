import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingCalendarComponentComponent } from './programming-calendar-component.component';

describe('ProgrammingCalendarComponentComponent', () => {
  let component: ProgrammingCalendarComponentComponent;
  let fixture: ComponentFixture<ProgrammingCalendarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammingCalendarComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammingCalendarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
