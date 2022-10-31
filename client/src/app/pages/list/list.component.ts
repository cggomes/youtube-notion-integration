import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ThemeService } from './../../services/theme/theme.service';
import { SearchService } from './../../services/search/search.service';
import { PlaylistItems } from './../../models/PlaylistResponseModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isDarkMode$!: Observable<boolean>;
  playlists$!: Observable<PlaylistItems[]>;

  constructor(
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.isDarkMode$ = this.themeService.onThemeChanges;

    this.playlists$ = this.route.queryParams
      .pipe(
        mergeMap(({ searchTerm }) => this.searchService.search(searchTerm)),
        map(playlistResponse => playlistResponse.items.map(item => {
          item.publishedAt = new Date(item.publishedAt)
            .toLocaleDateString(undefined, { day: '2-digit', year: 'numeric', month: 'short' });
          return item;
        })),
      );
  }

}
