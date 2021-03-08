import { Component, OnInit, Input } from '@angular/core';
import { makProject } from '../../models/makProject';

// Services
import { ProjectsService } from '../../services/projects.service';

// Angular Material Items
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'mak-dashboard-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Input() makProjects:makProject[];
  @Input() designImages:any[];
  theseImages : any[];

  constructor(
    private ProjectsService			  : ProjectsService,
    private SnackBar 				      : MatSnackBar,
  ) { 

    this.theseImages=[];
  
  }

  ngOnInit(): void {

    this.designImages.forEach(im=>{

      this.makProjects.forEach(proj=>{

        if ( im.itemId == proj.designId )
        {
          this.theseImages[im.itemId] = im.imageURL;
        }

      })

    });

  }


  displayMessage( message )
	{
    this.SnackBar.open(message.text,'', {duration: 4000});
	}


  deleteProject( project:makProject )
	{
    this.ProjectsService.deleteProject( project.id );
    this.displayMessage({text:'Project Deleted'});
	}

}
