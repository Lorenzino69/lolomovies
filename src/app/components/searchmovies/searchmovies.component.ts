import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { Observable }               from 'rxjs/Observable';
import { SearchmoviesService }            from './searchmovies.service';
import {MovieModel} from '../../models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './searchmovies.component.html',
  styleUrls: ['./searchmovies.component.css']
})

export class SearchmoviesComponent implements OnInit {
  movies: Observable<MovieModel[]>;
  language: string;
  sort: number;

  constructor(
    private moviesService: SearchmoviesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movies = this.moviesService.getMovies();
  }

  dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  sortMovies(property: string) {
    if (property === 'title') {
      if (this.sort === 1) {
        this.movies = this.movies.map(items => items.sort(this.dynamicSort('-title')));
        this.sort = -1;
      } else {
        this.movies = this.movies.map(items => items.sort(this.dynamicSort('title')));
        this.sort = 1;
      }
    } else if (property === 'popularity') {
      if (this.sort === 2) {
        this.movies = this.movies.map(items => items.sort(this.dynamicSort('-popularity')));
        this.sort = -2;
      } else {
        this.movies = this.movies.map(items => items.sort(this.dynamicSort('popularity')));
        this.sort = 2;
      }
    }
  }

  onSelect(movie: MovieModel) {
    this.router.navigate(['./searchmovie', movie.id]);
  }
}
