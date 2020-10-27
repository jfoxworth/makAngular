import { createAction, props } from '@ngrx/store';
import { imageObj } from 'app/main/models/imageObj';
import { designImagesReducer } from 'app/main/reducers/index';



export const projectDeleted = createAction(
    "[ Projects Page ] Project Deleted",
    props<{projectId:string}>()
//    props<{ images : imageObj[] }>()
);


