import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mak-related-row',
  templateUrl: './related-row.component.html',
  styleUrls: ['./related-row.component.scss', '../../comm-styles.scss']
})
export class RelatedRowComponent implements OnInit {


  @Input('title1') title1:string;
  @Input('link1text') link1text:string;
  @Input('link1') link1:string;
  @Input('image1') image1:string;
  @Input('title2') title2:string;
  @Input('link2text') link2text:string;
  @Input('link2') link2:string;
  @Input('image2') image2:string;

  constructor() { }

  ngOnInit(): void {
  }

}
