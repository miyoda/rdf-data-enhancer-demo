import { TestBed } from '@angular/core/testing';

import { RdfUtilsService } from './rdf-utils.service';

describe('RdfUtilsService', () => {
  let service: RdfUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdfUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
