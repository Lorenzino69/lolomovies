import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class EpisodeService {

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = '9ebeb1f5074a5a0edbddc22b59b8f97a';
    this.language = 'fr-Fr';
    this.region = 'FR'
    this.translate.onLangChange.subscribe((lang) => {
      this.language = this.translate.currentLang;
    });
  }

  getEpisode(id: number, season: number, episode: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/${id}/season/${season}/episode/${episode}?api_key=${this.apiKey}&language=${this.language}`)
  }

  getTVAiringToday(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/airing_today?api_key=${this.apiKey}&page=${page}&language=${this.language}`)
  }



}
