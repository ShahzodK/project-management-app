import { AfterViewChecked, Directive, ElementRef, Input } from '@angular/core';
import { EColors } from '../consts';

@Directive({
  selector: '[appInputBorderColor]',
})
export class InputBorderColorDirective implements AfterViewChecked {
  @Input('appInputBorderColor') isError?: boolean;

  constructor(private el: ElementRef) { }

  ngAfterViewChecked() {
    this.el.nativeElement.style.borderColor = this.setBorderColor(this.isError);
    this.el.nativeElement.style.marginBottom = this.setMarginBottom(this.isError);
  }

  public setBorderColor(isError?: boolean): EColors {
    if (isError) {
      return EColors.red;
    }

    return EColors.violet;
  }

  public setMarginBottom(isError?: boolean): string {
    if (isError) {
      return '0';
    }

    return '12px';
  }

}
