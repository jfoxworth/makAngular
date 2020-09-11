

/*
*
*
*	Users who have permissions to edit designs
*
*/

export interface designPermission {
	designId 	: string;
	members 	: string[];
	userId		: string;
}