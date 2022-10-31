import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from './../../../environments/environment';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get playlist data when #search', done => {
    const apiUrl = environment.API_URL;
    const searchTerm = 'channel-id-test';
    const mockedPlaylistResponse = {
      items: [
        {
          "id": "PLNYkxOF6rcIBzsbjZKyOdO-iwQTjidz1P",
          "playlistTitle": "Chrome Concepts",
          "channelTitle": "Google Chrome Developers",
          "publishedAt": "2022-08-17T16:58:40Z",
          "thumbnailSrc": "https://i.ytimg.com/vi/WL1guL5n9PU/hqdefault.jpg"
        }
      ]
    };

    service.search(searchTerm)
      .subscribe(data => {
        expect(data).toEqual(mockedPlaylistResponse);
        done();
      });

    const req = httpTestingController.expectOne(`${apiUrl}/channel/${searchTerm}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockedPlaylistResponse);

    httpTestingController.verify();
  });

});
