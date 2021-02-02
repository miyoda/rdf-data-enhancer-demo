import { TestBed } from '@angular/core/testing';

import { RdfRepositoryService } from './rdf-repository.service';

describe('RdfRepositoryService', () => {
  let service: RdfRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdfRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
