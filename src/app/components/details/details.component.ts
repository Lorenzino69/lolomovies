import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchmoviesService } from '../searchmovies/searchmovies.service';
import {Location} from '@angular/common';
import {MovieModel} from '../../models/movie.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  selectedMovie: MovieModel;
  errorMessage: string;
  language: string;

  constructor(
    private moviesService: SearchmoviesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.language = this.moviesService.getLanguage();
    this.route.params.subscribe(
      params => {
        const id = params['id'];
        if (id) { this.getDetails(id); }
      });
  }

  getDetails(id: number) {
    this.moviesService.getDetails(id)
      .subscribe(
        // @ts-ignore
        response => this.selectedMovie = response,
        error => this.errorMessage = <any>error);
  }

  back() {
    this.location.back();
  }
}
