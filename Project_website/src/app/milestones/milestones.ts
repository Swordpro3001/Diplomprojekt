import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Milestone {
  id: number;
  title: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-milestones',
  imports: [CommonModule],
  templateUrl: './milestones.html',
  styleUrl: './milestones.scss'
})
export class Milestones implements AfterViewInit, OnDestroy {
  @ViewChild('timelineContainer', { static: false }) timelineContainer!: ElementRef;

  // Anzahl der abgeschlossenen Meilensteine (z.B. die ersten 2 sind fertig)
  completedMilestonesCount: number = 2;

  // Aktueller animierter Fortschritt (startet bei 0)
  animatedProgress: number = 0;

  // Tracking für sichtbare Milestones (für gestaffelte Animation)
  visibleMilestones: Set<number> = new Set();

  // Ziel-Fortschritt in Prozent
  get progressPercentage(): number {
    return (this.completedMilestonesCount / this.milestones.length) * 100;
  }

  // Für die Animation sichtbar
  get displayProgress(): number {
    return this.animatedProgress;
  }

  // Prüft, ob ein Meilenstein abgeschlossen ist
  isMilestoneCompleted(milestoneId: number): boolean {
    return milestoneId <= this.completedMilestonesCount;
  }

  // Prüft, ob ein Meilenstein animiert werden soll
  isMilestoneVisible(milestoneId: number): boolean {
    return this.visibleMilestones.has(milestoneId);
  }

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    // Intersection Observer erstellen
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animation starten wenn Section sichtbar ist
            this.animateProgress();
            this.animateMilestones();
          } else {
            // Animation zurücksetzen wenn Section nicht sichtbar ist
            this.resetAnimation();
          }
        });
      },
      {
        threshold: 0.2, // Triggert wenn 20% der Section sichtbar ist
        rootMargin: '0px'
      }
    );

    // Timeline beobachten
    if (this.timelineContainer) {
      this.observer.observe(this.timelineContainer.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private animateProgress(): void {
    const targetProgress = this.progressPercentage;
    const duration = 1500; // 1.5 Sekunden
    const startTime = performance.now();
    const startProgress = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing-Funktion (ease-out)
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      this.animatedProgress = startProgress + (targetProgress - startProgress) * easeOutQuad;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.animatedProgress = targetProgress;
      }
    };

    requestAnimationFrame(animate);
  }

  private animateMilestones(): void {
    // Milestones nacheinander mit Verzögerung erscheinen lassen
    this.milestones.forEach((milestone, index) => {
      setTimeout(() => {
        this.visibleMilestones.add(milestone.id);
      }, index * 100); // 100ms Verzögerung zwischen jedem Milestone
    });
  }

  private resetAnimation(): void {
    // Animation zurücksetzen
    this.animatedProgress = 0;
    this.visibleMilestones.clear();
  }

 milestones: Milestone[] = [
  {
    id: 1,
    title: 'Core Structure',
    date: 'September 22, 2025',
    description: 'The core structure and containerization have been successfully completed.'
  },
  {
    id: 2,
    title: 'Data Cleaning',
    date: 'October 10, 2025',
    description: 'Data cleaning and preparation are complete. The dataset is now consistent, reliable, and ready for analysis.'
  },
  {
    id: 3,
    title: 'Feasibility Study',
    date: 'October 17, 2025',
    description: 'The feasibility study and technology evaluation have been finalized. The most effective tools and frameworks were selected for implementation.'
  },
  {
    id: 4,
    title: 'Data Transformation',
    date: 'October 24, 2025',
    description: 'Data transformation and the first implementation stage have been completed. All raw data was standardized for integration into the system.'
  },
  {
    id: 5,
    title: 'CI/CD Pipeline',
    date: 'November 7, 2025',
    description: 'The CI/CD pipeline and staging environment have been set up. Automated testing and deployment are now part of the workflow.'
  },
  {
    id: 6,
    title: 'Feature Selection',
    date: 'November 14, 2025',
    description: 'Core features have been selected and implemented. The system now covers all essential functionality for productive use.'
  },
  {
    id: 7,
    title: 'Monitoring',
    date: 'November 21, 2025',
    description: 'Monitoring, security, and production setup have been completed. The system can now track performance and detect anomalies in real time.'
  },
  {
    id: 8,
    title: 'Models Completed',
    date: 'January 23, 2026',
    description: 'The AI models have been trained and validated. They are ready for deployment in the production environment.'
  },
  {
    id: 9,
    title: 'Documentation',
    date: 'February 15, 2026',
    description: 'Documentation of implementation and usage has been completed. It provides clear guidance for developers and users alike.'
  },
  {
    id: 10,
    title: 'Final Version',
    date: 'April 7, 2026',
    description: 'The final application has been presented and approved. The project is now officially completed and ready for operation.'
  }
];

}
