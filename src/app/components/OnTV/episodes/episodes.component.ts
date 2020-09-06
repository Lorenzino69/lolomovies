import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {TvShowModel} from '../../../models/onTV/tvShow.model';
import {OnTVService} from '../../../services/onTV/onTV.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MovieVideo} from '../../../models/movie-video';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PaginatorModel} from '../../../models/paginator.model';
import {MovieCast} from '../../../models/movie-cast';
import {TvShowSeasonModel} from '../../../models/onTV/TVShowSeason.model';
import {EpisodeService} from '../../../services/episode/episode.service';
import {LinksService} from '../../../services/onTV/links.service';
@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})

export class EpisodesComponent implements OnInit {
  tvShow: TvShowModel;
  isLoading = true;
  video: MovieVideo;
  similarMovies: Array<PaginatorModel> = [];
  cast: MovieCast;
  seasons = [];
  tvShowSeasons: TvShowModel;
  tvShowSeason: TvShowSeasonModel
  private episodes_number: number;
  private season: number;
  private episode: number;
  private i: number;
  private episodeInfo: any;
  private episodePage: boolean;
  private linksStreams: string;

  constructor(
    private onTvService: OnTVService,
    private episodeService: EpisodeService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private linksService: LinksService
  ) { }


  @ViewChild('closeModal', { static: false }) public  closeModal: ElementRef;
  @ViewChild('openModal', { static: false }) public  openModal: ElementRef;


  ngOnInit() {
    this.route.params.subscribe( (params) => {
      const id = params['id'];
      const season = params['seasons']
      const episode = params['episode']
      this.episode = episode
      this.season = season
      this.episodePage = true;
      this.GetEpisode(id,this.season,this.episode);
      this.getMovieVideo(id);
      this.getRecomendedTVShows(id);
      this.getTVShowsCredits(id);
      this.getTVShowsSeason(id, this.season);
      this.getLinkStreamsTvShow(id,this.season,this.episode)
      this.onTvService.getTVShow(id).subscribe( tvShow => {
        this.tvShow = tvShow;
        this.tvShowSeasons = tvShow.number_of_seasons;
        this.CalculSeasonSize(this.tvShowSeasons);
        if (!this.tvShow) {
          alert('Server Error')
        } else {
          this.isLoading = false;
        }
      });

    });
  }

  navigateTo(value,id){
    this.router.navigate(['/tv-show',id,'seasons',value]);

  }

  CalculSeasonSize(SeasonSize){

    for(this.i = 1 ; this.i <=SeasonSize; this.i++){
      this.seasons.push(this.i)
    }
  }

  getMovieVideo(id) {
    const TvVideosSubs = this.onTvService.getTVShowVideo(id).subscribe(
      res => {
        if (res.results && res.results.length) {
          this.video = res.results[0];
          this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video['key']);
        }
      }, () => {},
      () => { if (TvVideosSubs) { TvVideosSubs.unsubscribe() } }
    );
  }


  getRecomendedTVShows(id) {
    const recomendedTVSubs = this.onTvService.getRecomendTVShows(id).subscribe(
      res => {
        this.similarMovies = res.results.slice(0, 8);
        this.similarMovies.forEach(np => np['isMovie'] = true);
      }, () => {},
      () => { if (recomendedTVSubs) { recomendedTVSubs.unsubscribe() } }
    );
  }

  getTVShowsCredits(id) {
    const tvCreditsSubs = this.onTvService.getTVShowsCredits(id).subscribe(
      res => {
        res.cast = res.cast.filter( item => { return item.profile_path });
        this.cast = res.cast.slice(0, 5);
      }, () => {},
      () => { if (tvCreditsSubs) { tvCreditsSubs.unsubscribe() } }
    );
  }

  getTVShowsSeason(id, season) {
    const tvSeasonsSubs = this.onTvService.getTVShowsSeason(id, season).subscribe(
      res => {
        res.episodes = res.episodes.filter(item => {
          return item
        });
        this.tvShowSeason = res.episodes

        this.CalculEpisodeize(this.tvShowSeason);

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

  }

  getLinkStreamsTvShow(id,season,episode){


    this.linksStreams = 'https://streamvideo.link/getvideo?key=bzDT471S9aBSrQa6&video_id=' + id + '&tmdb=1&tv=1&s=' + season + '&e=' + episode;

   }

   gotolinks(){

     // window.location.href = this.linksStreams;
     window.open(
       this.linksStreams,
       '_blank' // <- This is what makes it open in a new window.
     );
   }

  CalculEpisodeize(EpisodeSize) {

    for (this.i = 1; this.i <= EpisodeSize.length; this.i++) {
      this.episodes_number = this.i;
    }
  }

  GetEpisode(id,season,episode){
    const EpisodeSeasonSubs = this.episodeService.getEpisode(id, season,episode).subscribe(
      res => {

        this.episodeInfo = res;

      }, () => {
      },
      () => {
        if (EpisodeSeasonSubs) {
          EpisodeSeasonSubs.unsubscribe()
        }
      }
    );
  }
}





