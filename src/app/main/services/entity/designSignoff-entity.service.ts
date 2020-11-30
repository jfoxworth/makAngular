import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { designSignoff } from 'app/main/models/designSignoffs';


@Injectable()
export class designSignoffEntityService
    extends EntityCollectionServiceBase<designSignoff> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('designSignoff', serviceElementsFactory);

    }

}

