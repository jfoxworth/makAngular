
/*

	This is the resolver for the mak designs models. It returns different
	results depending upon the URL. It is used in almost all components.

	It has one function which returns all of the designs on the database.
	This is used on the marketplace to list all of the designs and is then
	used to select an individual one.

	In the future, once the app is more flushed out, this resolver will
	have to be updated.

*/


// Common Angular Items
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


// RxJS Items
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';



// The mak designs entity service
import { makDesignEntityService } from '../services/entity/makDesign-entity.service';


import { AngularFireStorage } from '@angular/fire/storage';
import { imageObj } from '../models/imageObj';
import { Store } from "@ngrx/store";
import { AppState } from '../store/reducers';
import { designImagesSave } from '../store/actions/design.actions';
import { designImagesReducer } from '../store/reducers/index';
import { DesignActions } from '../store/actions/designAction-types';




@Injectable()
export class MakDesignsResolver implements Resolve<boolean> {

	constructor(private makDesignEntityService	: makDesignEntityService,
				      private afStorage : AngularFireStorage,
				      private store : Store<AppState>) {

  }


	resolve(route: ActivatedRouteSnapshot,
			state: RouterStateSnapshot): Observable<boolean> {

      return this.makDesignEntityService.loaded$
			.pipe(
				tap(loaded => {
					if (!loaded) {
					   this.makDesignEntityService.getAll()
					   .subscribe( (makDesigns)=>{

							let images$ = [];
							let arrKeys = [];
							let mainImage = [];
							for (var a=0; a<makDesigns.length; a++)
							{
								//console.log('Design - '+makDesigns[a]['id']);
								for (var b=0; b<makDesigns[a].marketplace.images.length; b++)
								{
									const myRef = this.afStorage.ref(makDesigns[a].marketplace.images[b]['path']);
									images$.push(myRef.getDownloadURL())
									arrKeys.push(makDesigns[a]['id']);
									if (makDesigns[a].marketplace.images[b]['mainImage'])
									{
										mainImage.push(true);
									}else
									{
										mainImage.push(false);
									}
								}
								//console.log(makDesigns[a].marketplace.images);
							}

							forkJoin(images$).subscribe(results => {
								let newArr = [];
								let index=0;
								for (var a=0; a<makDesigns.length; a++)
								{
									for (var b=0; b<makDesigns[a].marketplace.images.length; b++)
									{
										const newObj : imageObj = { itemId : arrKeys[index],
															   imageURL : <string>results[index],
															   mainImage : mainImage[index] }
										newArr[index] = newObj;
										index=index+1;
									}
								}
								this.store.dispatch(designImagesSave(  {designs : <imageObj[]>newArr} ))
							})


					   })
					}
				}),
				filter(loaded => !!loaded),
				first()
			);

	}

}

