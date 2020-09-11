

/*
*
*
*	Entry representing a user that has been given designer status
*
*/

export interface designer {
	userId 				: string;		// ID of the user in question
	dateCreated 		: number;		// Date that this entry was created
	creatorId			: string;		// The user that created it
	creatorUserName 	: string;		// Name of the user that created it
}