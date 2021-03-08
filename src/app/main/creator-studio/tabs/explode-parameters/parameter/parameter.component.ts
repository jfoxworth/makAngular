

// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { makDesign } from '../../../../models/makDesign';

// Form Items
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NameCheckValidators } from 'src/app/main/Common/Validators/namecheck.validators';


// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';

// RXJS
import { finalize } from 'rxjs/operators';





@Component({
  selector: 'mak-explode-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
  @Input('parameter') parameter;
  @Input('pindex') pindex;
  @Output() updateDesign = new EventEmitter();

  
  explodeParam  : any;
  buttonOption  : any;
  imageOption   : any;

  paramform     : FormGroup;
  imageArray    : string[];
  text          : '';

  get label(){
    return this.paramform.get('pLabel');
  }

  get value(){
    return this.paramform.get('pValue');
  }



  constructor( private afStorage : AngularFireStorage ) { 
    this.imageArray = [];
  }

  ngOnInit(): void {

    
    this.buttonOption = { 
      'label' : 'label',
      'value' : 'value',
      'id'    : '',
      'type'  : '',
      'affIm' : false,
      'active':''
    }
    this.imageOption = {
      'label' : 'label',
      'value' : 'value',
      'id'    : '',
      'active': ''
    }


    this.paramform = new FormGroup({
      'type' : new FormControl(this.parameter.type, [Validators.required]),
  
      'title' : new FormControl(this.parameter.title, [Validators.required, 
                                                       Validators.minLength(3),
                                                       NameCheckValidators.cannotContainSpecialChars ]),

     'subtitle' : new FormControl(this.parameter.subtitle, [Validators.required, 
                                                            Validators.minLength(3),
                                                            NameCheckValidators.cannotContainSomeSpecialChars]),

      'pLabel' : new FormControl(this.parameter.type, [Validators.required]),
  
      'affIm' : new FormControl(this.parameter.affIm, [Validators.required]),
    });

    // Grab the existing array images
    this.currentDesign.explodeMenus.forEach((menu, mi)=>{
      var tempArr : any[] = menu['imageOptions'];
      tempArr.forEach(iv=>{
        var url = this.afStorage.ref( iv['value'] )
        .getDownloadURL()
        .subscribe(url => {
          this.imageArray[iv['value']] = url;
        })
      })
    })
}



  generateRandom(){
    this.text = '';
    let possible = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		for (let i = 0; i < 12; i++) {
			this.text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return this.text;
  }

  addButtonOption( index:number )
  {
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    let tempButton = this.buttonOption;
    tempButton['id'] = this.generateRandom();
    tempButton['type'] = 'button';
    temp[index]['options'].push(tempButton);
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }

  addImageOption( index:number )
  {
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    let tempButton = this.buttonOption;
    tempButton['id'] = this.generateRandom();
    tempButton['type'] = 'image';
    temp[index]['imageOptions'].push(tempButton);
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }

  deleteImageSelection( index:number )
  {
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp[index]['imageOptions'].splice(index,1);
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }

  deleteSelection( index:number )
  {
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp.splice(index,1);
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }

	saveTypeChange( event, index:number )
	{
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp[index]['type']=event.value;
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }


	saveAffImChange( event, index:number )
	{
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp[index]['affIm']=event.value;
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }
  
  
  saveTitleChange( event  )
	{
    event.stopPropagation();
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp[this.pindex]['title']=(<HTMLInputElement>event.target).value;
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }

	saveSubtitleChange( event  )
	{
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp[this.pindex]['subtitle']=(<HTMLInputElement>event.target).value;
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }

  saveOptionLabelChange( event:FocusEvent, index:number, type:string )
	{
    if (this.paramform.controls.pLabel.status=="VALID")
    {
      let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
      if (this.currentDesign.explodeMenus[this.pindex]['type']=='button') 
      {
        temp[this.pindex]['options'][index]['label']=(<HTMLInputElement>event.target).value;
        this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
      }
      if (this.currentDesign.explodeMenus[this.pindex]['type']=='image') 
      {
        temp[this.pindex]['imageOptions'][index]['label']=(<HTMLInputElement>event.target).value;
        this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
      }
    }
  }

	saveOptionValueChange( event:FocusEvent, index:number, type:string )
	{
    if (this.paramform.controls.pLabel.status=="VALID")
    {
      let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
      if (this.currentDesign.explodeMenus[this.pindex]['type']=='button') 
      {
        temp[this.pindex]['options'][index]['value']=(<HTMLInputElement>event.target).value;
        this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
      }
      if (this.currentDesign.explodeMenus[this.pindex]['type']=='image') 
      {
        temp[this.pindex]['imageOptions'][index]['value']=(<HTMLInputElement>event.target).value;
        this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
      }
    }
  }

  deleteOption( pindex:number, index:number )
  {
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp[pindex]['options'].splice(index,1);
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }

  deleteImageOption( pindex:number, index:number )
  {
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp[pindex]['imageOptions'].splice(index,1);
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );
  }





	/*
	*
	* When an image is uploaded to be used as a selection
	*
  */
	onButtonImageUpload({event, index, newindex}) {

    console.log('For the image button upload, the pindex is '+this.pindex+'-'+newindex+' and the index is '+index);

		// Grab the image
		const file = event.target.files[0];
		var imageType = file.type.replace('image/','');


		let text = "";
		let possible = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		for (let i = 0; i < 6; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
  	}
    var path = '/studio/buttons/'+this.currentDesign.id+'-'+text+'.'+imageType;
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp[this.pindex]['imageOptions'][index]['value']=path;
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );

		// Get URL
		const ref = this.afStorage.ref(path);

		// Upload file and subscribe to results
		const task = this.afStorage.upload(path, event.target.files[0]);
		task.snapshotChanges().pipe(
          finalize(() => {
            this.imageArray[path] = ref.getDownloadURL();
          }
    	 ))
    	.subscribe()

  }




}
