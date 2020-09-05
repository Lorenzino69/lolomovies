import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MoviesService} from '../../services/inTheater/movies.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  holder: string;


  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private translate: TranslateService
  ) { this.holder = this.translate.instant('lolo.movie.holder');}

  ngOnInit() {
    this.holder = this.translate.instant('lolo.movie.holder');
  }

  search(query: string) {
    if (/\S/.test(query)) {
      this.router.navigate(['/search', query]).then(r => r);
    }
  }

}
