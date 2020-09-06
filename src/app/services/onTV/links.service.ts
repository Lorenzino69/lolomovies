import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class LinksService {

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;


  constructor(private http: HttpClient, private translate: TranslateService) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = '9ebeb1f5074a5a0edbddc22b59b8f97a';
    this.language = 'en-US';
    this.region = 'US'

    this.translate.onLangChange.subscribe((lang) => {
      this.language = this.translate.currentLang;
    });
  }

  getTvOnTheAir(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/on_the_air?api_key=${this.apiKey}&page=${page}&language=${this.language}`)
  }

  getLinksStreamsTvShow(id: number,season: number, episode: number): Observable<any>{

    // console.log(`https://streamvideo.link/getvideo?key=bzDT471S9aBSrQa6&video_id=${id}&tmdb=1&tv=1&s=${season}&e=${episode}`)
    return this.http.get(`https://streamvideo.link/getvideo?key=bzDT471S9aBSrQa6&video_id=${id}&tmdb=1&tv=1&s=${season}&e=${episode}`)

  }

  getLinksStreamsMovie(id: number): Observable<any>{

    return this.http.get(`https://streamvideo.link/getvideo?key=bzDT471S9aBSrQa6&video_id=${id}&tmdb=1&tv=*TV*&s=*SEASON_NUMBER*&e=*EPISODE_NUMBER*`,)

  }

}
