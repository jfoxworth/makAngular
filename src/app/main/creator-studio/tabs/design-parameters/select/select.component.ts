import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-parameter-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() parameter:any;
  constructor() { }

  ngOnInit(): void {
  }

}
