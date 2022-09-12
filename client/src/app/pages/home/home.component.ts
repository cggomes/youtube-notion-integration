import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  searchTerm = '';

  constructor(
    private router: Router,
  ) {}

  handleSubmit(): void {
    if (!!this.searchTerm) {
      this.router.navigate([ '/results' ], {
        queryParams: {
          searchTerm: this.searchTerm,
        },
      });
    }
  }

}
