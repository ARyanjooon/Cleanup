import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  howItWorksSteps = [
    { icon: '1', title: 'Snap a Photo', description: 'Take a picture of the waste.' },
    { icon: '2', title: 'Add Details', description: 'Provide the location and a brief description.' },
    { icon: '3', title: 'Submit Report', description: 'Your report is sent to the local authorities.' },
  ];

  whyItMattersBenefits = [
    { title: 'Cleaner Spaces', description: 'Your reports directly lead to cleaner parks, streets, and public areas for everyone to enjoy.' },
    { title: 'Protects Wildlife', description: 'Proper waste disposal prevents pollution that can harm local animals and ecosystems.' },
    { title: 'Builds Community', description: 'Working together to keep our neighborhood clean fosters a stronger sense of community pride.' },
  ];
}
