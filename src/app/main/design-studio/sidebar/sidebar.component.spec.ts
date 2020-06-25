import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';
import { MatButtonModule } from '@angular/material/button';
import { EventEmitter } from '@angular/core';
import { DesignService } from 'app/main/services/design-service.service';

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
			declarations: [ SidebarComponent ],
			providers: [ { provide: DesignService } ]
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
