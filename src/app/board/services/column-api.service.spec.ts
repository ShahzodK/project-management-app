import { TestBed } from '@angular/core/testing';

import { ColumnApiService } from './column-api.service';

describe('ColumnApiService', () => {
  let service: ColumnApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
