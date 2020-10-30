
// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { makDesign } from 'app/main/models/makDesign';


// Drag Drop Items
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


// Child Dialogs
import { editParameterDialog } from '../../parameter-dialog/parameter-dialog.component';
import { SubmenuDialog } from '../../submenu-dialog/submenu-dialog.component';


// Material / Dialog Items
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


// Services
import { CreatorStudioService } from 'app/main/services/creator-studio.service';



export interface DialogData {
  currentDesign: any;
  i:number;
  j:number;
  parameterTypes:string[]
  iconOptions:string[],
  parameterUrls: any;
}



@Component({
  selector: 'mak-design-parameters',
  templateUrl: './design-parameters.component.html',
  styleUrls: ['./design-parameters.component.scss']
})
export class DesignParametersComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
  
	@Output() saveDesignChanges = new EventEmitter();
	@Output() addSubmenu = new EventEmitter();
	@Output() addMenuItem = new EventEmitter();

	parameterUrls : Array<any> = [];

  constructor( public dialog 					: MatDialog,
               private CreatorStudioService 	: CreatorStudioService,
    ) { }

  ngOnInit(  ): void {
  }



	// -----------------------------------------------------------------------------------------------------
	//
	// @ DRAG AND DROP FUNCTIONS
	//
	// -----------------------------------------------------------------------------------------------------

    /**
     * When a parameter is dropped into a list
     */
    drop(event: CdkDragDrop<string[]>) {
      console.log(event.container);
      console.log(event.previousContainer);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                  event.container.data,
                  event.previousIndex,
                  event.currentIndex);
      }
  	}






	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS RELATING TO OPENING THE DIALOGS
	//
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Dialog to edit a parameter
	 */
	openDialog(i,j) {
		console.log('In the open dialog with '+i+' - '+j);
		const dialogRef = this.dialog.open( editParameterDialog, {
			panelClass: 'parameter-dialog',
			data: { currentDesign: this.currentDesign, 
					i:i, 
					j:j, 
					parameterTypes: this.CreatorStudioService.getParameterTypes(),
					parameterUrls: this.parameterUrls }
		});

		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		  console.log(result);
		});

	}





	/**
	 * Dialog to edit a submenu
	 */
	openSubmenuDialog(i) {
		console.log('In the open submenu dialog with '+i);
		const dialogRef = this.dialog.open( SubmenuDialog, {
			panelClass: 'submenu-dialog',
			data: { currentDesign: this.currentDesign, 
					i:i,
					iconOptions : this.CreatorStudioService.getIconOptions()
				  }
		});

		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		  console.log(result);
		});

	}

}
