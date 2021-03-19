
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
	id 						: string;			// The id of the signoff
	designId 			: string;			// The id of the design - deprecated
	itemId				: string;			// ID of the design or project
	signoffType		: string;			// 'design' or 'project'
	comments 			: string; 		// Comments entered by the user
	creatorId 		: string;			// ID of the user
	creatorEmail 	: string;			// Name of the user
	approve 			: number;			// 0 for Not Approved. 1 for Approved. 2 for Approved with comments
	dateCreated 	: number;
	deleted 			: boolean;
	versionId 		: string;			// If this comment or sign off is about a project, this holds the version ID
	pdfPath				: string;			// Path to the PDF(s) uploaded for the signoff
}