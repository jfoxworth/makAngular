import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseMatchMediaService } from '@fuse/services/match-media.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { Router } from '@angular/router';

// Models
import { UserData } from 'app/main/models/userData';


// NgRX
import { select, Store } from '@ngrx/store';
import { AuthState } from 'app/main/reducers';
import { AppState } from 'app/main/reducers';


// Services
import { AuthService } from 'app/main/services/auth.service';
import { UserService } from 'app/main/services/user-service.service';
import { FirebaseService } from 'app/main/services/firebase.service';


@Component({
	selector   : 'fuse-shortcuts',
	templateUrl: './shortcuts.component.html',
	styleUrls  : ['./shortcuts.component.scss']
})
export class FuseShortcutsComponent implements OnInit, AfterViewInit, OnDestroy
{
	shortcutItems 				: any[];
	navigationItems 			: any[];
	filteredNavigationItems		: any[];
	searching 					: boolean;
	mobileShortcutsPanelActive	: boolean;
	userData 					: UserData;
	userInfo 					: any;
	tempData 					: UserData;

	@Input()
	navigation: any;

	@ViewChild('searchInput')
	searchInputField;

	@ViewChild('shortcuts')
	shortcutsEl: ElementRef;

	// Private
	private _unsubscribeAll: Subject<any>;

	/**
	 * Constructor
	 *
	 * @param {CookieService} _cookieService
	 * @param {FuseMatchMediaService} _fuseMatchMediaService
	 * @param {FuseNavigationService} _fuseNavigationService
	 * @param {MediaObserver} _mediaObserver
	 * @param {Renderer2} _renderer
	 */
	constructor(
		private _cookieService 			: CookieService,
		private _fuseMatchMediaService 	: FuseMatchMediaService,
		private _fuseNavigationService 	: FuseNavigationService,
		private _mediaObserver 			: MediaObserver,
		private _renderer 				: Renderer2,
		private router 					: Router,
		private FirebaseService 		: FirebaseService,
		private UserService 			: UserService,
		private store 					: Store<AuthState>,
	)
	{
		// Set the defaults
		this.shortcutItems = [];
		this.searching = false;
		this.mobileShortcutsPanelActive = false;

		// Set the private defaults
		this._unsubscribeAll = new Subject();



	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void
	{



        // See if user is logged in from previous session
        // or is logged in now.
		this.tempData = JSON.parse(localStorage.getItem('UserData'));
		
		this.store.subscribe(state => {

			this.tempData = JSON.parse(localStorage.getItem('UserData'));

			if ( ( this.tempData ) && ( !state.UserData ) )
			{
				this.userData = this.tempData;
			}

			if ( state.UserData )
			{
				this.userData = state.UserData;
			}

		});




		// Get the navigation items and flatten them
		this.filteredNavigationItems = this.navigationItems = this._fuseNavigationService.getFlatNavigation(this.navigation);


		this.shortcutItems = [
			{
				title: 'Knowledge Base',
				type : 'item',
				icon : 'help_outline',
				url  : '/knowledge-base'
			},
			{
				title: 'Design Studio',
				type : 'item',
				icon : 'color_lens',
				url  : '/designStudio'
			},
			{
				title: 'Design Store',
				type : 'item',
				icon : 'store',
				url  : '/store'
			}
		];


		this.userInfo = {};

		if ( ( this.userData !== undefined) && ( this.userData !== null ) )
		{

			this.userInfo = this.FirebaseService.getDocById( 'users', this.userData.uid ).then(response=> {
				this.userInfo=response.data();
				

				if ( this.userInfo.designer )
				{

					this.shortcutItems = [
						{
							title: 'My Profile',
							type : 'item',
							icon : 'person',
							url  : '/profile'
						},
						{
							title: 'Messages',
							type : 'item',
							icon : 'email',
							url  : '/messages'
						},
						{
							title: 'Knowledge Base',
							type : 'item',
							icon : 'help_outline',
							url  : '/knowledge-base'
						},
						{
							title: 'My Projects',
							type : 'item',
							icon : 'today',
							url  : '/products'
						},
						{
							title: 'Design Studio',
							type : 'item',
							icon : 'color_lens',
							url  : '/designStudio'
						},
						{
							title: 'The Marketplace',
							type : 'item',
							icon : 'store',
							url  : '/marketplace'
						},
						{
							title: 'Creator Studio',
							type : 'item',
							icon : 'settings',
							url  : '/creatorStudio'
						}
					];



				}else
				{

					this.shortcutItems = [
						{
							title: 'My Profile',
							type : 'item',
							icon : 'person',
							url  : '/profile'
						},
						{
							title: 'Messages',
							type : 'item',
							icon : 'email',
							url  : '/messages'
						},
						{
							title: 'Knowledge Base',
							type : 'item',
							icon : 'help_outline',
							url  : '/knowledge-base'
						},
						{
							title: 'My Projects',
							type : 'item',
							icon : 'today',
							url  : '/products'
						},
						{
							title: 'Design Studio',
							type : 'item',
							icon : 'color_lens',
							url  : '/designStudio'
						},
						{
							title: 'The Markeplace',
							type : 'item',
							icon : 'store',
							url  : '/marketplace'
						}
					];

				}

			});		

		}


		

	}

	ngAfterViewInit(): void
	{
		// Subscribe to media changes
		this._fuseMatchMediaService.onMediaChange
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(() => {
				if ( this._mediaObserver.isActive('gt-sm') )
				{
					this.hideMobileShortcutsPanel();
				}
			});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void
	{
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Search
	 *
	 * @param event
	 */
	search(event): void
	{
		const value = event.target.value.toLowerCase();

		if ( value === '' )
		{
			this.searching = false;
			this.filteredNavigationItems = this.navigationItems;

			return;
		}

		this.searching = true;

		this.filteredNavigationItems = this.navigationItems.filter((navigationItem) => {
			return navigationItem.title.toLowerCase().includes(value);
		});
	}

	/**
	 * Toggle shortcut
	 *
	 * @param event
	 * @param itemToToggle
	 */
	toggleShortcut(event, itemToToggle): void
	{
		event.stopPropagation();

		for ( let i = 0; i < this.shortcutItems.length; i++ )
		{
			if ( this.shortcutItems[i].url === itemToToggle.url )
			{
				this.shortcutItems.splice(i, 1);

				// Save to the cookies
				this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));

				return;
			}
		}

		this.shortcutItems.push(itemToToggle);

		// Save to the cookies
		this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));
	}

	/**
	 * Is in shortcuts?
	 *
	 * @param navigationItem
	 * @returns {any}
	 */
	isInShortcuts(navigationItem): any
	{
		return this.shortcutItems.find(item => {
			return item.url === navigationItem.url;
		});
	}

	/**
	 * On menu open
	 */
	onMenuOpen(): void
	{
		setTimeout(() => {
			this.searchInputField.nativeElement.focus();
		});
	}

	/**
	 * Show mobile shortcuts
	 */
	showMobileShortcutsPanel(): void
	{
		this.mobileShortcutsPanelActive = true;
		this._renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
	}

	/**
	 * Hide mobile shortcuts
	 */
	hideMobileShortcutsPanel(): void
	{
		this.mobileShortcutsPanelActive = false;
		this._renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
	}
}
