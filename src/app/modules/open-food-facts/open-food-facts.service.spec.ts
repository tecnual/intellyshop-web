import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OpenFoodFactsService } from './open-food-facts.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('OpenFoodFactsService', () => {
  let service: OpenFoodFactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(OpenFoodFactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
