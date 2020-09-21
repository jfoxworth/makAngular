
/*

	This is the test file for the sidebar for the design studio

*/


// Angular Testing Items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FuseConfigService } from '@fuse/services/config.service';



// The Component
import { SidebarComponent } from './sidebar.component';



// Services and Mock Items
import { CreatorStudioService } from 'app/main/services/creator-studio.service';
import { mockItems } from 'app/main/services/mockItems';



// Google Material Items
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




// NG5 Slider Items
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';


describe('SidebarComponent', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;

	let MockGroup = new mockItems();


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SidebarComponent ]
		})
		.compileComponents();
	}));




	beforeEach(() => {

		TestBed.configureTestingModule({
			imports:[ MatIconModule,
					  MatButtonModule ],
			declarations: [ SidebarComponent ],
			providers: [ { provide : CreatorStudioService } ]
		});


		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;

		component.designData = MockGroup.designDataStub();
		component.versionList = MockGroup.versionListStub();
		component.versionData = MockGroup.versionDataStub();
		component.userData = MockGroup.userDataStub();

		fixture.detectChanges();
	});




	it('should create design studio sidebar component', () => {

		console.log('the design data is ');
		console.log(component.designData);

		expect(component).toBeTruthy();
	});



});
