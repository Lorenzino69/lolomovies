import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TvShowModel} from '../../../models/onTV/tvShow.model';
import {OnTVService} from '../../../services/onTV/onTV.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {
  private season: number;
  tvShow: TvShowModel;

  constructor(private onTvService: OnTVService,private route: ActivatedRoute) {

    }

  ngOnInit() {

    this.route.params.subscribe( (params) => {
      const id = params['id'];
      const seasons = params['seasons'];
      this.onTvService.getTVShow(id).subscribe( tvShow => {
        this.tvShow = tvShow;
      });
      this.season = seasons
      // this.getTVShowsCredits(id)


    });
  }

  // getTVShowsCredits(id) {
  //   const tvCreditsSubs = this.onTvService.getTVShowsCredits(id).subscribe(
  //     res => {
  //       res.cast = res.cast.filter( item => { return item.profile_path });
  //       this.cast = res.cast.slice(0, 5);
  //     }, () => {},
  //     () => { if (tvCreditsSubs) { tvCreditsSubs.unsubscribe() } }
  //   );
  // }

}
