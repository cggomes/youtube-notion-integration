import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ThemeService } from './../../services/theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isDarkMode$!: Observable<boolean>;
  searchTerm = '';

  constructor(
    private router: Router,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.isDarkMode$ = this.themeService.onThemeChanges;
  }

  handleSubmit(): void {
    if (!!this.searchTerm) {
      this.router.navigate([ '/list' ], {
        queryParams: {
          searchTerm: this.searchTerm,
        },
      });
    }
  }

}
