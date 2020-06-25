
import { Observable } from "rxjs/Observable"


export class mockItems {


    constructor() {}


    // Stub for the Angular Fire
    public AngularFireStub() {
        return { getDocsByUserId: (_d: any, _id:any) => new Promise((resolve, _reject) => resolve({data:()=>{}})),


        		 getDocById: (_d: any, _id:any) => new Promise((resolve, _reject) => resolve({data:()=>{ return this.FireStubData(_d, _id)}})),




        		 getDocsByParam: (_d: any, _id:any) => new Observable((observer) => {}) }
    }		



    public FireStubData(database, id){

    	if ( database == 'versions')
    	{
	    	return { 	'creatorId': "mmAvAdd1GlgBebdV85OVRE1CSK43",
						'dateCreated': 1591842018832,
						'deposit': 4465,
						'description': "This was an update after speaking with the customer",
						'designId': "jBRzSildNc16fQjAmLkh",
						'initialOpen': false,
						'latest': true,
						'measurements': [],
						'name': "Second Version",
						'price': 16500,
						'projectId': "MKya93yYzkdKARwIwfz9",
						'tax': 1361,
						'totalCost': 17861,
						'uid': "1wdiyJc3OyZQ2a7F47G6",
						'values':{
							'Bench Depth': 30,
							'Bench Height': 20,
							'Left Planter': "0",
							'Left Seating Length': 1,
							'RIGHT SEATING LENGTH': 6,
							'Right Planter': "0",
							'Right Seating Length': 8,
							'Twist Length': 2,
						 }
					}
		}

		if ( database == 'designs')
		{
			return {
						'category': "Seating",
						'company': {
							'id': 1,
							'location': "Houston, Texas",
							'logo': "https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png",
							'name': "MAK Studio"},
						'companyId': 1,
						'designerId': "mmAvAdd1GlgBebdV85OVRE1CSK43",
						'designers': {
							'mmAvAdd1GlgBebdV85OVRE1CSK43': true
							},
						'id': "IrcvJwPAs612",
						'initialPrice': "10000",
						'marketplace': {
							'description': "This bench has two seating areas with a twisting section connecting them. The width and depth of the bench can be set as well as the length of each seating area and the length of the twisting section. There can also be a planter in the seating section.",
							'images': [
								{ 'mainImage': false, 'path': "/marketplace/carousel/jBRzSildNc16fQjAmLkh-Kb5JT6.png"},
								{ 'path': "/marketplace/carousel/jBRzSildNc16fQjAmLkh-Gn40cg.jpeg", 'mainImage': true} ],
							'mainBgImage': "jBRzSildNc16fQjAmLkh.jpeg",
							'mainImage': "https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png",
						},
						'price': 4500,
						'priceFormula': "(Left Seating Length+Twist Length+Right Seating Length)*1500",
						'priceShowForm': "",
						'priceStatus': false,
						'priceString': "(1+1+1)*1500",
						'priceValid': true,
						'pricingModel': "",
						'shapediverTicket': "ccf330f694285fa526a47387edbd0a89e09146369e7b730dbf57fa6354146b1df5390f267e9fe942b42e7571084e91c912c272ff2b7609aed88e123dfd2718afeb773039caed2580fc03c3d0d629a26da06f34f54bc0b3731a19d16c790bd4656b5dad94fd5572642398bc694aaf42b03957e44bbb44-9bc6005b71d9578337b4509851c32a30",
						'slug': "",
						'status': 1,
						'test': true,
						'title': "Planter Bench",
						'uid': "jBRzSildNc16fQjAmLkh",
						'visibility': "private"
					}
		}

    }



    // Stub for the dialog ref
    public DialogRefStub() {
    	return {
	    	close: jasmine.createSpy('close'),
	    	open: jasmine.createSpy('open')
	    }
	};


	// Stub for the dialog
	public mockDialog() {
		return {
			close: jasmine.createSpy('close'),
	    	open: jasmine.createSpy('open'),
	    	Overlay : jasmine.createSpy('Overlay')
	    }
	};


	// Stub for the snack bar
	public mockSnackBar() {
    	return { 
    		Overlay : jasmine.createSpy('Overlay')
    	}
	}


	// Data Object used in parameter-dialog
	public mockParameterDialog() {
		return {
				'i' : 0,
				'j' : 0,
				'currentDesign' : {
					'parameterMenus' : [
						{ 'parameters' : [{'type':'slider'}] }
					]
				}
		}
	}







	// Data Object used in document-dialog
	public mockDocumentDialog() {
		return {
			'querySelectorAll' : ()=>{}
		}
	}


	// Data Object for activated route stub
	public ActivatedRouteStub() {
		return { 'snapshot': {
	                'url': [{ 'path': 1 }, { 'path': 2 }],
	                'paramMap' : {
	                	'get' : ()=>'mmAvAdd1GlgBebdV85OVRE1CSK43',
	                	'set' : ()=>{},
	                }
	            }
	        
		}
	}




	// Stub for Route
	public RouteStub() {
		return { 'snapshot': {
	                'url': [{ 'path': 1 }, { 'path': 2 }],
	                'paramMap' : {
	                	'get' : ()=>{},
	                	'set' : ()=>{},
	                }
	            }
	        
		}
	}





	// Stub for Auth Service
	public AngularAuthStub() {
		return { 'authState': 
					{
				 		'subscribe' : ()=>{}
				 	}
				}
	}






	// Data Object for design data
	public designDataStub() {
		return { 'parameterMenus' : 
				[
					{'parameters' : [] }
				],
				'menuShow' : [],
				'menuLocations' : [ [] ]
			 
	            
	        
		}
	}



	// Data Object for version List
	public versionListStub() {
		return [] 
	           
	}




	// Data Object for version data
	public versionDataStub() {
		return { 
	            
	        
		}
	}





	// Data Object for user data
	public userDataStub() {
		return { 
	            
	        
		}
	}






	// Data Object for user data
	public mockUserData() {
		return { 
	            
	        
		}
	}





	// Data Object for user data
	public mockUserService() {
		return { 
			'getYearList' : ()=>{},
			'getMonthList' : ()=>{},
	        
		}
	}




	public mockEcommerceProductService() {
		return {}

	}


	public mockEcommerceProductsService() {
		return {}

	}





	public mockChatService() {
		return {
				'onRightSidenavViewChanged' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'onChatSelected' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'onLeftSidenavViewChanged' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'onContactSelected' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'onChatsUpdated' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				},
				'onUserUpdated' : {
					'pipe' : (_d: any) => new Observable((observer) => {})
				}
				
		}
	}




	public mockKnowledgeBase() {
		return {
				'onKnowledgeBaseChanged' : {
					'pipe' : (_d: any) => new Observable((observer) => {}),
				}
				
		}
	}



	public mockDesignData() {
		return {
					'parameterMenus' : [ {
											'parameters' : [ {
																'images' : [] 
															  }
															] 
										 } 
										],
					'versionList' : []
		}
	}









}