import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';
import { EventEmitter } from '@angular/core';
import { DesignService } from 'app/main/services/design-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FuseConfigService } from '@fuse/services/config.service';

import { MatIconModule} from '@angular/material/icon';
import { SidebarComponent } from './sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { mockItems } from 'app/main/services/mockItems';



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
			providers: [ { provide: DesignService} ]
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
