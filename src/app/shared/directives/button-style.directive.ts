import { Directive, ElementRef, Input, Renderer2, HostListener, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appButtonStyle]'
})
export class ButtonStyleDirective implements OnChanges {
  @Input() appButtonStyle: 'add' | 'remove' = 'add';
  @Input() active: boolean = false; // هنديله من Angular

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.baseStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyStyle();
  }

  private baseStyle() {
    this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '1rem');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '0.5rem 1.3rem');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
  }

  private applyStyle() {
    if (this.active) {
      // حالة Active
      this.renderer.setStyle(this.el.nativeElement, 'background', '#2a9d8f');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
      return;
    }

    if (this.appButtonStyle === 'add') {
      this.renderer.setStyle(this.el.nativeElement, 'background', '#c7eae4');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#0d7e6b');
    } else if (this.appButtonStyle === 'remove') {
      this.renderer.setStyle(this.el.nativeElement, 'background', '#ffefde');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#FF9800');
    }
  }

  // Hover effects
  @HostListener('mouseenter') onMouseEnter() {
    if (this.active) return; // لو Active منغيرش الهوفر

    if (this.appButtonStyle === 'add') {
      this.renderer.setStyle(this.el.nativeElement, 'background', '#ddf3f0');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#31ad98');
      this.renderer.setStyle(this.el.nativeElement, 'boxShadow', '0px 17px 16px -9px #31ad9845');
    } else if (this.appButtonStyle === 'remove') {
      this.renderer.setStyle(this.el.nativeElement, 'background', '#fff1e3');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#FF9800');
      this.renderer.setStyle(this.el.nativeElement, 'boxShadow', '0px 17px 16px -9px #ff98003b');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'boxShadow');
    this.applyStyle();
  }
}
