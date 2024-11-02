import { TestBed } from '@angular/core/testing';

import { TriajeRecordService } from './triaje-record.service';

describe('TriajeRecordService', () => {
  let service: TriajeRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriajeRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
