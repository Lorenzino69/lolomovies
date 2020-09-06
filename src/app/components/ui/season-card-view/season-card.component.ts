import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-season-card',
  templateUrl: './season-card.component.html',
  styleUrls: ['./season-card.component.css']
})
export class SeasonCardComponent implements OnInit {

  @Input() public model: any;

  constructor() { }

  ngOnInit() {
  }

}
