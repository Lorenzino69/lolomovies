import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from './core/auth.service';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MoviesService} from './services/inTheater/movies.service';
import {GenresListModel} from './models/genres-list';
import {PaginatorModel} from './models/paginator.model';
import {GenresListComponent} from './components/InTheater/genres-list/genres-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  isRedColor = true;
  isBlueColor = false;
  isGreenColor = false;
  genres: GenresListModel;
  title: string;
  genre: GenresListComponent;
  movies: Array<PaginatorModel> = [];

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    private router: Router,
    public auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    public translate: TranslateService,
    private _moviesServices: MoviesService
  ) {

    translate.setDefaultLang('fr-FR');
    translate.use('fr-FR');

    this.auth.afAuth.authState.subscribe(
      a => {
        this.isLoggedIn = a !== null;
      }
    );

  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (this.isBrowser) {
        window.scrollTo(0, 0);
      }
    });
  }

  changeToRed(): void {
    this.isRedColor = true;
    this.isBlueColor = false;
    this.isGreenColor = false;
  }

  changeToBlue(): void {
    this.isRedColor = false;
    this.isBlueColor = true;
    this.isGreenColor = false;
  }

  changeToGreen(): void {
    this.isRedColor = false;
    this.isBlueColor = false;
    this.isGreenColor = true;
  }

  VerifyHomePage(): boolean {
    return this.router.url === ('/');
  }

  changeLanguage(language: string) {

    this.translate.use(language);
  }
}
