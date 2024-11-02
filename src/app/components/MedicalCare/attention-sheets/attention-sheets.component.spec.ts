import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionSheetsComponent } from './attention-sheets.component';

describe('AttentionSheetsComponent', () => {
  let component: AttentionSheetsComponent;
  let fixture: ComponentFixture<AttentionSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttentionSheetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttentionSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
