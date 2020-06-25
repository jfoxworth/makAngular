import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/main/services/auth.service';

import { mockItems } from 'app/main/services/mockItems';


describe('RegisterComponent', () => {
	let component: RegisterComponent;
	let fixture: ComponentFixture<RegisterComponent>;


	let MockGroup = new mockItems();
	const ChatServiceStub = MockGroup.mockChatService();







	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RegisterComponent ]
		})
		.compileComponents();
	}));




	beforeEach(() => {


		TestBed.configureTestingModule({
			declarations: [ { provide : FuseConfigService },
							{ provide : FormBuilder },
							{ provide : AuthService } ]
		})


		fixture = TestBed.createComponent(RegisterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});




	it('should create', () => {
		expect(component).toBeTruthy();
	});



});
