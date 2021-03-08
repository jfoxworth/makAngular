import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { makDesign } from '../../../../models/makDesign';

// Firestore Items
import { AngularFireStorage } from '@angular/fire/storage';

// RXJS
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'mak-design-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss']
})
export class ImageSelectComponent implements OnInit {

  @Input('currentDesign') currentDesign:makDesign;
  @Output() updateDesign = new EventEmitter();
  imageArray           : string[];
  imageMainArray       : string[];
  imageSelectionArray  : string[];
  currentBGI           : string;

  constructor( private afStorage : AngularFireStorage ) {
    this.imageArray          = [];
    this.imageMainArray      = [];
    this.imageSelectionArray = [];
    this.currentBGI          = '';
  }



  ngOnInit(): void {

    this.setImages();

  }

  ngOnChanges(changes:SimpleChanges){
    this.setImages();
  }

  setImages(){
    // Grab the existing array images for the buttons
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

    // Grab the existing array images for the main image options
    this.currentDesign.imageOptions.forEach((io, ii)=>{
        var url = this.afStorage.ref( io )
        .getDownloadURL()
        .subscribe(url => {
          this.imageMainArray[io] = url;
      })
    });

    // Grab the existing array images for the set images
    this.currentDesign.imageSelection.forEach((io, ii)=>{
      var url = this.afStorage.ref( io.path )
      .getDownloadURL()
      .subscribe(url => {
        this.imageSelectionArray[io.id] = url;
      })
    });

/*
    console.log(this.currentDesign.imageOptions);
    console.log(this.currentDesign.imageSelection);
    console.log(this.imageSelectionArray);
    console.log(this.imageMainArray);
    console.log(this.imageMainArray[this.currentDesign.defaultImage.path]);
    console.log(this.currentDesign.defaultImage.path);
    this.currentBGI = this.getBGString(this.currentDesign);
*/

  }

  
  // Setting a button to be active for the purposes of selecting the proper image
  setButtonValue(i, j, value){
    let temp = JSON.parse(JSON.stringify(this.currentDesign.explodeMenus));
    temp[i]['active'] = value;
    this.currentBGI = this.getBGString({'explodeMenus':temp});
    this.updateDesign.emit( {...this.currentDesign, explodeMenus:temp  } );  
  }




	/*
	*
	* When an image is uploaded to be used as a selection
	*
  */
	onMainImageUpload({event}) {

		// Grab the image
		const file = event.target.files[0];
		var imageType = file.type.replace('image/','');


		let text = "";
		let possible = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		for (let i = 0; i < 6; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
  	}
    var path = '/studio/designimages/'+this.currentDesign.id+'-'+text+'.'+imageType;
    let temp = JSON.parse(JSON.stringify(this.currentDesign));
    temp['imageOptions'].push(path);
    this.updateDesign.emit( {...temp  } );

		// Get URL
    const ref = this.afStorage.ref(path);

		// Upload file and subscribe to results
		const task = this.afStorage.upload(path, event.target.files[0]);
		task.snapshotChanges().pipe(
          finalize(() => {
            this.imageMainArray[path] = ref.getDownloadURL();
          }
    	 ))
    	.subscribe()

  }




  sortString(str){
    var arr = str.split('');
    var tmp;
    for(var i = 0; i < arr.length; i++){
      for(var j = i + 1; j < arr.length; j++){
        /* if ASCII code greater then swap the elements position*/
        if(arr[i] > arr[j]){
          tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
        }
      }
    }
    return arr.join('');
  }



  /*
  *
  * Established an image as the default one
  * 
  */
  setAsDefault(path, currentDownload){
    let temp = JSON.parse(JSON.stringify(this.currentDesign));
    temp.defaultImage={"path":path, "download":currentDownload};
    this.updateDesign.emit( {...temp  } );  
    this.currentBGI = this.getBGString(this.currentDesign);

  }


  /*
  *
  * Set an image for the current configuration
  * 
  */
  setImage(thisImage){
    let temp = JSON.parse(JSON.stringify(this.currentDesign));
    let flag=false;
    this.currentDesign.imageSelection.forEach(is=>{
      if ( is.path==thisImage )
      {
        is['id'] = this.getBGString({'explodeMenus':temp.explodeMenus});
        flag=true;
      }
    });
    if (!flag)
    {
      temp.imageSelection.push({'id':this.getBGString({'explodeMenus':temp.explodeMenus}), 'path':thisImage});
    }
    this.updateDesign.emit( {...temp  } );  
    this.currentBGI = this.getBGString(temp);

  }


  getBGString(obj){
    let ts='';
    obj.explodeMenus.forEach((menu, mi)=>{
      ts=menu.affIm ? ts+menu.active.replace(/[^\w\s]/gi, '') : ts;
    });
    return this.sortString(ts);

  }

}
