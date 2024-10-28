import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpecialtiesComponent } from './manage-specialties.component';

describe('ManageSpecialtiesComponent', () => {
  let component: ManageSpecialtiesComponent;
  let fixture: ComponentFixture<ManageSpecialtiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSpecialtiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSpecialtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
