import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { Renderer2 } from '@angular/core';

import { FuseShortcutsComponent } from '../../@fuse/components/shortcuts/shortcuts.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from "@angular/platform-browser";

import { mockItems } from 'app/main/services/mockItems';
import { Observable } from "rxjs/Observable"


import { CookieService } from 'ngx-cookie-service';
import { FuseMatchMediaService } from '@fuse/services/match-media.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { MediaObserver } from '@angular/flex-layout';

import { FirebaseService } from 'app/main/services/firebase.service';


// Providers
import { RouterTestingModule } from "@angular/router/testing";

describe('FuseShortcutsComponent', () => {
	
	let component: FuseShortcutsComponent;
	let fixture: ComponentFixture<FuseShortcutsComponent>;

	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const AngularFireStub 			= MockGroup.AngularFireStub();
	const FuseNavigationStub		= MockGroup.FuseNavigationStub();


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FuseShortcutsComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {
	
		TestBed.configureTestingModule({
			imports: [ RouterTestingModule,
					   MatMenuModule,
					   MatFormFieldModule,
					   MatDividerModule,
					   MatIconModule,
					   MatListModule,
					   MatInputModule,
					   MatTooltipModule,
					   BrowserAnimationsModule ],
			declarations: [ FuseShortcutsComponent ],
			providers: [ { provide: CookieService },
						 { provide: FuseMatchMediaService }, 
						 { provide: FuseNavigationService,		useValue: FuseNavigationStub }, 
						 { provide: MediaObserver }, 
						 { provide: Renderer2 }, 
						 { provide: FirebaseService, 			useValue: AngularFireStub } ]
						 
		});

		fixture = TestBed.createComponent(FuseShortcutsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});






	/*
	*
	*
	*	UNIT TESTS
	*
	*
	*/





	/*
	*
	*	Tests to see if the proper shortcut array is set based 
	*	upon the user status of null or undefined
	*
	*/
	const shortcutItems1 = [
		{
			title: 'Knowledge Base',
			type : 'item',
			icon : 'help_outline',
			url  : '/knowledge-base'
		},
		{
			title: 'Design Studio',
			type : 'item',
			icon : 'color_lens',
			url  : '/designStudio'
		},
		{
			title: 'Design Store',
			type : 'item',
			icon : 'store',
			url  : '/store'
		}
	];
	
	it('shortcut array should be studio, faq, and store for null userdata', fakeAsync(() => {
		localStorage.setItem('userData', null);
		component.ngOnInit();
		tick();
		expect(component.shortcutItems.length).toEqual(3);
		expect(component.shortcutItems[0]).toEqual(shortcutItems1[0]);
		expect(component.shortcutItems[1]).toEqual(shortcutItems1[1]);
		expect(component.shortcutItems[2]).toEqual(shortcutItems1[2]);
	}));

	it('shortcut array should be studio, faq, and store for undefined userdata', fakeAsync(() => {
		localStorage.removeItem('userData');
		component.ngOnInit();
		tick();
		expect(component.shortcutItems.length).toEqual(3);
		expect(component.shortcutItems[0]).toEqual(shortcutItems1[0]);
		expect(component.shortcutItems[1]).toEqual(shortcutItems1[1]);
		expect(component.shortcutItems[2]).toEqual(shortcutItems1[2]);
	}));

	it('shortcut array should be studio, faq, and store for undefined userdata', fakeAsync(() => {
		localStorage.removeItem('userData');
		component.ngOnInit();
		tick();
		expect(component.shortcutItems.length).toEqual(3);
		expect(component.shortcutItems[0]).toEqual(shortcutItems1[0]);
		expect(component.shortcutItems[1]).toEqual(shortcutItems1[1]);
		expect(component.shortcutItems[2]).toEqual(shortcutItems1[2]);
	}));







	/*
	*
	*	Tests to see if the proper shortcut array is set based 
	*	upon the user status with a designer bit set
	*
	*/
	const shortcutItems2 = [
		{
			title: 'My Profile',
			type : 'item',
			icon : 'person',
			url  : '/profile'
		},
		{
			title: 'Messages',
			type : 'item',
			icon : 'email',
			url  : '/messages'
		},
		{
			title: 'Knowledge Base',
			type : 'item',
			icon : 'help_outline',
			url  : '/knowledge-base'
		},
		{
			title: 'My Projects',
			type : 'item',
			icon : 'today',
			url  : '/products'
		},
		{
			title: 'Design Studio',
			type : 'item',
			icon : 'color_lens',
			url  : '/designStudio'
		},
		{
			title: 'Design Store',
			type : 'item',
			icon : 'store',
			url  : '/store'
		},
		{
			title: 'Creator Studio',
			type : 'item',
			icon : 'settings',
			url  : '/creatorStudio'
		}
	];	


	it('shortcut array should set for user with designer set to true', fakeAsync(() => {
		localStorage.setItem('userData', JSON.stringify({ 'uid' : 1, 'id' : 1 }));
		component.ngOnInit();
		tick();
		expect(component.shortcutItems.length).toEqual(7);
		expect(component.shortcutItems[0]).toEqual(shortcutItems2[0]);
		expect(component.shortcutItems[3]).toEqual(shortcutItems2[3]);
		expect(component.shortcutItems[6]).toEqual(shortcutItems2[6]);
	}));








	/*
	*
	*	Tests to see if the proper shortcut array is set based 
	*	upon the user status without a designer bit set
	*
	*/
	const shortcutItems3 = [
		{
			title: 'My Profile',
			type : 'item',
			icon : 'person',
			url  : '/profile'
		},
		{
			title: 'Messages',
			type : 'item',
			icon : 'email',
			url  : '/messages'
		},
		{
			title: 'Knowledge Base',
			type : 'item',
			icon : 'help_outline',
			url  : '/knowledge-base'
		},
		{
			title: 'My Projects',
			type : 'item',
			icon : 'today',
			url  : '/products'
		},
		{
			title: 'Design Studio',
			type : 'item',
			icon : 'color_lens',
			url  : '/designStudio'
		},
		{
			title: 'Design Store',
			type : 'item',
			icon : 'store',
			url  : '/store'
		}
	];	


	it('shortcut array should set for established user with designer set to false', fakeAsync(() => {
		localStorage.setItem('userData', JSON.stringify({ 'uid' : 0, 'id' : 0 }));
		component.ngOnInit();
		tick();
		expect(component.shortcutItems.length).toEqual(6);
		expect(component.shortcutItems[0]).toEqual(shortcutItems3[0]);
		expect(component.shortcutItems[3]).toEqual(shortcutItems3[3]);
		expect(component.shortcutItems[5]).toEqual(shortcutItems3[5]);
	}));






	/*
	*
	*	INTEGRATION TESTS - ENSURE THAT SHORTCUTS ARE CREATED ON THE DOM
	*
	*/


	// Simple creation test
	it('shortcut component should be created', () => {
		expect(component).toBeTruthy();
	});



	/*
	*
	*	Test to ensure that the element for the shortcut exists on the component
	*
	*/
	it('the proper shortcuts should be created on the component for an unset user', fakeAsync(() => {
		localStorage.removeItem('userData');
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.queryAll(By.css('.secondary-text'));
		expect(myDiv.length).toEqual(3);
	}));

	it('the proper shortcuts should be created on the component for a null user', fakeAsync(() => {
		localStorage.setItem('userData', null);
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.queryAll(By.css('.secondary-text'));
		expect(myDiv.length).toEqual(3);
	}));

	it('the proper shortcuts should be created on the component for an undefined user', fakeAsync(() => {
		localStorage.setItem('userData', undefined);
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.queryAll(By.css('.secondary-text'));
		expect(myDiv.length).toEqual(3);
	}));

	it('the proper shortcuts should be created on the component for a logged in user who is not a designer', fakeAsync(() => {
		localStorage.setItem('userData', JSON.stringify({ 'uid' : 0, 'id' : 0 }));
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.queryAll(By.css('.secondary-text'));
		expect(myDiv.length).toEqual(6);
	
	}));

	it('the proper shortcuts should be created on the component for a logged in user who is a designer', fakeAsync(() => {
		localStorage.setItem('userData', JSON.stringify({ 'uid' : 1, 'id' : 1 }));
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const myDiv = fixture.debugElement.queryAll(By.css('.secondary-text'));
		expect(myDiv.length).toEqual(7);
	}));



});


