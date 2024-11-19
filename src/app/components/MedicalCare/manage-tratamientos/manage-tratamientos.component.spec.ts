import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTratamientosComponent } from './manage-tratamientos.component';

describe('ManageTratamientosComponent', () => {
  let component: ManageTratamientosComponent;
  let fixture: ComponentFixture<ManageTratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTratamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
