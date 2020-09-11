
/*
*
*	A company is an entity that makes a product to be sold on Mak.
*	There is a separate collection known as employees that ties 
* 	accounts to companies.
*
*/

export interface Company {
	name 			: string;			// The name of the company. "Mak Studio" 
	address 		: string;			// The physical address of the company
	city			: string;			// The city that the company exists in
	zip 			: string;			// The zip code for the company
	website 		: string; 			// String holding the URL for the company
	creatorId 		: string;			// Name of the user that created it
	creatorUserName : string;			// Name of the user that created it

}