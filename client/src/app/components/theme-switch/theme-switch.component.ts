import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ThemeService } from './../../services/theme/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('.5s ease-out', style({ height: 32, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 32, opacity: 1 }),
            animate('.5s ease-in', style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ThemeSwitchComponent implements OnInit {

  isDarkMode$!: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.watchThemeChanges();
  }

  private watchThemeChanges(): void {
    this.isDarkMode$ = this.themeService
      .onThemeChanges
      .pipe(
        tap(isDarkMode => this.handleThemeChanges(isDarkMode))
      );
  }

  private handleThemeChanges(isDarkMode: boolean): void {
    if (isDarkMode) {
      this.renderer2.addClass(this.document.body, 'dark');
    } else {
      this.renderer2.removeClass(this.document.body, 'dark');
    }
  }

  switchTheme(): void {
    this.themeService.toggleTheme();
  }

}
