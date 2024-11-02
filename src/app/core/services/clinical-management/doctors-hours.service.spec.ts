import { TestBed } from '@angular/core/testing';

import { DoctorsHoursService } from './doctors-hours.service';

describe('DoctorsHoursService', () => {
  let service: DoctorsHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorsHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
