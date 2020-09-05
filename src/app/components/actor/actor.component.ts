import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MoviesService} from '../../services/inTheater/movies.service';
import {MovieModel} from '../../models/movie.model';
import {Actors} from '../../models/actors';
import {Images} from '../../models/images';
import {PaginatorModel} from '../../models/paginator.model';
import {Profiles} from '../../models/profiles';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {Observable} from 'rxjs';
import {ActorService} from '../../services/actor/actor.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit, AfterViewInit {

  person: Actors = new Actors();
  movies: Array<MovieModel> = [];
  externalIds: Object = {};
  images: Array<Profiles> = [];
  public config: SwiperConfigInterface = {};

  constructor(
    private _moviesSerice: MoviesService,
    private actorService: ActorService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this._moviesSerice.getPersonDetail(id).subscribe(person => {
        this.person = person;
        console.log(this.person);
      }, error => console.log(error));
      this.actorService.getActorCast(id).subscribe(res => {
        // res.cast = res.cast.filter( item => { return item.backdrop_path });
        this.movies = res.cast;
        this.movies.forEach(np => np['isMovie'] = true);
      }, error => console.log(error));

      this._moviesSerice.getPersonExternalData(id).subscribe(res => {
        this.externalIds = res;
      }, error => console.log(error));

      this.actorService.getActorImages(id).subscribe(res => {
        res.profiles = res.profiles.filter( item => { return item.file_path });
        this.images = res.profiles;
      }, error => console.log(error));
    });
    setTimeout(() => {
      this.config = {
        direction: 'horizontal',
        slidesPerView: 4,
        navigation: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          hideOnClick: true
        },
        breakpoints: {
          1199: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 0,
          }
        },
        spaceBetween: 20
      };
    }, 200)


  }
  ngAfterViewInit() {

    // setTimeout(() => {
    //   this.config = {
    //     direction: 'horizontal',
    //     slidesPerView: 4,
    //     navigation: true,
    //     pagination: {
    //       el: '.swiper-pagination',
    //       clickable: true,
    //       hideOnClick: true
    //     },
    //     breakpoints: {
    //       1199: {
    //         slidesPerView: 4,
    //         spaceBetween: 20,
    //       },
    //       991: {
    //         slidesPerView: 2,
    //         spaceBetween: 20,
    //       },
    //       767: {
    //         slidesPerView: 2,
    //         spaceBetween: 20,
    //       },
    //       480: {
    //         slidesPerView: 1,
    //         spaceBetween: 0,
    //       }
    //     },
    //     spaceBetween: 20
    //   };
    // }, 250)
  }

  changeTab() {

    this.config = {
      direction: 'horizontal',
      slidesPerView: 4,
      navigation: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        hideOnClick: true
      },
      breakpoints: {
        1199: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        991: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 0,
        }
      },
      spaceBetween: 20
    };
  }

}
