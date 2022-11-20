import { ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap, Observable, take, tap, BehaviorSubject } from 'rxjs';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { AddService } from './../../services/add/add.service';
import { ThemeService } from './../../services/theme/theme.service';
import { SearchService } from './../../services/search/search.service';
import { PlaylistItem } from './../../models/PlaylistResponseModel';
import { ConfirmationModalComponent } from './../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isDarkMode$!: Observable<boolean>;
  playlists$!: Observable<PlaylistItem[]>;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private viewContainerRef: ViewContainerRef,
    private addService: AddService,
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
      .pipe(
        take(1),
        tap(addPlaylist => {
          this.loading$.next(addPlaylist);
          if (!addPlaylist) {
            component.instance.confirmationModal.nativeElement.close();
          }
        }),
        filter(addPlaylist => !!addPlaylist),
        mergeMap(() => this.addService.addPlaylist(item.id))
      )
      .subscribe(() => {
        component.instance.confirmationModal.nativeElement.close();
        this.loading$.next(false);
        alert('Playlist adicionada com sucesso!')
      });
  }
}
