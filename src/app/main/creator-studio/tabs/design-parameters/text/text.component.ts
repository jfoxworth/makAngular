import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-parameter-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() parameter:any;
  constructor() { }

  ngOnInit(): void {
  }

}
