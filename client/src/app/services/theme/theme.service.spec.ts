import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit #false on first subscribe', done => {
    service.onThemeChanges
      .subscribe(isDarkMode => {
        expect(isDarkMode).toBe(false);
        done();
      });
  });

  it('should emit #true when theme changes', done => {
    service.toggleTheme();

    service.onThemeChanges
      .subscribe(isDarkMode => {
        expect(isDarkMode).toBe(true);
        done();
      });
  });

  it('should emit #false on second emition', done => {
    service.toggleTheme();
    service.toggleTheme();

    service.onThemeChanges
      .subscribe(isDarkMode => {
        expect(isDarkMode).toBe(false);
        done();
      });
  });

});
