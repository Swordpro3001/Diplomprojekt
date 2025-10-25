import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../directives/scroll-animation.directive';

@Component({
  selector: 'app-about',
  imports: [ScrollAnimationDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  visibleElements: Set<number> = new Set();

  isElementVisible(index: number): boolean {
    return this.visibleElements.has(index);
  }

  onElementVisible(): void {
    this.animateElements();
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
