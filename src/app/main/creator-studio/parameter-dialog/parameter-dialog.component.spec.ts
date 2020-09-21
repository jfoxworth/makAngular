/*

  This is the test file for the parameter dialog of the creator studio

*/


// Angular testing items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Inject } from '@angular/core';



// The component
import { editParameterDialog } from './parameter-dialog.component';



// Dialog Items
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'app/main/creator-studio/creator-studio.component';



// Angular Material Items
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';



// New ng5 slider
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';

// Services
import { CreatorStudioService } from 'app/main/services/creator-studio.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { mockItems } from 'app/main/services/mockItems';




describe('editParameterDialog', () => {
  let component: editParameterDialog;
  let fixture: ComponentFixture<editParameterDialog>;


  // Mock Items pulled from external mock file
  let MockGroup = new mockItems();
  const mockDialogRef = MockGroup.DialogRefStub();
  const mockParameterDialog = MockGroup.mockParameterDialog();




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ editParameterDialog ]
    })
    .compileComponents();
  }));



  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ MatIconModule,
           		 MatFormFieldModule,
             	 MatToolbarModule,
             	 MatInputModule,
             	 MatSlideToggleModule,
    			 BrowserAnimationsModule,
    			 Ng5SliderModule,
    			 MatSelectModule ],
      declarations: [ editParameterDialog ],
      providers: [ { provide: CreatorStudioService },
            	     { provide: AngularFireStorage, useValue : {} },
             	     { provide: MatDialogRef, useValue : mockDialogRef },
             	     { provide: MAT_DIALOG_DATA, useValue : mockParameterDialog } ]
    });



    fixture = TestBed.createComponent(editParameterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


	// Basic test to ensure that the component is created
	it('should create the edit parameter dialog', () => {
		expect(component).toBeTruthy();
	});



});

