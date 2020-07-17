
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Inject } from '@angular/core';

import { SubmenuDialog } from './submenu-dialog.component';


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'app/main/creator-studio/creator-studio.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Services
import { mockItems } from 'app/main/services/mockItems';

describe('SubmenuDialog', () => {
  let component: SubmenuDialog;
  let fixture: ComponentFixture<SubmenuDialog>;


  // Mock Items pulled from external mock file
  let MockGroup = new mockItems();
  const mockDialogRef = MockGroup.DialogRefStub();
  const mockParameterDialog = MockGroup.mockParameterDialog();

  console.log(mockParameterDialog);





  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuDialog ]
    })
    .compileComponents();
  }));



  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ MatIconModule,
      			 MatFormFieldModule,
      			 MatGridListModule,
      			 MatToolbarModule,
      			 MatInputModule,
      			 BrowserAnimationsModule ],
      declarations: [ SubmenuDialog ],
      providers: [ { provide: MatDialogRef, useValue : mockDialogRef },
                   { provide: MAT_DIALOG_DATA, useValue : mockParameterDialog } ]
    });


    fixture = TestBed.createComponent(SubmenuDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // Basic test to ensure that the component is created
  it('should create the submenu parameter dialog', () => {
    expect(component).toBeTruthy();
  });



});

