import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { makVersion } from '../../models/makVersion';


@Injectable()
export class makVersionEntityService
    extends EntityCollectionServiceBase<makVersion> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('makVersion', serviceElementsFactory);

    }

}

