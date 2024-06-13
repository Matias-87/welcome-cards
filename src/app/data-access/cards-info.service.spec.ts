import { TestBed } from '@angular/core/testing';

import { CardsInfoService } from './cards-info.service';

describe('CardsInfoService', () => {
  let service: CardsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
