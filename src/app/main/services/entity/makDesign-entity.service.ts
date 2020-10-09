import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { makDesign } from 'app/main/models/makDesign';


@Injectable()
export class makDesignEntityService
    extends EntityCollectionServiceBase<makDesign> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('makDesign', serviceElementsFactory);

    }

}

