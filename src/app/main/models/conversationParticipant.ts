
/*
*
*
*	The participants in the conversations
*
*/

export interface conversationParticipant {
	dateCreated 	: number;					// Number for the date that this entry was created
	conversationId 	: string;					// ID of the conversation that this applies to
	participantId 	: string;					// The ID of the user participating in the conversation
	creatorId		: string; 					// The ID of the user that added this entry
	creatorUserName : string;		// Name of the user that created it
}