import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ListService } from './list.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterModule.forRoot([]),
        RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
