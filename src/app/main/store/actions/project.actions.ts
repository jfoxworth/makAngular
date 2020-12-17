import { createAction, props } from '@ngrx/store';

import { imageObj } from '../../models/imageObj';
import { designImagesReducer } from '../reducers/index';


export const projectDeleted = createAction(
    "[ Projects Page ] Project Deleted",
    props<{projectId:string}>()
//    props<{ images : imageObj[] }>()
);


