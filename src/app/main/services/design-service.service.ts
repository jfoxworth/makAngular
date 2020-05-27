import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DesignService {

	constructor() { }



	/**
	 * A clean design object
	 */
	getNewDesign( thisId ) {
		
		return {
		    'id'      				: thisId,
		    'uid'      				: thisId,
		    'title'   				: 'New Design',
		    'slug'    				: '',
		    'category'				: '',
		    'marketplace'			: {
		    							'images' : [],
		    							'mainImage' : 'https://makstudio.s3.us-east-2.amazonaws.com/Marketplace/background/001.png',
		    							'description' : 'Description of the product'
		    							},
		    'shapediverTicket' 		: '',
		    'parameterMenus' 		: [{'label': 'Temp Title', 
		    							'icon':'settings', 
		    							'parameters': [	this.getNewParameter() ] 
		    							}
		    						   ],
		    'pricingModel' 			: '',
		    'initialPrice' 			: 0,
		    'priceFormula'			: '',
		    'priceStatus'			: false,
		    'priceArray'			: [],
		    'priceShowForm'			: '',
            'companyId'				: 0,
            'company'				: { 'name' : '', 'id' : 0, 'location' : '', 'logo' : ''},
            'status'				: 0
		}
	}










	/**
	 * An empty submenu item
	 */
	getNewSubmenu(){
		return {'label': 'TempTitle', 'icon':'settings', 'parameters':[this.getNewParameter()] }
	}












	/**
	 * The locations of the hexagons
	 */
	getMenuLocations(){
		return [
				[60, 8],
				[30, 60],
				[88, 60],
				[60, 112],
				[30, 164],
				[88, 164]
			]
	}
















	/**
	 * The parameter types
	 */
	getParameterTypes(){
		return [ 'slider', 'text', 'dropdown', 'toggle', 'upload', 'blob']
	}














	/**
	 * An empty parameter object
	 */
	getNewParameter(){

		return {
			'type' 			: 'slider',				// slider, text, select, etc
			'label' 		: 'Temp Parameter',		// Text shown in display for the item
			'shapediver'	: '',					// Shapediver id for the item
			'value'			: 0,					//
			'min'			: 0,					// Minimum value for the slider
			'max' 			: 10,					// Max value for the slider
			'step'			: 5,					// Step value for the slider
			'tickInterval'	: 5,
			'tickLabel'		: 5,
			'showTicks'		: false,
			'showTicksValues':false,
			'text'			: 'Text Here',			// Text for an input
			'status'		: false,				// Boolean status
			'options'		: []					// Options for the select item
		};
	}













	/**
	 * An array of the available types
	 */
	getDesignTypes(){
		return	['Wall', 'Seating', 'Desk', 'Island']

	}















	/**
	 * An array of the available types
	 */
	getCompanies(){
		return [
			{
				'name' : 'MAK Studio',
				'logo' : 'https://makstudio.s3.us-east-2.amazonaws.com/logoBlack.png',
				'location' : 'Houston, Texas',
				'id' : 1
			},
			{
				'name' : 'My personal studio',
				'logo' : '',
				'location' : 'Houston, Texas',
				'id' : 2
			},
			{
				'name' : 'Carlos Danger Designs',
				'logo' : '',
				'location' : 'Houston, Texas',
				'id' : 3
			}
		];
	}


















	/**
	 * An array of the available icons
	 */
	getIconOptions(){
		return	['360', 'ac_unit', 'access_alarms', 'access_time', 'accessibility_new', 'account_balance', 'account_box', 'account_circle', 
				'add_a_photo', 'add_alert', 'add_location', 'airplanemode_active', 'airport_shuttle', 'album', 'all_inbox', 'all_inclusive', 
				'apps', 'assessment', 'aspect_ratio', 'assignment_ind', 'assignment', 'assistant_photo', 'attach_ile', 'autorenew', 'av_time', 'backup',
				'backup',
			'ballot',
			'bar_chart',
			'battery_alert',
			'battery_charging_full',
			'battery_full',
			'battery_std',
			'battery_unknown',
			'beach_access',
			'beenhere',
			'block',
			'bluetooth_audio',
			'bluetooth_connected',
			'bluetooth_disabled',
			'bluetooth_searching',
			'bluetooth',
			'blur_circular',
			'blur_linear',
			'blur_off',
			'blur_on',
			'book',
			'bookmark_border',
			'bookmark',
			'bookmarks',
			'border_all',
			'border_bottom',
			'border_clear',
			'border_horizontal',
			'border_inner',
			'border_left',
			'border_outer',
			'border_right',
			'border_style',
			'border_top',
			'border_vertical',
			'branding_watermark',
			'brightness_1',
			'brightness_2',
			'brightness_3',
			'brightness_4',
			'brightness_5',
			'brightness_6',
			'brightness_7',
			'brightness_auto',
			'brightness_high',
			'brightness_low',
			'brightness_medium',
			'broken_image',
			'brush',
			'bubble_chart',
			'bug_report',
			'build',
			'burst_mode',
			'business_center',
			'business',
			'cached',
			'cake',
			'calendar_today',
			'calendar_view_day',
			'call_end',
			'call_made',
			'call_merge',
			'call_missed_outgoing',
			'call_missed',
			'call_received',
			'call_split',
			'call_to_action',
			'call',
			'camera_alt',
			'camera_enhance',
			'camera_front',
			'camera_rear',
			'camera_roll',
			'camera',
			'cancel_presentation',
			'cancel',
			'card_giftcard',
			'card_membership',
			'card_travel',
			'casino',
			'cast_connected',
			'cast_for_education',
			'cast',
			'category',
			'center_focus_strong',
			'center_focus_weak',
			'change_history',
			'chat_bubble_outline',
			'chat_bubble',
			'chat',
			'check_box_outline_blank',
			'check_box',
			'check_circle_outline',
			'check_circle',
			'check',
			'chevron_left',
			'chevron_right',
			'child_care',
			'child_friendly',
			'chrome_reader_mode',
			'class',
			'clear_all',
			'clear',
			'close',
			'closed_caption',
			'cloud_circle',
			'cloud_done',
			'cloud_download',
			'cloud_off',
			'cloud_queue',
			'cloud_upload',
			'cloud',
			'code',
			'collections_bookmark',
			'collections',
			'color_lens',
			'colorize',
			'comment',
			'commute',
			'compare_arrows',
			'compare',
			'compass_calibration',
			'computer',
			'confirmation_number',
			'contact_mail',
			'contact_phone',
			'contact_support',
			'contacts',
			'control_camera',
			'control_point_duplicate',
			'control_point',
			'copyright',
			'create_new_folder',
			'create',
			'credit_card',
			'crop_3_2',
			'crop_5_4',
			'crop_7_5',
			'crop_16_9',
			'crop_din',
			'crop_free',
			'crop_landscape',
			'crop_original',
			'crop_portrait',
			'crop_rotate',
			'crop_square',
			'crop',
			'dashboard',
			'data_usage',
			'date_range',
			'dehaze',
			'delete_forever',
			'delete_outline',
			'delete_sweep',
			'delete',
			'departure_board',
			'description',
			'desktop_access_disabled',
			'desktop_mac',
			'desktop_windows',
			'details',
			'developer_board',
			'developer_mode',
			'device_hub',
			'device_unknown',
			'devices_other',
			'devices',
			'dialer_sip',
			'dialpad',
			'directions_bike',
			'directions_boat',
			'directions_bus',
			'directions_car',
			'directions_railway',
			'directions_run',
			'directions_subway',
			'directions_transit',
			'directions_walk',
			'directions',
			'disc_full',
			'dns',
			'dock',
			'domain_disabled',
			'domain',
			'done_all',
			'done_outline',
			'done',
			'donut_large',
			'donut_small',
			'drafts',
			'drag_handle',
			'drag_indicator',
			'drive_eta',
			'duo',
			'dvr',
			'edit_attributes',
			'edit_location',
			'edit',
			'eject',
			'email',
			'enhanced_encryption',
			'equalizer',
			'error_outline',
			'error',
			'euro_symbol',
			'ev_station',
			'event_available',
			'event_busy',
			'event_note',
			'event_seat',
			'event',
			'exit_to_app',
			'expand_less',
			'expand_more',
			'explicit',
			'explore_off',
			'explore',
			'exposure_neg_1',
			'exposure_neg_2',
			'exposure_plus_1',
			'exposure_plus_2',
			'exposure_zero',
			'exposure',
			'extension',
			'face',
			'fast_forward',
			'fast_rewind',
			'fastfood',
			'favorite_border',
			'favorite',
			'featured_play_list',
			'featured_video',
			'feedback',
			'fiber_dvr',
			'fiber_manual_record',
			'fiber_new',
			'fiber_pin',
			'fiber_smart_record',
			'file_copy',
			'filter_1',
			'filter_2',
			'filter_3',
			'filter_4',
			'filter_5',
			'filter_6',
			'filter_7',
			'filter_8',
			'filter_9_plus',
			'filter_9',
			'filter_b_and_w',
			'filter_center_focus',
			'filter_drama',
			'filter_frames',
			'filter_hdr',
			'filter_list',
			'filter_none',
			'filter_tilt_shift',
			'filter_vintage',
			'filter',
			'find_in_page',
			'find_replace',
			'fingerprint',
			'first_page',
			'fitness_center',
			'flag',
			'flare',
			'flash_auto',
			'flash_off',
			'flash_on',
			'flight_land',
			'flight_takeoff',
			'flight',
			'flip_to_back',
			'flip_to_front',
			'flip',
			'folder_open',
			'folder_shared',
			'folder_special',
			'folder',
			'font_download',
			'format_align_center',
			'format_align_justify',
			'format_align_left',
			'format_align_right',
			'format_bold',
			'format_clear',
			'format_color_reset',
			'format_indent_decrease',
			'format_indent_increase',
			'format_italic',
			'format_line_spacing',
			'format_list_bulleted',
			'format_list_numbered_rtl',
			'format_list_numbered',
			'format_paint',
			'format_quote',
			'format_shapes',
			'format_size',
			'format_strikethrough',
			'format_textdirection_l_to_r',
			'format_textdirection_r_to_l',
			'format_underlined',
			'forum',
			'forward_5',
			'forward_10',
			'forward_30',
			'forward',
			'free_breakfast',
			'fullscreen_exit',
			'fullscreen',
			'functions',
			'g_translate',
			'gamepad',
			'games',
			'gavel',
			'gesture',
			'get_app',
			'gif',
			'golf_course',
			'gps_fixed',
			'gps_not_fixed',
			'gps_off',
			'grade',
			'gradient',
			'grain',
			'graphic_eq',
			'grid_off',
			'grid_on',
			'group_add',
			'group_work',
			'group',
			'hd',
			'hdr_off',
			'hdr_on',
			'hdr_strong',
			'hdr_weak',
			'headset_mic',
			'headset',
			'healing',
			'hearing',
			'help_outline',
			'help',
			'high_quality',
			'highlight_off',
			'highlight',
			'history',
			'home',
			'horizontal_split',
			'hot_tub',
			'hotel',
			'hourglass_empty',
			'hourglass_full',
			'how_to_reg',
			'how_to_vote',
			'http',
			'https',
			'image_aspect_ratio',
			'image_search',
			'image',
			'import_contacts',
			'import_export',
			'important_devices',
			'inbox',
			'indeterminate_check_box',
			'info',
			'input',
			'insert_chart_outlined',
			'insert_chart',
			'insert_comment',
			'insert_drive_file',
			'insert_emoticon',
			'insert_invitation',
			'insert_link',
			'insert_photo',
			'invert_colors_off',
			'invert_colors',
			'iso',
			'keyboard_arrow_down',
			'keyboard_arrow_left',
			'keyboard_arrow_right',
			'keyboard_arrow_up',
			'keyboard_backspace',
			'keyboard_capslock',
			'keyboard_hide',
			'keyboard_return',
			'keyboard_tab',
			'keyboard_voice',
			'keyboard',
			'kitchen',
			'label_important',
			'label_off',
			'label',
			'landscape',
			'language',
			'laptop_chromebook',
			'laptop_mac',
			'laptop_windows',
			'laptop',
			'last_page',
			'launch',
			'layers_clear',
			'layers',
			'leak_add',
			'leak_remove',
			'lens',
			'library_add',
			'library_books',
			'library_music',
			'line_style',
			'line_weight',
			'linear_scale',
			'link_off',
			'link',
			'linked_camera',
			'list_alt',
			'list',
			'live_help',
			'live_tv',
			'local_activity',
			'local_airport',
			'local_atm',
			'local_bar',
			'local_cafe',
			'local_car_wash',
			'local_convenience_store',
			'local_dining',
			'local_drink',
			'local_florist',
			'local_gas_station',
			'local_grocery_store',
			'local_hospital',
			'local_hotel',
			'local_laundry_service',
			'local_library',
			'local_mall',
			'local_movies',
			'local_offer',
			'local_parking',
			'local_pharmacy',
			'local_phone',
			'local_pizza',
			'local_play',
			'local_post_office',
			'local_printshop',
			'local_see',
			'local_shipping',
			'local_taxi',
			'location_city',
			'location_disabled',
			'location_off',
			'location_on',
			'location_searching',
			'lock_open',
			'lock',
			'looks_3',
			'looks_4',
			'looks_5',
			'looks_6',
			'looks_one',
			'looks_two',
			'looks',
			'loop',
			'loupe',
			'low_priority',
			'loyalty',
			'mail_outline',
			'mail',
			'map',
			'markunread_mailbox',
			'markunread',
			'maximize',
			'meeting_room',
			'memory',
			'menu',
			'merge_type',
			'message',
			'mic_none',
			'mic_off',
			'mic',
			'minimize',
			'missed_video_call',
			'mms',
			'mobile_friendly',
			'mobile_off',
			'mobile_screen_share',
			'mode_comment',
			'monetization_on',
			'money_off',
			'money',
			'monochrome_photos',
			'mood_bad',
			'mood',
			'more_horiz',
			'more_vert',
			'more',
			'motorcycle',
			'mouse',
			'move_to_inbox',
			'movie_creation',
			'movie_filter',
			'movie',
			'multiline_chart',
			'music_note',
			'music_off',
			'music_video',
			'my_location',
			'nature_people',
			'nature',
			'navigate_before',
			'navigate_next',
			'navigation',
			'near_me',
			'network_check',
			'network_locked',
			'new_releases',
			'next_week',
			'nfc',
			'no_encryption',
			'no_meeting_room',
			'no_sim',
			'not_interested',
			'not_listed_location',
			'note_add',
			'note',
			'notes',
			'notification_important',
			'notifications_active',
			'notifications_none',
			'notifications_off',
			'notifications_paused',
			'notifications',
			'offline_bolt',
			'offline_pin',
			'ondemand_video',
			'opacity',
			'open_in_browser',
			'open_in_new',
			'open_with',
			'outlined_flag',
			'pages',
			'pageview',
			'palette',
			'pan_tool',
			'panorama_fish_eye',
			'panorama_horizontal',
			'panorama_vertical',
			'panorama_wide_angle',
			'panorama',
			'party_mode',
			'pause_circle_filled',
			'pause_circle_outline',
			'pause_presentation',
			'pause',
			'payment',
			'people_outline',
			'people',
			'perm_camera_mic',
			'perm_contact_calendar',
			'perm_data_setting',
			'perm_device_information',
			'perm_identity',
			'perm_media',
			'perm_phone_msg',
			'perm_scan_wifi',
			'person_add_disabled',
			'person_add',
			'person_outline',
			'person_pin_circle',
			'person_pin',
			'person',
			'personal_video',
			'pets',
			'phone_android',
			'phone_bluetooth_speaker',
			'phone_callback',
			'phone_forwarded',
			'phone_in_talk',
			'phone_iphone',
			'phone_locked',
			'phone_missed',
			'phone_paused',
			'phone',
			'phonelink_erase',
			'phonelink_lock',
			'phonelink_off',
			'phonelink_ring',
			'phonelink_setup',
			'phonelink',
			'photo_album',
			'photo_camera',
			'photo_filter',
			'photo_library',
			'photo_size_select_actual',
			'photo_size_select_large',
			'photo_size_select_small',
			'photo',
			'picture_as_pdf',
			'picture_in_picture_alt',
			'picture_in_picture',
			'pie_chart',
			'pin_drop',
			'place',
			'play_arrow',
			'play_circle_filled_white',
			'play_circle_filled',
			'play_circle_outline',
			'play_for_work',
			'playlist_add_check',
			'playlist_add',
			'playlist_play',
			'plus_one',
			'poll',
			'polymer',
			'pool',
			'portable_wifi_off',
			'portrait',
			'power_input',
			'power_off',
			'power_settings_new',
			'power',
			'pregnant_woman',
			'present_to_all',
			'print_disabled',
			'print',
			'priority_high',
			'public',
			'publish',
			'query_builder',
			'question_answer',
			'queue_music',
			'queue_play_next',
			'queue',
			'radio_button_checked',
			'radio_button_unchecked',
			'radio',
			'rate_review',
			'receipt',
			'recent_actors',
			'record_voice_over',
			'redeem',
			'redo',
			'refresh',
			'remove_circle_outline',
			'remove_circle',
			'remove_from_queue',
			'remove_red_eye',
			'remove_shopping_cart',
			'remove',
			'reorder',
			'repeat_one',
			'repeat',
			'replay_5',
			'replay_10',
			'replay_30',
			'replay',
			'reply_all',
			'reply',
			'report_off',
			'report_problem',
			'report',
			'restaurant_menu',
			'restaurant',
			'restore_from_trash',
			'restore_page',
			'restore',
			'ring_volume',
			'room_service',
			'room',
			'rotate_90_degrees_ccw',
			'rotate_left',
			'rotate_right',
			'rounded_corner',
			'router',
			'rowing',
			'rss_feed',
			'rv_hookup',
			'satellite',
			'save_alt',
			'save',
			'scanner',
			'scatter_plot',
			'schedule',
			'school',
			'score',
			'screen_lock_landscape',
			'screen_lock_portrait',
			'screen_lock_rotation',
			'screen_rotation',
			'screen_share',
			'sd_card',
			'sd_storage',
			'search',
			'security',
			'select_all',
			'send',
			'sentiment_dissatisfied',
			'sentiment_satisfied_alt',
			'sentiment_satisfied',
			'sentiment_very_dissatisfied',
			'sentiment_very_satisfied',
			'settings_applications',
			'settings_backup_restore',
			'settings_bluetooth',
			'settings_brightness',
			'settings_cell',
			'settings_ethernet',
			'settings_input_antenna',
			'settings_input_component',
			'settings_input_composite',
			'settings_input_hdmi',
			'settings_input_svideo',
			'settings_overscan',
			'settings_phone',
			'settings_power',
			'settings_remote',
			'settings_system_daydream',
			'settings_voice',
			'settings',
			'share',
			'shop_two',
			'shop',
			'shopping_basket',
			'shopping_cart',
			'short_text',
			'show_chart',
			'shuffle',
			'shutter_speed',
			'signal_cellular_0_bar',
			'signal_cellular_4_bar',
			'signal_cellular_alt',
			'signal_cellular_connected_no_internet_4_bar',
			'signal_cellular_no_sim',
			'signal_cellular_null',
			'signal_cellular_off',
			'signal_wifi_0_bar',
			'signal_wifi_4_bar_lock',
			'signal_wifi_4_bar',
			'signal_wifi_off',
			'sim_card',
			'skip_next',
			'skip_previous',
			'slideshow',
			'slow_motion_video',
			'smartphone',
			'smoke_free',
			'smoking_rooms',
			'sms_failed',
			'sms',
			'snooze',
			'sort_by_alpha',
			'sort',
			'spa',
			'space_bar',
			'speaker_group',
			'speaker_notes_off',
			'speaker_notes',
			'speaker_phone',
			'speaker',
			'spellcheck',
			'star_border',
			'star_half',
			'star_rate',
			'star',
			'stars',
			'stay_current_landscape',
			'stay_current_portrait',
			'stay_primary_landscape',
			'stay_primary_portrait',
			'stop_screen_share',
			'stop',
			'storage',
			'store_mall_directory',
			'store',
			'straighten',
			'streetview',
			'strikethrough_s',
			'style',
			'subdirectory_arrow_left',
			'subdirectory_arrow_right',
			'subject',
			'subscriptions',
			'subtitles',
			'subway',
			'supervised_user_circle',
			'supervisor_account',
			'surround_sound',
			'swap_calls',
			'swap_horiz',
			'swap_horizontal_circle',
			'swap_vert',
			'swap_vertical_circle',
			'switch_camera',
			'switch_video',
			'sync_disabled',
			'sync_problem',
			'sync',
			'system_update',
			'tab_unselected',
			'tab',
			'table_chart',
			'tablet_android',
			'tablet_mac',
			'tablet',
			'tag_faces',
			'tap_and_play',
			'terrain',
			'text_fields',
			'text_format',
			'text_rotate_up',
			'text_rotate_vertical',
			'text_rotation_down',
			'text_rotation_none',
			'textsms',
			'texture',
			'theaters',
			'thumb_down_alt',
			'thumb_down',
			'thumb_up_alt',
			'thumb_up',
			'thumbs_up_down',
			'time_to_leave',
			'timelapse',
			'timeline',
			'timer_3',
			'timer_10',
			'timer_off',
			'timer',
			'title',
			'toc',
			'today',
			'toggle_off',
			'toggle_on',
			'toll',
			'tonality',
			'touch_app',
			'toys',
			'track_changes',
			'traffic',
			'train',
			'tram',
			'transfer_within_a_station',
			'transform',
			'transit_enterexit',
			'translate',
			'trending_down',
			'trending_flat',
			'trending_up',
			'trip_origin',
			'tune',
			'turned_in_not',
			'turned_in',
			'tv_off',
			'tv',
			'unarchive',
			'undo',
			'unfold_less',
			'unfold_more',
			'unsubscribe',
			'update',
			'usb',
			'verified_user',
			'vertical_align_bottom',
			'vertical_align_center',
			'vertical_align_top',
			'vertical_split',
			'vibration',
			'video_call',
			'video_label',
			'video_library',
			'videocam_off',
			'videocam',
			'videogame_asset',
			'view_agenda',
			'view_array',
			'view_carousel',
			'view_column',
			'view_comfy',
			'view_compact',
			'view_day',
			'view_headline',
			'view_list',
			'view_module',
			'view_quilt',
			'view_stream',
			'view_week',
			'vignette',
			'visibility_off',
			'visibility',
			'voice_chat',
			'voice_over_off',
			'voicemail',
			'volume_down',
			'volume_mute',
			'volume_off',
			'volume_up',
			'vpn_key',
			'vpn_lock',
			'wallpaper',
			'warning',
			'watch_later',
			'watch',
			'waves',
			'wb_auto',
			'wb_cloudy',
			'wb_incandescent',
			'wb_iridescent',
			'wb_sunny',
			'wc',
			'web_asset',
			'web',
			'weekend',
			'whatshot',
			'where_to_vote',
			'widgets',
			'wifi_lock',
			'wifi_off',
			'wifi_tethering',
			'wifi',
			'work_off',
			'work_outline',
			'work',
			'wrap_text',
			'youtube_searched_for',
			'zoom_in',
			'zoom_out_map',
			'zoom_out']

	}







	/**
	 * Generate a random string for ID purposes
	 */
	makeRandom(lengthOfCode) {
		let text = "";
		let possible = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		for (let i = 0; i < lengthOfCode; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
  		}
    	return text;
	}






}