import { TestBed } from '@angular/core/testing';
import { DesignStudioService } from 'app/main/services/design-studio.service';
import { MarketplaceService } from './marketplace.service';
import { FirebaseService } from './firebase.service';
import { AuthService } from 'app/main/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



describe('MarketplaceService', () => {
	
	let service: MarketplaceService;

	// Mock items unique to this page
	let	FirebaseServiceStub : FirebaseService;
	let AngularStorageStub : AngularFireStorage;
	let AngularFireStoreStub : AngularFirestore;
	let DesignStudioStub : DesignStudioService;



	beforeEach(() => {

		TestBed.configureTestingModule({
			providers: [ { provide: FirebaseService, 		useValue : FirebaseServiceStub },
						 { provide: AngularFireStorage, 	useValue : AngularStorageStub }, 
						 { provide: AngularFirestore, 		useValue : AngularFireStoreStub },
						 { provide: DesignStudioService, 	useValue : DesignStudioStub } ]
		});

			service = TestBed.inject(MarketplaceService);
	});

	it('marketplace service should be created', () => {
		expect(service).toBeTruthy();
	});
});
