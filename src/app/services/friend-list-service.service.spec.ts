import { TestBed } from '@angular/core/testing';

import { FriendListServiceService } from './friend-list-service.service';

describe('FriendListServiceService', () => {
  let service: FriendListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
