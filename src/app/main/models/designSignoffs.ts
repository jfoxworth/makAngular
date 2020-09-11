
/*
*
*	There are times when a design needs to be signed off on
* 	by a customer. When that is necessary, a setting is set
*	on the design and this collection holds multiple times
*	(if necessary) where the customer can add comments, etc
*
*	Users who have permission to do a signoff on a design
*	are held on the signoffReqs
*
*/

import { makVersion } from './makVersion';


export interface designSignoff {
	id 				: string;			// The id of the signoff
	designId 		: string;			// The id of the design
	projectId		: string;			// The id of the project
	version 		: makVersion;		// The entire version data
	versionId 		: string;
	comments 		: string; 			// Comments entered by the user
	creatorId 		: string;			// ID of the user
	creatorEmail 	: string;			// Name of the user
	approve 		: boolean;			// Whether or not this signoff is an approval
	dateCreated 	: number;
	deleted 		: boolean;
}