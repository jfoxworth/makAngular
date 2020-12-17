import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-parameter-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.scss']
})
export class BlocComponent implements OnInit {

  @Input() parameter:any;
  constructor() { }

  ngOnInit(): void {
  }

}
