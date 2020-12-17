import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-parameter-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  @Input() parameter:any;
  constructor() { }

  ngOnInit(): void {
  }

}
