import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionQuotasComponent } from './attention-quotas.component';

describe('AttentionQuotasComponent', () => {
  let component: AttentionQuotasComponent;
  let fixture: ComponentFixture<AttentionQuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttentionQuotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttentionQuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
