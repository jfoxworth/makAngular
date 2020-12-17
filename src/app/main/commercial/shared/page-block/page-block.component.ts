import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-page-block',
  templateUrl: './page-block.component.html',
  styleUrls: ['./page-block.component.scss', '../../comm-styles.scss']
})
export class PageBlockComponent implements OnInit {

  @Input('bgimage') bgimage:string;
  @Input('title') title:string;
  @Input('text') text:string;
  @Input('link') link:string;
  @Input('linktext') linktext:string;

  constructor() { }

  ngOnInit(): void {
  }

}
