import { TestBed } from '@angular/core/testing';

import { TicketservService } from './ticketserv.service';

describe('TicketservService', () => {
  let service: TicketservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
