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

  constructor() { 
    effect(() => {
      const translation  = this.ngxGlagolizeService.get(this.key());
      if(translation){
        
        if (typeof translation ===  'string') {
          this.elementRef.nativeElement.innerHTML = translation;
        }else{
          this.elementRef.nativeElement.innerHTML = this.plural() ? translation.other : translation.one;
        }
       
      }
      
    });
  }

}
