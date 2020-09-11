
/*
*
*
*	A conversation is a chat between two or more people
*	Conversations have participants and messages
*
*
*/

export interface conversation {
	dateCreated 	: number;			// Number representing the date this entry was created
	id 				: string;			// ID of this conversation
	creatorId		: string; 			// ID of the user that created the conversation
	creatorUserName : string;		// Name of the user that created it
}