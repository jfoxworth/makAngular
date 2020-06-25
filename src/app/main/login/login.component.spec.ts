import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/main/services/auth.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { mockItems } from 'app/main/services/mockItems';



describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let _fuseConfigService : FuseConfigService;
	let _formBuilder : FormBuilder;
	let AuthServiceStub : AuthService;


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ]
		})
		.compileComponents();
	}));


	beforeEach(() => {
	
	    TestBed.configureTestingModule({
	      declarations: [ LoginComponent ],
	      providers: [ { provide: FuseConfigService, useValue : {} },
	      			   { provide: FormBuilder },
	            	   { provide: AuthService, useValue : {} } ]

	    });

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

