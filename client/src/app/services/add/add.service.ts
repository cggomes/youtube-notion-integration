import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  addPlaylist(id: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}`, { id });
  }
}
