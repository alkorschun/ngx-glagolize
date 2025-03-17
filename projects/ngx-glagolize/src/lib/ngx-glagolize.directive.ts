import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { NgxGlagolizeService } from './ngx-glagolize.service';

@Directive({
  selector: '[ngxGlagolize]'
})
export class NgxGlagolizeDirective {

  private ngxGlagolizeService = inject(NgxGlagolizeService);
  private elementRef = inject(ElementRef);
  key = input.required<string>();
  plural = input<boolean>();
  placeholder = input<{ [key: string]: string}>();

  constructor() { 
    effect(() => {
      const translation  = this.ngxGlagolizeService.get(this.key());
      if(translation){
        
        let translationString = '';
        if (typeof translation ===  'string') {
          translationString = translation;
        }else{
          translationString = this.plural() ? translation.other : translation.one;
        }

        if(this.placeholder()){
          for (const key in this.placeholder()) {
            translationString = translationString.replaceAll(`{{${key}}}`, this.placeholder()![key]);
          }
        }
       
        this.elementRef.nativeElement.innerHTML = translationString;
      }
      
    });
  }

}
