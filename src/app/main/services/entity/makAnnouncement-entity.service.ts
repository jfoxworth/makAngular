import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { makAnnouncement } from '../../models/makAnnouncement';


@Injectable()
export class makAnnouncementEntityService
    extends EntityCollectionServiceBase<makAnnouncement> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {
        super('makAnnouncement', serviceElementsFactory);

    }

}

