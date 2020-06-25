import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreComponent } from './store.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSharedModule } from '@fuse/shared.module';
import { DesignService } from 'app/main/services/design-service.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';

import { mockItems } from 'app/main/services/mockItems';



describe('StoreComponent', () => {
	
	let component: StoreComponent;
	let fixture: ComponentFixture<StoreComponent>;

	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const AngularFireStub = MockGroup.AngularFireStub();
	const mockSnackBar = MockGroup.mockSnackBar();



	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ StoreComponent ]
		})
		.compileComponents();
	}));




	beforeEach(() => {
	
		TestBed.configureTestingModule({
			declarations: [ StoreComponent ],
			providers: [ { provide: DesignService },
						 { provide: FirebaseService, useValue : AngularFireStub },
						 { provide: MatSnackBar, useValue : mockSnackBar },
						 { provide: AngularFireStorage, useValue : {} } ]
						 
		});

		fixture = TestBed.createComponent(StoreComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});





	it('store component should be created', () => {
		expect(component).toBeTruthy();
	});




});


