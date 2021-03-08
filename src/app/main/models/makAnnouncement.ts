
/*
*
*
*	This model represents the announcements made by mak
*
*/

export interface makAnnouncement {
	id 								: string; 					// The id of the entry
  dateCreated       : number;           // Date the announcement was created
  deployDate        : number;           // Data time to deploy
  endDate           : number;           // Date time to stop
  text              : string;           // String of announcement text
  title             : string;           // Title of the announcement
  image             : any; 
  deleted           : boolean;          // Whether or not the ann is deleted
}
