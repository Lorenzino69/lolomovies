import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TvShowModel} from '../../../models/onTV/tvShow.model';
import {OnTVService} from '../../../services/onTV/onTV.service';
import {TvShowSeasonModel} from '../../../models/onTV/TVShowSeason.model';
import {MovieCast} from '../../../models/movie-cast';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
  private season: number;
  tvShow: TvShowModel;
  tvShowSeason: TvShowSeasonModel
  cast: MovieCast;
  private id: any;
  private episodes_number: number;
  private i: number;
  private seasonSize: number;
  seasons = [];

  constructor(private onTvService: OnTVService, private route: ActivatedRoute,private router: Router) {

  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      const id = params['id'];
      const seasons = params['seasons'];
      this.onTvService.getTVShow(id).subscribe(tvShow => {
        this.tvShow = tvShow;
        this.seasonSize = tvShow.number_of_seasons;
        this.CalculSeasonSize(this.seasonSize);
      });
      this.id = id;
      this.season = seasons;

      this.getTVShowsSeason(id, seasons);
      this.getTVShowsCredits(id);

      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      });
    });
  }


  getTVShowsCredits(id) {
    const tvCreditsSubs = this.onTvService.getTVShowsCredits(id).subscribe(
      res => {
        res.cast = res.cast.filter(item => {
          return item.profile_path
        });
        this.cast = res.cast.slice(0, 5);
      }, () => {
      },
      () => {
        if (tvCreditsSubs) {
          tvCreditsSubs.unsubscribe()
        }
      }
    );
  }

  getTVShowsSeason(id, season) {
    const tvSeasonsSubs = this.onTvService.getTVShowsSeason(id, season).subscribe(
      res => {
        res.episodes = res.episodes.filter(item => {
          return item
        });

        this.tvShowSeason = res.episodes

        this.CalculEpisodeSize(this.tvShowSeason);

      }, () => {
      },
      () => {
        if (tvSeasonsSubs) {
          tvSeasonsSubs.unsubscribe()
        }
      }
    );
  }

  upOnRouting(){
    window.scrollTo(0, 0)
  }

  CalculEpisodeSize(EpisodeSize) {

    for (this.i = 1; this.i <= EpisodeSize.length; this.i++) {
      this.episodes_number = this.i;
    }
  }

  CalculSeasonSize(SeasonSize){
  this.seasons = [];
    for(this.i = 1 ; this.i <=SeasonSize; this.i++){
      this.seasons.push(this.i)
    }
  }

  navigateTo(value,id){
    this.router.navigate(['/tv-show',id,'seasons',value]);

  }
}
