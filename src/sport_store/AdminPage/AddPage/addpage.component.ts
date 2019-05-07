import { Component, ElementRef } from '@angular/core';
import { ShopService } from '..//..//Shop.service';
import { IItem } from 'src/sport_store/interface.data';
import { SliderService } from 'src/sport_store/silder.service';

@Component({
  selector: 'Add_page_sportstore-root',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css'],
})
export class AddPageComponent {
  public inputName: string;
  public inputDescription: string;
  public inputCategory: string;
  public inputPrice: number;
  public item: IItem[];
  constructor(
    private _elementRef: ElementRef,
    private sliderService: SliderService,
    private shopService: ShopService
    ) {
    this.sliderService.swipeColorEvent.subscribe(() => {
      let background1 = '--background-color1';
      let color = this.sliderService.getTheme();
      if (color === '#5C5C5C') {
        let color1 = '#C2C2C2';
        this._elementRef.nativeElement.style.setProperty(background1, color1);
      }
      else {
        let color1 = '#FFFFE0';
        this._elementRef.nativeElement.style.setProperty(background1, color1);
      }
    });
  }
// adding an item to array of warehouse
  addItem(name: string, description: string, category: string, price: number) {
    if (name != null) {
      if (description != null) {
        if (category != null) {
          if (price != null) {
            this.shopService.addData(name, description, category, price);
          }
        }
      }
    }
  }

}
