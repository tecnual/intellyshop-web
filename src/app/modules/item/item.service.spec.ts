import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
