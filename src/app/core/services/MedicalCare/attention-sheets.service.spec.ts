import { TestBed } from '@angular/core/testing';

import { AttentionSheetsService } from './attention-sheets.service';

describe('AttentionSheetsService', () => {
  let service: AttentionSheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttentionSheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
