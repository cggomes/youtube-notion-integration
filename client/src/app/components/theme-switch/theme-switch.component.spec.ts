import { trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, take } from 'rxjs';

import { ThemeService } from './../../services/theme/theme.service';
import { ThemeSwitchComponent } from './theme-switch.component';

describe('ThemeSwitchComponent', () => {
  let component: ThemeSwitchComponent;
  let fixture: ComponentFixture<ThemeSwitchComponent>;

  const themeObservable = new BehaviorSubject<boolean>(false);
  const themeService = {
    onThemeChanges: themeObservable,
    toggleTheme: () => themeObservable.next(true),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeSwitchComponent ],
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: ThemeService,
          useValue: themeService
        },
        Renderer2
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .overrideComponent(ThemeSwitchComponent, {
      set: {
        animations: [trigger('inOutAnimation', [])]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#switchTheme()', () => {
    let themeServiceSpy: jasmine.Spy;

    beforeEach(() => {
      themeServiceSpy = spyOn(themeService, 'toggleTheme').and.callThrough();
    });

    afterEach(() => {
      themeServiceSpy.calls.reset();
    });

    it('should hide sun icon and change body class to #dark when entering dark mode', done => {
      const switchButton = fixture.debugElement.nativeElement.querySelector('button');
      switchButton.click();

      fixture.detectChanges();

      const compiled = fixture.debugElement;
      const sunComponent = compiled.query(By.css('app-sun'));
      const moonComponent = compiled.query(By.css('app-moon'));

      const document = TestBed.inject(DOCUMENT);

      expect(document.body.className)
        .withContext('body should contain #dark class')
        .toContain('dark');

      expect(moonComponent)
        .withContext('moon should be NOT null when dark mode')
        .not
        .toBeNull();

      expect(sunComponent)
        .withContext('sun should be null when dark mode')
        .toBeNull();

      expect(themeService.toggleTheme).toHaveBeenCalledTimes(1);

      themeService
        .onThemeChanges
        .pipe(take(1))
        .subscribe((isDarkMode: boolean) => {
          expect(isDarkMode)
            .withContext('#isDarkMode returned by #ThemeService must be #true')
            .toBe(true);
          done();
        });
    });

    it('should hide moon icon and remove body class #dark when entering light mode', () => {
      const switchButton = fixture.debugElement.nativeElement.querySelector('button');
      switchButton.click();

      themeServiceSpy.and.callFake(() => themeObservable.next(false));
      switchButton.click();

      fixture.detectChanges();

      const compiled = fixture.debugElement;
      const sunComponent = compiled.query(By.css('app-sun'));
      const moonComponent = compiled.query(By.css('app-moon'));

      const document = TestBed.inject(DOCUMENT);

      expect(document.body.className)
        .withContext('body should NOT contain #dark class')
        .not
        .toContain('dark');

      expect(sunComponent)
        .withContext('sun should be NOT null when light mode')
        .not
        .toBeNull();

      expect(themeService.toggleTheme).toHaveBeenCalledTimes(2);

      expect(moonComponent)
        .withContext('moon should be null when light mode')
        .toBeNull();
    });
  });

});
