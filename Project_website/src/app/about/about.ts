import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements AfterViewInit, OnDestroy {
  @ViewChild('aboutContainer', { static: false }) aboutContainer!: ElementRef;

  visibleElements: Set<number> = new Set();
  private observer?: IntersectionObserver;
  private hasAnimated = false;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.animateElements();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (this.aboutContainer) {
      this.observer.observe(this.aboutContainer.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  isElementVisible(index: number): boolean {
    return this.visibleElements.has(index);
  }

  private animateElements(): void {
    // Title und Description sofort anzeigen
    setTimeout(() => this.visibleElements.add(0), 0);

    // Cards nacheinander mit Verzögerung
    [1, 2, 3, 4].forEach((index) => {
      setTimeout(() => {
        this.visibleElements.add(index);
      }, index * 150); // 150ms Verzögerung zwischen Cards
    });
  }
}
