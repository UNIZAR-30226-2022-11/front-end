import { TestBed } from '@angular/core/testing';

import { TournamentServiceService } from './tournament-service.service';

describe('TournamentServiceService', () => {
  let service: TournamentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
