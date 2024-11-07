import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInsuredsComponent } from './manage-insureds.component';

describe('ManageInsuredsComponent', () => {
  let component: ManageInsuredsComponent;
  let fixture: ComponentFixture<ManageInsuredsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInsuredsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInsuredsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
