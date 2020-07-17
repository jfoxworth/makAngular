import { Component, OnInit } from '@angular/core';
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

import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

	storeItems : any[];
	storeList : any[] =[];
	currentItem : any;
	selectedType : string = "All";
	designTypes=this.DesignService.getDesignTypes();
	mobile : boolean = false;
	userData : any;
	dataFlag : boolean = false;

	constructor(private DesignService : DesignService,
				private FirebaseService : FirebaseService,
				private SnackBar: MatSnackBar,
				private afStorage : AngularFireStorage 
		) { 

        // Get the user data
        this.userData = JSON.parse(localStorage.getItem('user'));
		this.dataFlag = false;
	}

	

	ngOnInit(): void {

		if ( window.screen.width < 960 )
		{
			this.mobile = true;
		}

		this.designTypes.unshift("All");


		// Pull all docs where a status is active
		this.FirebaseService.getDocsByParam( 'designs', 'status', 1 )
			.subscribe(result => {
				var tempArray = [];
				var docData;
				result.forEach((doc) => {
					docData=doc.data();
					docData.uid=doc.id;
					//console.log(doc.id, '=>', doc.data());
					tempArray.push(docData);
				});
				this.storeList = tempArray;
				this.formatStoreData();
		});


	}




  	/*
  	*
  	*	This function formats the image data necessary
  	*
  	*/
	formatStoreData(){

		for (var a=0; a<this.storeList.length; a++)
		{

			this.storeList[a]['imageUrls'] = [];
			for (var b=0; b<this.storeList[a].marketplace.images.length; b++)
			{

				const myRef = this.afStorage.ref(this.storeList[a].marketplace.images[b]['path']);
				this.storeList[a]['imageUrls'].push(myRef.getDownloadURL());

				if (this.storeList[a].marketplace.images[b]['mainImage'])
				{
					this.storeList[a]['background'] = myRef.getDownloadURL();
				}
			}

		}

		this.dataFlag = true;

	}




}
