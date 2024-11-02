import { TestBed } from '@angular/core/testing';

import { AttentionQuotasService } from './attention-quotas.service';

describe('AttentionQuotasService', () => {
  let service: AttentionQuotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttentionQuotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
