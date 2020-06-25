import { TestBed } from '@angular/core/testing';
import { UserService } from './user-service.service';
import { Injectable, NgZone } from '@angular/core';
import { User } from "app/main/services/users";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/storage';
import { mockItems } from 'app/main/services/mockItems';



describe('UserService', () => {
	
	let service: UserService;

	// Mock items unique to this page
	let AngularFireStoreStub : AngularFirestore;
	let	AngularFireAuthStub : AngularFireAuth;
	let NgZone : NgZone;
	let AngularStorageStub : AngularFireStorage;


	// Mock Items pulled from external mock file
	let MockGroup = new mockItems();
	const RouteStub = MockGroup.RouteStub();
	const mockAngularFireAuth = MockGroup.AngularAuthStub();


	beforeEach(() => {
	

		TestBed.configureTestingModule({
			providers: [ { provide: AngularFirestore, 	useValue : AngularFireStoreStub },
						 { provide: AngularFireAuth, 	useValue : mockAngularFireAuth }, 
						 { provide: Router, 			useValue : RouteStub },
						 { provide: NgZone, 			useValue : NgZone },
						 { provide: AngularFireStorage, useValue : AngularStorageStub } ]
		});



		TestBed.configureTestingModule({});
		service = TestBed.inject(UserService);
	
	});



	it('user service should be created', () => {
		expect(service).toBeTruthy();
	});



});


 