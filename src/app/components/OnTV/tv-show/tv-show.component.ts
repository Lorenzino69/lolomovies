import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {TvShowModel} from '../../../models/onTV/tvShow.model';
import {OnTVService} from '../../../services/onTV/onTV.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MovieVideo} from '../../../models/movie-video';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PaginatorModel} from '../../../models/paginator.model';
import {MovieCast} from '../../../models/movie-cast';
import {TvShowSeasonModel} from '../../../models/onTV/TVShowSeason.model';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {

  tvShow: TvShowModel;
  tvShowSeason: TvShowSeasonModel
  isLoading = true;
  video: MovieVideo;
  similarMovies: Array<PaginatorModel> = [];
  cast: MovieCast;
  seasons = [];
  tvShowSeasons: TvShowModel;

  @ViewChild('closeModal', { static: false }) public  closeModal: ElementRef;
  @ViewChild('openModal', { static: false }) public  openModal: ElementRef;
  private i: number;


  constructor(
    private onTvService: OnTVService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe( (params) => {
      const id = params['id'];
      this.getMovieVideo(id);
      this.getRecomendedTVShows(id);
      this.getTVShowsCredits(id);
      this.getTVShowsSeason(id,1)
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

  CalculSeasonSize(SeasonSize){

    for(this.i = 1 ; this.i <=SeasonSize; this.i++){
      this.seasons.push(this.i)
    }
}

  navigateTo(value,id){
    console.log(value);
    this.router.navigate(['/tv-show/seasons',id,value],{ relativeTo: this.route });

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

  openDialog(): void {
    this.dialog.open(AppTVDialogComponent, {
      height: '500px',
      width: '800px',
      data: { video: this.video}
    });
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

  getTVShowsSeason(id,season) {
    const tvSeasonsSubs = this.onTvService.getTVShowsSeason(id,season).subscribe(
      res => {
         res.episodes = res.episodes.filter( item => { return item });
        this.tvShowSeason = res.episodes

      }, () => {},
      () => { if (tvSeasonsSubs) { tvSeasonsSubs.unsubscribe() } }
    );
  }

  upOnRouting(){
    window.scroll(0,0);
  }

}

@Component({
  selector: 'app-tv-dialog',
  templateUrl: 'app-tv-dialog.html'
})
export class AppTVDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AppTVDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close('Kiss!');
  }

}


