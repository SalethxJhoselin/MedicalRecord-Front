import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInsuredComponent } from './manage-insured.component';

describe('ManageInsuredComponent', () => {
  let component: ManageInsuredComponent;
  let fixture: ComponentFixture<ManageInsuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInsuredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
