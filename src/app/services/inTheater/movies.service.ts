import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class MoviesService {

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

  getNowPlaying(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/now_playing?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }

  searchMovies(searchStr: string, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchStr}&page=${page}&language=${this.language}&region=${this.region}`)
  }

  getPopular(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }

  getUpComingMovies(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/upcoming?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }

  getTopRatedMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/top_rated?api_key=${this.apiKey}&language=${this.language}`)
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=${this.language}`)
  }

  getMoviesByGenre(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/${id}/movies?api_key=${this.apiKey}&language=${this.language}`)
  }

  getMovie(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}?api_key=${this.apiKey}&language=${this.language}`)
  }

  getMovieReviews(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/reviews?api_key=${this.apiKey}&language=${this.language}`)
  }

  getMovieCredits(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/credits?api_key=${this.apiKey}&language=${this.language}`)
  }

  getMovieVideos(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}&language=${this.language}`)
  }

  getRecomendMovies(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/recommendations?api_key=${this.apiKey}&language=${this.language}`)
  }

  getPersonDetail(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}?api_key=${this.apiKey}`)
  }

  getPersonExternalData(id: string) {
    return this.http.get(`${this.baseUrl}person/${id}/external_ids?api_key=${this.apiKey}&language=${this.language}`)
  }

  getPersonCast(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}/movie_credits?api_key=${this.apiKey}&language=${this.language}`)
  }

  getActorImages(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}/images?api_key=${this.apiKey}&language=${this.language}`)
  }

}
