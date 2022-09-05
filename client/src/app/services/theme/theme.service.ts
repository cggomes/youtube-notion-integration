import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkMode = false;
  private themeChanges = new BehaviorSubject<boolean>(this.isDarkMode);

  onThemeChanges = this.themeChanges.asObservable();

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeChanges.next(this.isDarkMode);
  }
}
