import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-poster-card',
  templateUrl: './poster-card.component.html',
  styleUrls: ['./poster-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() public model: any;

  constructor () {}

  ngOnInit(){
  }

}
