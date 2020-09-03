import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {MovieModel} from '../../models/movie.model';

@Injectable()
export class SearchmoviesService {
  private url = 'https://api.themoviedb.org/3/movie/';
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = '9ebeb1f5074a5a0edbddc22b59b8f97a';
  private language;

  constructor (private http: HttpClient, private translate: TranslateService) {
    this.translate.onLangChange.subscribe((lang) => {
      this.language = this.translate.currentLang;
    });
  }

  getMovies(): Observable<MovieModel[]> {
    const moviesUrl = `${this.url}popular?api_key=${this.apiKey}&language=${this.language}`;

    // @ts-ignore
    return this.http.get(moviesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchMovies(query: string) {
    const searchUrl = `${this.searchUrl}?api_key=${this.apiKey}&language=${this.language}&query=${query}`;

    return this.http.get(searchUrl)
      .map((res) => { return res })
  }

  getDetails(id: number) {
    const detailsUrl = `${this.url}${id}?api_key=${this.apiKey}&language=${this.language}`;

    return this.http.get(detailsUrl)
      .map((res) => { return res })
  }

  changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.language = lang;
  }

  getLanguage() {
    return this.language;
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
