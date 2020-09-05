import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {TvShowModel} from '../../../models/onTV/tvShow.model';
import {OnTVService} from '../../../services/onTV/onTV.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MovieVideo} from '../../../models/movie-video';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PaginatorModel} from '../../../models/paginator.model';
import {MovieCast} from '../../../models/movie-cast';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {

  tvShow: TvShowModel;
  isLoading = true;
  video: MovieVideo;
  similarMovies: Array<PaginatorModel> = [];
  cast: MovieCast;

  @ViewChild('closeModal', { static: false }) public  closeModal: ElementRef;
  @ViewChild('openModal', { static: false }) public  openModal: ElementRef;


  constructor(
    private onTvService: OnTVService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.router.params.subscribe( (params) => {
      const id = params['id'];
      this.getMovieVideo(id);
      this.getRecomendedTVShows(id);
      this.getTVShowsCredits(id);
      this.onTvService.getTVShow(id).subscribe( tvShow => {
        this.tvShow = tvShow;

        if (!this.tvShow) {
          alert('Server Error')
        } else {
          this.isLoading = false;
        }
      });

    });
  }

  getMovieVideo(id) {
    console.log(id)
    const TvVideosSubs = this.onTvService.getTVShowVideo(id).subscribe(
      res => {
        console.log(res.results)
        if (res.results && res.results.length) {
          this.video = res.results[0];
          this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video['key']);
        }
      }, () => {},
      () => { if (TvVideosSubs) { TvVideosSubs.unsubscribe() } }
    );
  }

  openDialog(): void {
    console.log(this.video)
    this.dialog.open(AppTVDialogComponent, {
      height: '500px',
      width: '800px',
      data: { video: this.video}
    });
  }

  getRecomendedTVShows(id) {
    const recomendedTVSubs = this.onTvService.getRecomendTVShows(id).subscribe(
      res => {
        console.log(res)
        this.similarMovies = res.results.slice(0, 8);
        this.similarMovies.forEach(np => np['isMovie'] = true);
      }, () => {},
      () => { if (recomendedTVSubs) { recomendedTVSubs.unsubscribe() } }
    );
  }

  getTVShowsCredits(id) {
    console.log(id)
    const tvCreditsSubs = this.onTvService.getTVShowsCredits(id).subscribe(
      res => {
        res.cast = res.cast.filter( item => { return item.profile_path });
        this.cast = res.cast.slice(0, 5);
      }, () => {},
      () => { if (tvCreditsSubs) { tvCreditsSubs.unsubscribe() } }
    );
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


