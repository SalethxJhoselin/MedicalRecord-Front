import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMedicalEmergencyComponent } from './manage-medical-emergency.component';

describe('ManageMedicalEmergencyComponent', () => {
  let component: ManageMedicalEmergencyComponent;
  let fixture: ComponentFixture<ManageMedicalEmergencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMedicalEmergencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMedicalEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
