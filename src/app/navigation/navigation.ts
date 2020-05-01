import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [

/*
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    },
*/
    {
        id       : 'profile',
        title    : 'Profile',
        translate: 'NAV.PROFILE',
        type     : 'item',
        icon     : 'person',
        url      : 'profile'
    },

    {
        id       : 'messages',
        title    : 'Messages',
        translate: 'NAV.MESSAGES',
        type     : 'item',
        icon     : 'email',
        url      : 'messages'
    },
    {
        id       : 'timeline',
        title    : 'Timeline',
        translate: 'NAV.TIMELINE',
        type     : 'item',
        icon     : 'email',
        url      : 'timeline'
    },

    {
        id       : 'designStudio',
        title    : 'Design Studio',
        translate: 'NAV.DESIGNSTUDIO',
        type     : 'group',
        children : [
            {
                id       : 'flowerWall',
                title    : 'Flower Wall',
                translate: 'NAV.WALLS.FLOWER',
                type     : 'item',
                icon     : 'email',
                url      : 'apps/designStudio/flowerWall'
            },
            {
                id       : 'backlitWall',
                title    : 'Backlit Wall',
                translate: 'NAV.WALLS.BACKLIT',
                type     : 'item',
                icon     : 'email',
                url      : '/designStudio/backlitWall'
            },
            {
                id       : '3DWall',
                title    : '3D Panel Wall',
                translate: 'NAV.WALLS.PANEL',
                type     : 'item',
                icon     : 'email',
                url      : '/designStudio/3DPanelWall'
            },
            {
                id       : 'fossilWall',
                title    : 'Fossil Wall',
                translate: 'NAV.WALLS.FOSSIL',
                type     : 'item',
                icon     : 'email',
                url      : '/designStudio/fossil'
            },
            {
                id       : 'slatWall',
                title    : 'Slat Wall',
                translate: 'NAV.WALLS.FACETED',
                type     : 'item',
                icon     : 'email',
                url      : '/designStudio/faceted'
            },
            {
                id       : 'planterWall',
                title    : 'Planter Wall',
                translate: 'NAV.WALLS.PLANTER',
                type     : 'item',
                icon     : 'email',
                url      : '/designStudio/planterWall'
            },
            {
                id       : 'planterBench',
                title    : 'Planter Bench',
                translate: 'NAV.WALLS.BENCH',
                type     : 'item',
                icon     : 'email',
                url      : '/designStudio/planterBench'
            },
            {
                id       : 'customDesk',
                title    : 'Custom Desk',
                translate: 'NAV.WALLS.DESK',
                type     : 'item',
                icon     : 'email',
                url      : '/designStudio/desk'
            },
        ]
    }

];
