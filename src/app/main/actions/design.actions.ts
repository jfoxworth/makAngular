import { createAction, props } from '@ngrx/store';
import { imageObj } from 'app/main/models/imageObj';
import { designImagesReducer } from 'app/main/reducers/index';



export const designImagesSave = createAction(
    "[Marketplace] Images Saved",
    props<{designs:imageObj[]}>()
//    props<{ images : imageObj[] }>()
);


