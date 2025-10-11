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
      alt: 'Projektübersicht',
      title: 'Willkommen bei unserem Projekt',
      description: 'Entdecken Sie innovative Lösungen und kreative Ansätze',
      textPosition: 'bottom-center',
      textAlign: 'center'
    },
    {
      image: '/assets/Bild2.png',
      alt: 'Technologie',
      title: 'Moderne Technologien',
      description: 'Wir setzen auf die neuesten Web-Technologien',
      textPosition: 'center-left',
      textAlign: 'left'
    },
    {
      image: '/assets/Bild3.png',
      alt: 'Team',
      title: 'Unser Team',
      description: 'Zusammenarbeit und Innovation im Fokus',
      textPosition: 'top-right',
      textAlign: 'right'
    },
    {
      image: '/assets/Bild4.png',
      alt: 'Vision',
      title: 'Unsere Vision',
      description: 'Die Zukunft der digitalen Welt gestalten',
      textPosition: 'center',
      textAlign: 'center'
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
