import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'design-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


	//designData:any;
	@Input('designData') designData:any;
	
	constructor() { }

	ngOnInit(): void {

  }


  	// FUNCTION TO HIDE/SHOW SIDE MENU BASED UPON WHAT IS CLICKED
	menuClick(param): void {
		this.designData.menu.forEach((value, index) => {
			this.designData.menuShow[index] =  false;
		});

		this.designData.menuShow[param] =  true;
	}




    // WHEN THE USER CLOSES THE WINDOW
    onMenuClose() {
		this.designData.menu.forEach((value, index) => {
			this.designData.menuShow[index] =  false;
		});
    }



}
