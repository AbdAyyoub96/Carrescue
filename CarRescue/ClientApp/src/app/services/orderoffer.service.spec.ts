import { TestBed, inject } from '@angular/core/testing';

import { OrderofferService } from './orderoffer.service';

describe('OrderofferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderofferService]
    });
  });

  it('should be created', inject([OrderofferService], (service: OrderofferService) => {
    expect(service).toBeTruthy();
  }));
});
