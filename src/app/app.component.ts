import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  route : string;

  constructor( private location       : Location,
               private ActivatedRoute : ActivatedRoute,
               private Router         : Router ){
    this.route = this.location.path();

    Router.events.subscribe(val => {
        this.route = location.path();
    });
  }



  ngOnInit() {
  }

}


