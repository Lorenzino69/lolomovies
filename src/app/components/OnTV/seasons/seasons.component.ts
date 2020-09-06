import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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

  constructor(private onTvService: OnTVService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      const id = params['id'];
      const seasons = params['seasons'];
      this.onTvService.getTVShow(id).subscribe(tvShow => {
        this.tvShow = tvShow;
      });
      this.id = id;
      this.season = seasons;

      this.getTVShowsSeason(id, seasons);
      this.getTVShowsCredits(id);


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

        console.log(this.tvShowSeason)
        this.CalculSeasonSize(this.tvShowSeason);

      }, () => {
      },
      () => {
        if (tvSeasonsSubs) {
          tvSeasonsSubs.unsubscribe()
        }
      }
    );
  }

  CalculSeasonSize(EpisodeSize) {

    for (this.i = 0; this.i < EpisodeSize.length; this.i++) {
      this.episodes_number = this.i;
    }
  }
}
