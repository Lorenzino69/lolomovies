import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MoviesService} from '../../services/inTheater/movies.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  holder: string;

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.holder = 'what are you looking for?';
  }

  search(query: string) {
    if (/\S/.test(query)) {
      console.log('on navigue' + query);
      this.router.navigate(['/search', query]).then(r => r);
    }
  }

}
