import { Component, OnInit, Input } from '@angular/core';
import { makAnnouncement } from '../../models/makAnnouncement';

@Component({
  selector: 'mak-dashboard-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  @Input() makAnnouncements:makAnnouncement[];
  @Input() annImages:any[];
  imageDownload : string;
  images : any[];

  constructor() { 

  this.images = [];

  }

  ngOnInit(): void {
    this.setDownloads();
  }

  setDownloads (){

    this.annImages.forEach(annIm=>{

      this.makAnnouncements.forEach(ann=>{
        if (annIm.itemId==ann.id)
        {
          this.images[annIm.itemId]=annIm.imageURL;
        }
      })
    });

  }

}
