import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Note: embla-carousel will be installed as an npm dependency. We import it dynamically
// so TypeScript won't fail if the package is not yet installed during editing.
let EmblaCarousel: any;

interface Slide {
  image: string;
  alt: string;
  title: string;
  description: string;
  textPosition: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  textAlign: 'left' | 'center' | 'right';
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.scss']
})
export class Carousel implements AfterViewInit, OnDestroy {
  slides: Slide[] = [
      {
        image: '/assets/Bild1.png',
        alt: 'Project Overview',
        title: 'Welcome to our project AI4Ads!',
        description: 'AI4Ads is a research project analyzing urban traffic data to detect and correct inconsistencies using machine learning. It combines scalable DevOps deployment, optimized data processing, and intelligent anomaly handling to support media planning and mobility insights.',
        textPosition: 'bottom-center',
        textAlign: 'center'
      },
      {
        image: '/assets/Bild2.png',
        alt: 'Frequency Landscape',
        title: 'Frequency Landscape',
        description: 'Our curated dataset merges backups and external sources, reduced to essential features for optimal machine learning performance and enhanced consistency. This enables reliable detection and correction of anomalies in traffic frequency across segments.',
        textPosition: 'center-left',
        textAlign: 'left'
      },
      {
        image: '/assets/Bild3.png',
        alt: 'Our partner',
        title: 'Our partner',
        description: 'We work together with R+C Plakatforschung, a leading company in outdoor advertising solutions. Our AI identifies inconsistencies in traffic data, factoring in POIs like hospitals, malls, and parking areas to improve detection accuracy.<br> <a href="https://outdoorserver.at/" target="_blank" rel="noopener">Learn more</a>',
        textPosition: 'top-right',
        textAlign: 'right'
      }
    ];

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
