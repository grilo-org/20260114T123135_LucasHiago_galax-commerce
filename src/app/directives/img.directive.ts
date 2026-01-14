import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img',
  standalone: true
})
export class ImgDirective {

  private defaultImage = '';

  constructor(private el: ElementRef<HTMLImageElement>) { 
    const supports = 'loading' in HTMLImageElement.prototype;
    supports ? this.el.nativeElement.setAttribute('loading', 'lazy') : null;
  }

  @HostListener('error')
  loadDefaultImage() {
    this.el.nativeElement.src = this.defaultImage;
    this.el.nativeElement.classList.add('image-error');
  }

}
