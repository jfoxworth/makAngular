import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeBaseArticleComponent } from './article.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockItems } from 'app/main/services/mockItems';


describe('KnowledgeBaseArticleComponent', () => {
	let component: KnowledgeBaseArticleComponent;
	let fixture: ComponentFixture<KnowledgeBaseArticleComponent>;

	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const mockDialogRef = MockGroup.DialogRefStub();
	const mockArticleDialog = MockGroup.mockDialog();



	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ KnowledgeBaseArticleComponent ]
		})
		.compileComponents();
	}));




	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ KnowledgeBaseArticleComponent ],
			providers: [ { provide: MatDialogRef, useValue : mockDialogRef },
             	     	 { provide: MAT_DIALOG_DATA, useValue : mockArticleDialog } ]

		});

		fixture = TestBed.createComponent(KnowledgeBaseArticleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});



	it('should create', () => {
		expect(component).toBeTruthy();
	});



});


