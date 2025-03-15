import { TestBed } from '@angular/core/testing';

import { NgxGlagolizeService } from './ngx-glagolize.service';

describe('NgxGlagolizeService', () => {
  let service: NgxGlagolizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxGlagolizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
