import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ActorService {

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient, private readonly translate: TranslateService) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = '9ebeb1f5074a5a0edbddc22b59b8f97a';
    this.translate.onLangChange.subscribe((lang) => {
      this.language = this.translate.currentLang;
    });
    this.region = 'US';
  }


  getActorCast(id: string): Observable<any> {
    console.log("appel actor :" + id)
    return this.http.get(`${this.baseUrl}person/${id}/movie_credits?api_key=${this.apiKey}&language=${this.language}`)
  }

  getActorImages(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}/images?api_key=${this.apiKey}&language=${this.language}`)
  }

}
