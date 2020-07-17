import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailConfirmComponent } from './mail-confirm.component';

import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from "@angular/router/testing";







describe('MailConfirmComponent', () => {


	let component: MailConfirmComponent;
	let fixture: ComponentFixture<MailConfirmComponent>;



	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MailConfirmComponent ]
		})
		.compileComponents();
	}));





	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [ MatIconModule,
					   RouterTestingModule ],
			declarations: [ MailConfirmComponent ],
			providers: [  ]
		});


		fixture = TestBed.createComponent(MailConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});






	it('should create', () => {
		expect(component).toBeTruthy();
	});





});
