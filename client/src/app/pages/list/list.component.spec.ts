import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SearchService } from './../../services/search/search.service';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let activatedRouteMock: any = {
    queryParams: of({ searchTerm: 'channel-id-123' })
  };
  let searchServiceMock: any = jasmine.createSpyObj('searchService', ['search']);
  const mockedPlaylistItems = [
      {
        "id": "PLNYkxOF6rcIBzsbjZKyOdO-iwQTjidz1P",
        "playlistTitle": "Chrome Concepts",
        "channelTitle": "Google Chrome Developers",
        "publishedAt": "2022-08-17T16:58:40Z",
        "thumbnailSrc": "https://i.ytimg.com/vi/WL1guL5n9PU/hqdefault.jpg"
      }
    ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock 
        },
        {
          provide: SearchService,
          useValue: searchServiceMock
        },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    searchServiceMock.search.and.returnValue(of({ items: mockedPlaylistItems }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve route playlists data when start', done => {
    component.playlists$.subscribe(playlists => {
      expect(playlists).toEqual(mockedPlaylistItems);
      done();
    });
  });
});
