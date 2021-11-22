import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input('rating') rating: number = 1;
  @Output() ratingUpdated = new EventEmitter();

  ratingArr: number[] = [];

  constructor() {
  }

  ngOnInit() {
    for (let index = 0; index < 5; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.ratingUpdated.emit(rating);
  }

  showIcon(index: number) {
    return this.rating >= index + 1 ? 'star' : 'star_border'
  }

}

