import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appStyledInput]' 
})
export class StyledInputDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setBaseStyle();
  }

  private setBaseStyle() {
    this.renderer.setStyle(this.el.nativeElement, 'padding', '0.5rem 1rem');
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #ccc');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '6px');
    this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease-in-out');
  }

  @HostListener('focus') onFocus() {
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', '#2a9d8f');
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', '0 0 5px rgba(42, 157, 143, 0.6)');
  }

  @HostListener('blur') onBlur() {
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', '#ccc');
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', 'none');
  }
}
