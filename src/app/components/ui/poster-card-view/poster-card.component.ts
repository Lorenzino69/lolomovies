import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-poster-card',
  templateUrl: './poster-card.component.html',
  styleUrls: ['./poster-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() public model: any;
  private id: any;
  private season: any;
  private episode: any;

  constructor (private route: ActivatedRoute, private router: Router) {}

  ngOnInit(){

    this.route.params.subscribe((params) => {
      const id = params['id'];
      const seasons = params['seasons'];
      const episode = params['episode'];

      this.id = id;
      this.season = seasons;
      this.episode = episode;


    });
  }

  upPage(){
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      location.reload();
    });
  }

}
