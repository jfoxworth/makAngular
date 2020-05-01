export class InvoiceFakeDb
{
    public static invoice = {
        'from'    : {
            'title'  : 'Mak Studio',
            'address': '305 Velasco St. Houston, Texas 77003',
            'phone'  : '713.505.1234',
            'email'  : 'info@makstudio.com',
            'website': 'www.makstudio.us'
        },
        'client'  : {
            'title'  : 'John Doe',
            'address': '9301 Wood Street Philadelphia, PA 19111',
            'phone'  : '+512.552.4557',
            'email'  : 'johndoe@mail.com'
        },
        'number'  : 'P9-0004',
        'date'    : 'Jul 19, 2018',
        'dueDate' : 'Aug 24, 2018',
        'services': [
            {
                'title'    : 'Prototype & Design',
                'detail'   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan, quam sed eleifend imperdiet.',
                'unit'     : 'Hour',
                'unitPrice': '12.00',
                'quantity' : '240',
                'total'    : '2880'
            },
            {
                'title'    : 'Coding',
                'detail'   : 'Vestibulum ligula sem, rutrum et libero id, porta vehicula metus. Cras dapibus neque sit amet laoreet vestibulum.',
                'unit'     : 'Hour',
                'unitPrice': '10.50',
                'quantity' : '350',
                'total'    : '3675'
            },
            {
                'title'    : 'Testing',
                'detail'   : 'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
                'unit'     : 'Hour',
                'unitPrice': '4.00',
                'quantity' : '50',
                'total'    : '200'
            },
            {
                'title'    : 'Documentation & Training',
                'detail'   : 'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
                'unit'     : 'Hour',
                'unitPrice': '6.50',
                'quantity' : '260',
                'total'    : '1690'
            }
        ],
        'project' : {
                'type'     : 'Planter Bench',
                'measurements' : [ 
                    {    
                        'name' : 'Left Side Length',
                        'measurement' : '3 ft'
                    },
                    {    
                        'name' : 'Right Side Length',
                        'measurement' : '5 ft'
                    },
                    {    
                        'name' : 'Twist Length',
                        'measurement' : '3 ft'
                    },
                    {    
                        'name' : 'Planter on Left Side',
                        'measurement' : 'Full'
                    },
                    {    
                        'name' : 'Planter on Right Side',
                        'measurement' : 'None'
                    }
                ]
        },
        'subtotal': '8445',
        'tax'     : '675.60',
        'discount': '120.60',
        'total'   : '9000'
    };
}
