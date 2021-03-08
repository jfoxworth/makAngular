import { Component, OnInit } from '@angular/core';

// Models
import { makDesign } from '../models/makDesign';
import { makProject } from '../models/makProject';
import { makAnnouncement } from '../models/makAnnouncement';

// RXJS Items
import { map, mergeMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// NGRX Items
import { Store } from "@ngrx/store";
import { DesignState } from '../store/reducers';

// Services
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';
import { makProjectEntityService } from '../services/entity/makProject-entity.service';
import { makAnnouncementEntityService } from '../services/entity/makAnnouncement-entity.service';


@Component({
  selector: 'mak-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	makProjects$ 						: Observable<makProject[]>;
	makDesigns$ 						: Observable<makDesign[]>;
	makAnnouncements$   		: Observable<makAnnouncement[]>;
	public images 					: never[];
  designImages            : never[];

  constructor( public designStore                : Store<DesignState>,
               private ProjectEntityService 	   : makProjectEntityService,
               private DesignEntityService 	     : makDesignEntityService,
               private AnnouncementEntityService : makAnnouncementEntityService ) { }

  ngOnInit(): void {

 		// The observable for the projects for this user
     this.makProjects$ = this.ProjectEntityService.entities$
     .pipe(
     );
      

 		// The observable for the announcements
     this.makAnnouncements$ = this.AnnouncementEntityService.entities$
     .pipe(
     );


 		// The observable for the designs
     this.makDesigns$ = this.DesignEntityService.entities$
     .pipe(
     );


     // Listen to the images observable
		this.designStore.subscribe(state => {

      this.images = state['images']['announcements'];

      // Listen to the images observable
      this.designStore.subscribe(state => {

        if (state.designs.designs.type)
        {
          let temp = JSON.parse(JSON.stringify(state.designs.designs));
          delete temp.type
          this.designImages = Object.values(temp);
        }else
        {
          this.designImages = Object.values(state.designs.designs);
        }

      });


    });
     
     

  }

}
