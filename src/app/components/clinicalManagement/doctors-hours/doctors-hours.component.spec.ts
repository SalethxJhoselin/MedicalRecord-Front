import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsHoursComponent } from './doctors-hours.component';

describe('DoctorsHoursComponent', () => {
  let component: DoctorsHoursComponent;
  let fixture: ComponentFixture<DoctorsHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsHoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
