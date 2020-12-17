import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

// Services
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'mak-title-banner',
  templateUrl: './title-banner.component.html',
  styleUrls: ['./title-banner.component.scss']
})
export class TitleBannerComponent implements OnInit {

  bannerText    : string;
  bannerOnOff   : boolean;

  @Input('route') route:string;


  constructor( private NavbarService : NavbarService ) { }

  ngOnInit(): void {

    this.bannerText  = this.NavbarService.setBannerText( this.route );
    this.bannerOnOff = this.NavbarService.setBannerOnOff( this.route );

  }

  ngOnChanges(changes:SimpleChanges) {
    this.route=changes.route.currentValue;
    this.bannerText  = this.NavbarService.setBannerText( this.route );
    this.bannerOnOff = this.NavbarService.setBannerOnOff( this.route );
  }


}
