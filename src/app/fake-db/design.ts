
export class DesignStudioDb
{
	public static data =
		{
			'menuLocations' : [
				[60, 8],
				[30, 60],
				[88, 60],
				[60, 112],
				[30, 164],
				[88, 164]
			],
			'id' : 'r3o4jiofnfn34nr34',
			'name' : 'Planter Bench',
			'ticket' : '',
			'menu' : [
				{
					'location' : 0,
					'name' : 'dimensions',
					'label' : 'Bench Dimensions',
					'icon' : 'accessibility',
					'items' : [
						{
							'location' : 0,
							'type' : 'slider',
							'minValue' : 24,
							'maxValue' : 48,
							'stepValue' : 5,
							'tickIntervalValue' : 5,
							'value' : 30,
							'shapediverId' : '',
							'label' : 'Bench Depth (FT)',
							'modelID' : 'jdiojorj23ierj2'
						},
						{
							'location' : 1,
							'type' : 'slider',
							'minValue' : 16,
							'maxValue' : 30,
							'stepValue' : 1,
							'tickIntervalValue' : 1,
							'value' : 20,
							'shapediverId' : '',
							'label' : 'Bench Height (FT)',
							'modelID' : 'ffwpiu90ewjfw'
						},
						{
							'location' : 2,
							'type' : 'slider',
							'minValue' : 1,
							'maxValue' : 8,
							'stepValue' : 1,
							'tickIntervalValue' : 1,
							'value' : 4,
							'shapediverId' : '',
							'label' : 'Twist Length (FT)',
							'modelID' : 'mr32ior34rn3kn'
						}
					]
				},
				{
					'location' : 1,
					'name' : 'seat',
					'label' : 'Seat Settings',
					'icon' : 'ac_unit',
					'items' : [
						{
							'location' : 0,
							'type' : 'slider',
							'minValue' : 1,
							'maxValue' : 6,
							'shapediverId' : '',
							'label' : 'Left Seat Length (FT)'
						},
						{
							'location' : 1,
							'type' : 'dropdown',
							'options' : [
								{'label' : 'No Planter', value : 'noPlanter'},
								{'label' : 'Quarter Planter', value : 'quarterPlanter'},
								{'label' : 'Half Planter', value : 'halfPlanter'},
								{'label' : 'Full Planter', value : 'fullPlanter'}
							],
							'shapediverId' : '',
							'label' : 'Left Planter Length'
						},
						{
							'location' : 2,
							'type' : 'slider',
							'minValue' : 1,
							'maxValue' : 6,
							'shapediverId' : '',
							'label' : 'Right Seat Length (FT)'
						},
						{
							'location' : 3,
							'type' : 'dropdown',
							'options' : [
								{'label' : 'No Planter', value : 'noPlanter'},
								{'label' : 'Quarter Planter', value : 'quarterPlanter'},
								{'label' : 'Half Planter', value : 'halfPlanter'},
								{'label' : 'Full Planter', value : 'fullPlanter'}
							],
							'shapediverId' : '',
							'label' : 'Right Planter Length'
						},
					]
				}
			]
		}
	
}
