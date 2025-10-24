import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team implements AfterViewInit, OnDestroy {
  @ViewChild('teamWrapper', { static: false }) teamWrapper!: ElementRef;

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
        threshold: 0.15,
        rootMargin: '0px'
      }
    );

    if (this.teamWrapper) {
      this.observer.observe(this.teamWrapper.nativeElement);
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
    // Header-Section sofort
    setTimeout(() => this.visibleElements.add(0), 0);

    // Team Members nacheinander
    [1, 2, 3, 4].forEach((index) => {
      setTimeout(() => {
        this.visibleElements.add(index);
      }, (index + 1) * 150);
    });

    // Footer-Section am Ende
    setTimeout(() => this.visibleElements.add(5), 900);
  }
}
