

// Standard Angular Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { makDesign } from '../../../models/makDesign';

// Services
import { DesignsService } from '../../../services/designs.service';


@Component({
  selector: 'mak-design-price',
  templateUrl: './design-price.component.html',
  styleUrls: ['./design-price.component.scss']
})
export class DesignPriceComponent implements OnInit {

	@Input('currentDesign') currentDesign:makDesign;
  @Output() updateDesign = new EventEmitter();
  pA=[];

  constructor( private DesignsService : DesignsService) { }

  ngOnInit(): void {
  }

  saveInitialPriceChange( event )
	{
		this.updateDesign.emit( { ...this.currentDesign, 'initialPrice' : event.target.value } );
  }

  savePriceStringChange( priceString )
	{
		this.updateDesign.emit( { ...this.currentDesign, 'priceString' : priceString } );
  }


  savePriceArrayChange( priceArray )
	{
		this.updateDesign.emit( { ...this.currentDesign, 'priceArray' : priceArray } );
  }

  savePriceFormula( formula )
	{
		this.updateDesign.emit( { ...this.currentDesign, 'priceFormula' : formula } );
  }


	/**
	 * Check the formula entered by the user for price
	 */
	checkPriceFormula(event) {

		let priceArray=[];
		var re3 = /[\+\-\*\/]/g;
		let stringToSplit = event.target.value.replace(/\+/g, '&&+&&');
		stringToSplit = stringToSplit.replace(/\-/g, '&&-&&');
		stringToSplit = stringToSplit.replace(/\*/g, '&&*&&');
		stringToSplit = stringToSplit.replace(/\//g, '&&/&&');
		stringToSplit = stringToSplit.replace(/\(/g, '&&(&&');
		stringToSplit = stringToSplit.replace(/\)/g, '&&)&&');
		stringToSplit = stringToSplit.replace(/^\s+/, '');
		stringToSplit = stringToSplit.replace(/\s+$/, '');
		stringToSplit = stringToSplit.replace(/&&\s+&&/g, '&&');
		stringToSplit = stringToSplit.replace(/&&&&/g, '&&');
		stringToSplit = stringToSplit.replace(/^&+/, '');
		stringToSplit = stringToSplit.replace(/&+$/, '');
		let splitString = stringToSplit.split('&&');

    splitString=splitString.map(ss=>ss.replace(/^\s+/, ''))
    splitString=splitString.map(ss=>ss.replace(/\s+$/, ''))

    splitString.forEach((ss)=>{

      let type='';

      // Test for parameter
      this.currentDesign.parameterMenus.forEach(menu => {
        let thisIndex=menu.parameters.findIndex((mI) =>  { return ss==mI['shapediver']});
        thisIndex !=-1 ? type = 'parameter' : '';
      });

      // Test for number
      ( ( /^\d.+$/.test(ss) ) && ( !( /[a-zA-Z]+$/.test(ss) ) ) ) ? type = 'number' : '';

      // Test for operator
      ( ss.match(re3) &&  !/^\d.+$/.test(ss) && !( /[a-zA-Z]+$/.test(ss) ) ) ? type = 'operator' : '';

      // Test for parenthesis
      ( (ss == "(") || ( ss == ")" ) ) ? type='parenthesis':'';

      type == '' ? type = 'invalid':'';

      priceArray.push({ 'status' : type, 'text' : ss})


    })

    if ( priceArray.findIndex(pI=>{return pI.status=='invalid'}) < 0 )
    {
      this.savePriceArrayChange( priceArray );
      this.savePriceStringChange( event.target.value );
      this.setPrice( priceArray );
    }

	}



	/*
	*
	* Set the price
	*
	*/
	setPrice( priceArray ) {

    this.pA=priceArray;
    let priceString = '';
    priceArray.forEach(pI=>{
      if ( pI.status == 'parameter' )
      {
        this.currentDesign.parameterMenus.forEach(menu => {
          menu.parameters.findIndex((mI) =>  { return mI['shapediver']==pI['text']} )!=-1 ?
            priceString = priceString+menu.parameters[menu.parameters.findIndex((mI) =>  { return mI['shapediver']==pI['text']})]['value'] : '';
        })
      }else
      {
        priceString = priceString + pI.text;
      }
    });

  }


}
