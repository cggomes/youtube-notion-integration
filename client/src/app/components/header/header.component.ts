import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeService } from './../../services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDarkMode$!: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.isDarkMode$ = this.themeService.onThemeChanges;
  }

}
