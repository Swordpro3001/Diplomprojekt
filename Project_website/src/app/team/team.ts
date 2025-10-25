import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../directives/scroll-animation.directive';

@Component({
  selector: 'app-team',
  imports: [ScrollAnimationDirective],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team {
  visibleElements: Set<number> = new Set();

  isElementVisible(index: number): boolean {
    return this.visibleElements.has(index);
  }

  onElementVisible(): void {
    this.animateElements();
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
