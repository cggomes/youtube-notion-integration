import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Observable, take } from 'rxjs';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ThemeService } from './../../services/theme/theme.service';
import { SearchService } from './../../services/search/search.service';
import { PlaylistItem } from './../../models/PlaylistResponseModel';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isDarkMode$!: Observable<boolean>;
  playlists$!: Observable<PlaylistItem[]>;

  constructor(
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private viewContainerRef: ViewContainerRef,
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

  handleItemClick(item: PlaylistItem): void {
    const component = this.viewContainerRef.createComponent(ConfirmationModalComponent);
    component.instance.onClose
      .pipe(take(1))
      .subscribe(addPlaylist => {
        console.log(addPlaylist);
        if (addPlaylist) {
          // TODO: call service
        }
      });
  }
}
