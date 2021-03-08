import { createAction, props } from '@ngrx/store';

import { imageObj } from '../../models/imageObj';
import { designImagesReducer } from '../reducers/index';


export const designImagesSave = createAction(
    "[Marketplace] Images Saved",
    props<{designs:imageObj[]}>()
//    props<{ images : imageObj[] }>()
);

export const announcementImagesSave = createAction(
    "[Announcements] Images Saved",
    props<{announcements:imageObj[]}>()
//    props<{ images : imageObj[] }>()
);

