import { TestBed } from '@angular/core/testing';

import { KnowledgeBaseService } from './knowledge-base.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClient } from '@angular/common/http';



describe('KnowledgeBaseService', () => {

  let service: KnowledgeBaseService;

	beforeEach(() => {

		service = new KnowledgeBaseService( );
		TestBed.configureTestingModule({
			imports: [ 
			    RouterTestingModule,
			  ]
		});
		service = TestBed.inject( KnowledgeBaseService );

	});



	it('should be created', () => {
		expect(service).toBeTruthy();
	});



});

