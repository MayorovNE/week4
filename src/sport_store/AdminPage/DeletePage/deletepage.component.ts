import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ShopService } from '../../Shop.service';
import {IItem} from '../../interface.data';
import { SliderService } from 'src/sport_store/silder.service';

@Component({
  selector: 'Delete_page_sportstore-root',
  templateUrl: './deletepage.component.html',
  styleUrls: ['./deletepage.component.css'],
})
export class DeletePageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'category', 'price', 'action'];
  dataSource: MatTableDataSource<IItem>;
  private _items: IItem[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _elementRef: ElementRef,
    private sliderService: SliderService,
    private shopService: ShopService) {
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
    this.shopService.serverChangeEmitter.subscribe(() => {
      this._items = this.shopService.getData();
      this.dataSource = new MatTableDataSource(this._items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this._items = this.shopService.getData();
    this.dataSource = new MatTableDataSource(this._items);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.shopService.getCountTranslate() === 'rus') {
      this.paginator._intl.itemsPerPageLabel = 'Товаров на странице:';
    }
    if (this.shopService.getCountTranslate() === 'en') {
      this.paginator._intl.itemsPerPageLabel = 'Items per page:';
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeItem(name: string) {
    this.shopService.removeData(name);
    this.dataSource = new MatTableDataSource(this._items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
