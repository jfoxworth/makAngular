import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KnowledgeBaseComponent } from './knowledge-base.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KnowledgeBaseService } from 'app/main/services/knowledge-base.service';
import { KnowledgeBaseArticleComponent } from 'app/main/knowledge-base/dialogs/article/article.component';

import { mockItems } from 'app/main/services/mockItems';



describe('KnowledgeBaseComponent', () => {

	let component: KnowledgeBaseComponent;
	let fixture: ComponentFixture<KnowledgeBaseComponent>;

	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const mockDialog = MockGroup.mockDialog();
	const mockKnowledgeBase = MockGroup.mockKnowledgeBase();



	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ KnowledgeBaseComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {

		TestBed.configureTestingModule({
			declarations: [ KnowledgeBaseComponent ],
			providers: [ { provide: KnowledgeBaseService, useValue : mockKnowledgeBase },
						 { provide: MatDialog, useValue : mockDialog } ]
		});

		fixture = TestBed.createComponent(KnowledgeBaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});



	it('knowledge base component should be created', () => {
		expect(component).toBeTruthy();
	});



});


