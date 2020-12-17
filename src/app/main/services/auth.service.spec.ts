import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/storage';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import { mockItems } from '../../main/services/mockItems';

describe('AuthService', () => {
	let service: AuthService;

	// Mock items unique to this page
	let	AngularFireAuthStub : AngularFireAuth;
	let AngularStorageStub : AngularFireStorage;
	let AngularFireStoreStub : AngularFirestore;
	let router : Router;
	let NgZone : NgZone;

	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const AngularFireStub = MockGroup.AngularFireStub();
	const RouteStub = MockGroup.RouteStub();
	const mockAngularFireAuth = MockGroup.AngularAuthStub();



	beforeEach(() => {

		TestBed.configureTestingModule({
			providers: [ { provide: AngularFirestore, 	useValue : AngularFireStoreStub },
						       { provide: AngularFireAuth, 	useValue : mockAngularFireAuth },
						       { provide: Router, 			useValue : RouteStub },
						       { provide: NgZone, 			useValue : NgZone } ]
		});

		service = TestBed.inject(AuthService);
	});






	it('should be created - auth service', () => {
		expect(service).toBeTruthy();
	});



});

