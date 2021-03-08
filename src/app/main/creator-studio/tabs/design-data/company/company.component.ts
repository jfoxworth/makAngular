import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { makDesign } from 'src/app/main/models/makDesign';
import { DesignsService } from '../../../../services/designs.service';
import { CreatorStudioService } from '../../../../services/creator-studio.service';

@Component({
  selector: 'mak-design-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
	@Output() updateDesign = new EventEmitter();

  companies:any[];

  constructor( private DesignsService : DesignsService,
               private CreatorStudioService : CreatorStudioService )
  {
		this.companies		= this.CreatorStudioService.getCompanies();
  }


  ngOnInit(): void {

  }


	// Update
	saveCompChange( event )
	{
		this.updateDesign.emit( {...this.currentDesign, 'company':event.value} );
  }



	/**
	 * When someone sets a company
	 */
	setCompany() {
		for (let i = 0; i < this.companies.length; i++) {
			if ( this.companies[i]['id'] == this.currentDesign.companyId )
			{
				this.currentDesign['company']['name'] = this.companies[i]['name'];
				this.currentDesign['company']['id'] = this.companies[i]['id'];
				this.currentDesign['company']['location'] = this.companies[i]['location'];
				this.currentDesign['company']['logo'] = this.companies[i]['logo'];
			}
  		}
  }


}
