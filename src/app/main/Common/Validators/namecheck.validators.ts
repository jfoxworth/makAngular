import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NameCheckValidators {

  static cannotContainSpecialChars( control:AbstractControl) : ValidationErrors | null
  {
    if ((control.value as string).match(/[$?#^&@,'!*.<>:;()\/]/g)!=null ){
      return { cannotContainSpecialChars:true }
    }
  }

  static cannotContainSomeSpecialChars( control:AbstractControl) : ValidationErrors | null
  {
    if ((control.value as string).match(/[$?#^&@'!*<>:;()\/]/g)!=null ){
      return { cannotContainSomeSpecialChars:true }
    }
  }


}