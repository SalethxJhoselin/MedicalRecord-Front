import { TestBed } from '@angular/core/testing';

import { AssignPermissionsService } from './assign-permissions.service';

describe('AssignPermissionsService', () => {
  let service: AssignPermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignPermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
