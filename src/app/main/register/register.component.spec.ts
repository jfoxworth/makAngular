import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseConfig } from 'app/fuse-config';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/main/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";
import { PlatformModule } from '@angular/cdk/platform';
import { Inject, Injectable, InjectionToken } from '@angular/core';


import { mockItems } from 'app/main/services/mockItems';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';



export const FUSE_CONFIG = new InjectionToken('fuseCustomConfig');



xdescribe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;


	let MockGroup = new mockItems();







	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RegisterComponent ]
		})
		.compileComponents();
	}));




	beforeEach(() => {


		
		TestBed.configureTestingModule({
			imports: [ MatIconModule,
					   MatFormFieldModule,
					   MatCheckboxModule,
					   ReactiveFormsModule,
					   RouterTestingModule,
					   BrowserAnimationsModule,
					   PlatformModule ],
			declarations: [ RegisterComponent ],
			providers: [ { provide: FuseConfigService  },
						 { provide: FormBuilder },
						 { provide: AuthService, 		useValue : {} },
						 { provide: FUSE_CONFIG, useFactory: '' } ]

		});


		fixture = TestBed.createComponent(RegisterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});




	it('should create', () => {
		const FUSE_CONFIG = new InjectionToken('fuseCustomConfig');
		expect(component).toBeTruthy();
	});



});
