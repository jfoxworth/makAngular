
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


export interface signoffReq {
	id 					: string;			// The id of the signoff
	dateCreated : number;			// The date that this entry was created
	creatorId		: string;			// ID of the user that created this req
	creatorName : string;			// User name of the user that created req
	designId 		: string;			// The id of the design - deprecated
	itemId			: string;			// The id of the design, project, or whatever is being signed off on
	signoffType : string;			// 'design' or 'project'
	userId 			: string;			// ID of the user
	userEmail 	: string;			// email of the user
	deleted 		: boolean;		//
}