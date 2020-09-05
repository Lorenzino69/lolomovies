import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class SearchService {
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = '9ebeb1f5074a5a0edbddc22b59b8f97a';
  private language;

  constructor (private http: HttpClient, private translate: TranslateService) {
    this.translate.onLangChange.subscribe((lang) => {
      this.language = this.translate.currentLang;
    });
  }

  searchMovies(query: string, page: number) {
    const searchUrl = `${this.searchUrl}?api_key=${this.apiKey}&language=${this.language}&query=${query}&page=${page}`;

    return this.http.get(searchUrl)
      .map((res) => { return res })
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
