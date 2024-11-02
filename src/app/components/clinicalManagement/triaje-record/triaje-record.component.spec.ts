import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriajeRecordComponent } from './triaje-record.component';

describe('TriajeRecordComponent', () => {
  let component: TriajeRecordComponent;
  let fixture: ComponentFixture<TriajeRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriajeRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriajeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
