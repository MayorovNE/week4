import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSelectChange} from '@angular/material';
import { IItem } from 'src/sport_store/interface.data';
import { ShoppingCartService } from 'src/sport_store/shopping_cart.service';
import { ShopService } from 'src/sport_store/Shop.service';
import { SliderService } from 'src/sport_store/silder.service';

@Component({
  selector: 'Shopping_cart_sportstore-root',
  templateUrl: './shopping_cart.component.html',
  styleUrls: ['./shopping_cart.component.css'],
})
export class ShoppingCartComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['items', 'action'];
  dataSource: MatTableDataSource<IItem>;
  private _items: IItem[];
  public cartCost: number;
  public countToToolbar: number;
  public categoryArray: string[] = [];

  constructor(
    private _elementRef: ElementRef,
    private shoppingcartService: ShoppingCartService,
    private shopService: ShopService,
    private sliderService: SliderService, ) {
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
    this.countToToolbar = 3;
    this.categoryArray = this.shoppingcartService.getCategory();
    this._items = this.shoppingcartService.getData();
    this.dataSource = new MatTableDataSource(this._items);
    this.cartCost = 0;
    this.shopService.paginatorLanguageEmitter.subscribe(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.shopService.getCountTranslate() === 'rus') {
        this.paginator._intl.itemsPerPageLabel = 'Товаров на странице:';
      }
      if (this.shopService.getCountTranslate() === 'en') {
        this.paginator._intl.itemsPerPageLabel = 'Items per page:';
      }
    });
    for (let i = 0; i < this._items.length; i++) {
      this.cartCost = Number(this.cartCost.toFixed(2)) + Number((this._items[i].price * this._items[i].number).toFixed(2));
    }
  }
  ngOnInit() {
    this.categoryArray = this.shoppingcartService.getCategory();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.shopService.getCountTranslate() === 'rus') {
      this.paginator._intl.itemsPerPageLabel = 'Товаров на странице:';
    }
    if (this.shopService.getCountTranslate() === 'en') {
      this.paginator._intl.itemsPerPageLabel = 'Items per page:';
    }
  }
// creating a filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
// creating a selector
  selectStage(category: string) {
    console.log(category);
    this.applyFilter(category);
  }
// delete from shopping cart
  removeItem(name: string) {
    this.shoppingcartService.removeData(name);
    this.dataSource = new MatTableDataSource(this._items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  changeCost() {
    this.cartCost = 0;
    for (let i = 0; i < this._items.length; i++) {
      if (this._items[i].number < 0) {
        this._items[i].number = 0;
      }
      this.cartCost = Number(this.cartCost.toFixed(2)) + Number((this._items[i].price * this._items[i].number).toFixed(2));
    }
    this.cartCost = Number(this.cartCost.toFixed(2));
  }
}
