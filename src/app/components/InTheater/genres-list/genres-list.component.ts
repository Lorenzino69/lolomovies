import {Component, OnInit} from '@angular/core';
import { MoviesService } from '../../../services/inTheater/movies.service';
import {GenresListModel} from '../../../models/genres-list';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent implements OnInit {

  genres: GenresListModel;

  constructor(
    private _moviesServices: MoviesService
  ) {}

  ngOnInit() {
    this._moviesServices.getGenres().subscribe( res => {
        this.genres = res.genres;
      }
    );
  }
}
