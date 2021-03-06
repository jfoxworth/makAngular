import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { signoffReq } from '../../models/signoffReq';


@Injectable()
export class signoffReqEntityService
    extends EntityCollectionServiceBase<signoffReq> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('signoffReq', serviceElementsFactory);

    }

}

