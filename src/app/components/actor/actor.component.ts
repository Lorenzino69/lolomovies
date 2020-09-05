import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MoviesService} from '../../services/inTheater/movies.service';
import {MovieModel} from '../../models/movie.model';
import {Actors} from '../../models/actors';
import {Images} from '../../models/images';
import {PaginatorModel} from '../../models/paginator.model';
import {Profiles} from '../../models/profiles';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  person: Actors = new Actors();
  movies: MovieModel = new MovieModel();
  externalIds: Object = {};
  images: Array<Profiles> = [];


  constructor(
    private _moviesSerice: MoviesService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this._moviesSerice.getPersonDetail(id).subscribe(person => {
        this.person = person;
      }, error => console.log(error));
      this._moviesSerice.getPersonCast(id).subscribe(res => {
        this.movies = res.cast;
      }, error => console.log(error));

      this._moviesSerice.getPersonExternalData(id).subscribe(res => {
        this.externalIds = res;
      }, error => console.log(error));

      this._moviesSerice.getActorImages(id).subscribe(res => {
        res.profiles = res.profiles.filter( item => { return item.file_path });
        this.images = res.profiles;
        console.log(this.images)
      }, error => console.log(error));
    });
  }

}
