import { Component } from '@angular/core';
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
export class Milestones {
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
