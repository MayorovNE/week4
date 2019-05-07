import { Component, ViewChild, ElementRef } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { SliderService } from '../silder.service';

@Component({
  selector: 'adminpage_sportstore-root',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminPageComponent {
  public addElement: boolean;
  public deleteElement: boolean;
  public opened: boolean;
  public countToToolbar: number;
  public condition: boolean;
  constructor(
    private _elementRef: ElementRef,
    private sidenavService: SidenavService,
    private sliderService: SliderService
    ) {
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
    this.countToToolbar = 2;
    this.deleteElement = false;
    this.addElement = false;
    this.condition = false;
    this.sidenavService.dropAdminSidenav.subscribe((result: boolean) => {
      if (result === true) {
      this.opened = true;
      }
      else {
        this.opened = false;
      }
    });
  }
// go to the add items page
  goToAddElementPage() {
    this.deleteElement = false;
    this.addElement = true;
  }
// go to the item removal page
  goToDeleteElementPage() {
    this.addElement = false;
    this.deleteElement = true;
  }
  closeAdminMenu(increased: void) {
    this.sidenavService.dropAdminSidenav.emit(increased);
  }
}
