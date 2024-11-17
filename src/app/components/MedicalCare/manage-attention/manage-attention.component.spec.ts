import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttentionComponent } from './manage-attention.component';

describe('ManageAttentionComponent', () => {
  let component: ManageAttentionComponent;
  let fixture: ComponentFixture<ManageAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAttentionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
