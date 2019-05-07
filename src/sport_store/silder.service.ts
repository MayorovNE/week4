import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class SliderService {

  private countColor: boolean;
  public swipeColorEvent: EventEmitter<void>;
  private _color: string;

  constructor() {
    console.log('hi');
    this.countColor = false;
    this.swipeColorEvent = new EventEmitter<void>();
  }
// getting the overall color
  getColor() {
    return this.countColor;
  }
  getTheme() {
    return this._color;
  }
// changing the overall color
  swipeColor(count: boolean, color: string) {
    this.countColor = count;
    this._color = color;
  }

}
