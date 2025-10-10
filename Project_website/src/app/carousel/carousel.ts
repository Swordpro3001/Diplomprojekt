import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Note: embla-carousel will be installed as an npm dependency. We import it dynamically
// so TypeScript won't fail if the package is not yet installed during editing.
let EmblaCarousel: any;

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss']
})
export class Carousel implements AfterViewInit, OnDestroy {
  slides = [0, 1, 2, 3];

  @ViewChild('viewport', { static: false }) viewport!: ElementRef<HTMLDivElement>;

  private embla: any = null;
  private autoplayTimer?: number;
  selectedIndex = 0;

  async ngAfterViewInit() {
    if (!EmblaCarousel) {
      EmblaCarousel = (await import('embla-carousel')).default;
    }

    if (this.viewport) {
      this.embla = EmblaCarousel(this.viewport.nativeElement, { loop: true, align: 'center' });
      this.embla.on('select', () => this.update());
      this.update();
    }
  }

  ngOnDestroy(): void {
    if (this.embla) this.embla.destroy();
  }

  private update() {
    if (!this.embla) return;
    try {
      this.selectedIndex = this.embla.selectedScrollSnap();
    } catch (e) {
      // ignore
    }
  }

  prev() {
    this.embla?.scrollPrev();
  }

  next() {
    this.embla?.scrollNext();
  }

  goTo(index: number) {
    this.embla?.scrollTo(index);
  }
}
