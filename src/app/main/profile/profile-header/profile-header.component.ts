import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserData } from '../../models/userData';

import { finalize } from 'rxjs/operators';

//Services
import { UserService } from '../../services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';



@Component({
  selector: 'mak-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['../profile.component.scss', './profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  constructor( private UserService : UserService,
               private afStorage : AngularFireStorage ) { }

  @Input() userData:UserData;
  @Input() viewType:number;
  @Input() profileImage:any;
  @Output() saveProfile = new EventEmitter<object>();
  @Output() changeViewType = new EventEmitter<object>();


  ngOnInit() {
  }







  onUpload(event) {


		// Grab the background image
		const file = event.target.files[0];
		console.log('The target is ...');
		console.log(event.target.files);

		var imageType = file.type.replace('image/','');
		var path = '/profile/'+this.userData.uid+'.'+imageType;


		// Get URL
		const ref = this.afStorage.ref(path);

		// Store image type
		this.userData.imageType = imageType;
		this.saveProfile.emit(this.userData);

		// Upload file and subscribe to results
		const task = this.afStorage.upload(path, event.target.files[0]);
		task.snapshotChanges().pipe(
        	finalize(() => this.profileImage = ref.getDownloadURL())
    	 )
    	.subscribe()


  }

	getProfileImage( userId ):void {
		this.profileImage = this.UserService.getProfileImage( userId );
  }



}
