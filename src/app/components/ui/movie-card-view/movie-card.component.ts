import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class ActorCardComponent implements OnInit {

  @Input() public model: any;

  constructor () {}

  ngOnInit(){

    document.querySelector('app-movie-card').scrollTop = 1500;
  }

}
