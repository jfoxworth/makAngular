
/*
	This is the resolver for the mak announcements. 
*/


// Common Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


// RxJS Items
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';



// The mak version entity service
import { makAnnouncementEntityService } from '../services/entity/makAnnouncement-entity.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { imageObj } from '../models/imageObj';
import { Store } from "@ngrx/store";
import { AppState } from '../store/reducers';
import { announcementImagesSave } from '../store/actions/design.actions';



@Injectable()
export class MakAnnouncementsResolver implements Resolve<boolean> {

	constructor(private makAnnouncementEntityService: makAnnouncementEntityService,
							private afStorage : AngularFireStorage,
							private store : Store<AppState>) {
	}


	resolve(route: ActivatedRouteSnapshot,
			state: RouterStateSnapshot): Observable<boolean> {

		return this.makAnnouncementEntityService.loaded$
			.pipe(
				tap(loaded => {
					if (!loaded) {
					   this.makAnnouncementEntityService.getAll()
						 .subscribe( makAnnouncements=>{

							let annImages$ = [];
							let arrKeys = [];
							for (var a=0; a<makAnnouncements.length; a++)
							{
								const myRef = this.afStorage.ref(makAnnouncements[a].image['path']);
								annImages$.push(myRef.getDownloadURL())
								arrKeys.push(makAnnouncements[a]['id']);
							}

							forkJoin(annImages$).subscribe(results => {
								let newArr = [];
								let index=0;
								for (var a=0; a<makAnnouncements.length; a++)
								{
									const newObj : imageObj = { itemId : arrKeys[index],
																imageURL : <string>results[index],
																mainImage : true }
									newArr[index] = newObj;
									index=index+1;
								}
								
								this.store.dispatch(announcementImagesSave(  {announcements : <imageObj[]>newArr} ))
							})

						 })
					}
				}),
				filter(loaded => !!loaded),
				first()
			);

	}

}
