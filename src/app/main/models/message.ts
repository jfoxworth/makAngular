

/*
*
*
*	Message sent back and forth between users
*
*/


export interface message {
	conversationId 	: string; 				// ID of relevant conversation
	readDate 		: number;				// Date time that the message was read
	sendDate 		: number;				// Date time that the message was sent
	sender 			: string;				// Id of the sender
	senderName		: string;				// Name of user sending message
	status 			: number;				// 0 of message has not been read, 1 of he has
	text 			: string;				// Text of the message
}