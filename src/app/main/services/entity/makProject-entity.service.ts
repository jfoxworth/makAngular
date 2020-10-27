import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { makProject } from 'app/main/models/makProject';


@Injectable()
export class makProjectEntityService
    extends EntityCollectionServiceBase<makProject> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('makProject', serviceElementsFactory);

    }

}

