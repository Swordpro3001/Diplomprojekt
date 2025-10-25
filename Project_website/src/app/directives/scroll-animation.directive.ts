import { Directive, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective implements AfterViewInit, OnDestroy {
  @Input() threshold: number = 0.2;
  @Input() rootMargin: string = '0px';
  @Input() animateOnce: boolean = true;
  
  @Output() elementVisible = new EventEmitter<void>();
  @Output() elementHidden = new EventEmitter<void>();

  private observer?: IntersectionObserver;
  private hasAnimated = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!this.animateOnce || !this.hasAnimated) {
              this.hasAnimated = true;
              this.elementVisible.emit();
            }
          } else {
            if (!this.animateOnce) {
              this.elementHidden.emit();
            }
          }
        });
      },
      {
        threshold: this.threshold,
        rootMargin: this.rootMargin
      }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
