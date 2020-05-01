import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }



	/**
	 * A clean user object
	 */
	getNewUser() {
		return {
			'id'	  		: '',
			'username'		: '',
			'info'			: {
				'firstname'   	: '',
				'lastname'		: '',
				'gender'		: '',
				'birthdate'		: '',
				'birthmonth'	: '',
				'birthyear' 	: '',
				'locations' 	: [],
				'about'			: '',
				'occupation'	: '',
				'skills'		: '',
				'jobs'			: [],
				'address'		: '',
				'telephone'		: [],
				'website' 		: [],
				'emails' 		: []
			}
		}
	}











	/**
	 * A populated user object
	 */
	getUser() {
		return {
			'id'	  		: '',
			'username'		: 'joshuaf',
			'info'			: {
				'firstname'   	: 'Joshua',
				'lastname'		: 'Foxworth',
				'gender'		: 'Male',
				'birthdate'		: '24',
				'birthmonth'	: '6',
				'birthyear' 	: '1976',
				'locations' 	: ['London, UK', 'New York, USA'],
				'about'			: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget pharetra felis, sed ullamcorper dui. Sed et elementum neque. Vestibulum pellente viverra ultrices. Etiam justo augue, vehicula ac gravida a, interdum sit amet nisl. Integer vitae nisi id nibh dictum mollis in vitae tortor.',
				'occupation'	: 'Developer',
				'skills'		: 'C#, PHP, Javascript, Angular, JS, HTML, CSS',
				'jobs'			: [{'title' : 'Self-Employed', 'startdate':'2010', 'enddate':'Now'},{'title' : 'Google', 'startdate':'2008', 'enddate':'2010'}],
				'address'		: 'Ut pharetra luctus est quis sodales. Duis nisi tortor, bibendum eget tincidunt, aliquam ac elit. Mauris nec euismod odio.',
				'telephone'		: ['+6 555 6600', '+9 555 5255'],
				'website' 		: ['www.joshuafoxworth.com'],
				'email' 		: ['mail@withinpixels.com', 'mail@creapond.com']
			}
		}
	}







}
