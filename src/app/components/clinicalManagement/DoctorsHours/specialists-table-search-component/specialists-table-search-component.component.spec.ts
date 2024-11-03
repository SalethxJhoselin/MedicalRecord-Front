import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistsTableSearchComponentComponent } from './specialists-table-search-component.component';

describe('SpecialistsTableSearchComponentComponent', () => {
  let component: SpecialistsTableSearchComponentComponent;
  let fixture: ComponentFixture<SpecialistsTableSearchComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistsTableSearchComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialistsTableSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
