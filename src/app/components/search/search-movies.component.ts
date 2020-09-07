import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { SearchService }            from './search.service';
import {MoviesService} from '../../services/inTheater/movies.service';
import {MovieModel} from '../../models/movie.model';

@Component({
  selector: 'app-search-movies',
  templateUrl: 'search-movies.component.html',
  styleUrls: ['search-movies.component.css']
})
export class SearchMoviesComponent implements OnInit {
  searches: Object;
  movies: MovieModel[];
  total_results: number;
  total_pages: number;
  page: number;
  query: string;
  language: string;
  sort: number;
  private elementsFiltered: any;

  constructor(
    private searchService: SearchService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.query = params['query'];
        this.page = 1;
        this.searchMulti(this.query, this.page);
      });
  }



  searchMulti(query: string, page: number) {
    this.searchService.searchMulti(query, page)
      .subscribe(
        response => {
          this.movies = response['results']
          this.searches = response;
          this.total_results = response['total_results'];
          this.total_pages = response['total_pages'];
          this.page = response['page'];


        },
        error => console.error(error)
      );
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
        this.movies.sort(this.dynamicSort('-title'));
        this.sort = -1;
      } else {
        this.movies.sort(this.dynamicSort('title'));
        this.sort = 1;
      }
    } else if (property === 'popularity') {
      if (this.sort === 2) {
        this.movies.sort(this.dynamicSort('-popularity'));
        this.sort = -2;
      } else {
        this.movies.sort(this.dynamicSort('popularity'));
        this.sort = 2;
      }
    }
  }

  goPage(go: number) {
    const newPage = this.page + go;
    if (newPage <= this.total_pages && newPage >= 1) {
      this.searchMulti(this.query, newPage);
    }
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 2);
  }

  onSelect(movie: MovieModel) {
    this.router.navigate(['./movie', movie.id]);
  }
}
