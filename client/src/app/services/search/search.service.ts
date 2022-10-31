import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { PlaylistResponseModel } from './../../models/PlaylistResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly API_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) { }

  search(searchTerm: string): Observable<PlaylistResponseModel> {
    return this.http.get<PlaylistResponseModel>(`${this.API_URL}/channel/${searchTerm}`);
  }
}
