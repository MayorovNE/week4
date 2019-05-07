import { Component, ViewChild, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ShopService } from '../Shop.service';
import { IItem } from '../interface.data';
import { ShoppingCartService } from '../shopping_cart.service';
import { SliderService } from '../silder.service';

@Component({
  selector: 'User_page_sportstore-root',
  templateUrl: './user_page.component.html',
  styleUrls: ['./user_page.component.css'],
})
export class UserPageComponent {
  @ViewChild("scrlbtn") scrlBtnRef: ElementRef;

  private categoryArray: string[] = [];
  private items: IItem[];
  public countToToolbar;
  public countColor: boolean;
  constructor(
    private renderer: Renderer2,
    private _elementRef: ElementRef,
    private shopService: ShopService,
    private shoppingcartService: ShoppingCartService,
    private sliderService: SliderService,
    ) {
        this.countToToolbar = 1;
        this.items = this.shopService.getData();
        this.shopService.serverChangeEmitter.subscribe(() => {
          this.items = this.shopService.getData();
        });
        this.sliderService.swipeColorEvent.subscribe(() => {
          let background = '--background-color';
          let background1 = '--background-color1';
          let color = this.sliderService.getTheme();
          if (color === '#5C5C5C') {
            let color = '#2B2B2B';
            let color1 = '#C2C2C2';
            this._elementRef.nativeElement.style.setProperty(background, color);
            this._elementRef.nativeElement.style.setProperty(background1, color1);
          }
          else {
            let color = '#FFDEAD';
            let color1 = '#FFFFE0';
            this._elementRef.nativeElement.style.setProperty(background, color);
            this._elementRef.nativeElement.style.setProperty(background1, color1);
          }
        });
      }
// add to shopping cart
  addToShoppingCart(name: string, description: string, category: string, price: number) {
    this.shoppingcartService.addData(name, description, category, price);
  }
// add to wishlist
  addToWishlist() {
  }
  @HostListener('window:scroll') onScroll() {
    let scrollTop = document.documentElement.scrollTop || document.body && document.body.scrollTop || 0;
    scrollTop -= document.documentElement.clientTop;

    if (scrollTop > 100) {
      document.getElementById('scrlbtn').style.setProperty('display', 'block');
      //this.renderer.removeStyle(this.scrlBtnRef.nativeElement, 'display');
      //this.renderer.setStyle(this.scrlBtnRef.nativeElement, 'display', 'block');
    }
    else {
      document.getElementById('scrlbtn').style.setProperty('display', 'none');
      //this.renderer.removeStyle(this.scrlBtnRef.nativeElement, 'display');
      //this.renderer.setStyle(this.scrlBtnRef.nativeElement, 'display', 'none');
    }
  }
  scrollBack() {
    window.scrollTo(0,0);
  }

}
