import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { InfoComponent } from './info/info.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collecation',
  imports: [NgOptimizedImage, ContactComponent, InfoComponent, RouterLink],
  templateUrl: './collecation.component.html',
  styleUrl: './collecation.component.scss'
})
export class CollecationComponent implements AfterViewInit {
  @ViewChildren('animateItem') animateItems!: QueryList<ElementRef>;

  testimonials = [
    { quote: `This app makes it so easy to report illegal dumping I see on my morning walk. I've already noticed a difference in my local park!`, author: 'Sarah J.' },
    { quote: `A fantastic tool for community action. It feels good to be part of the solution.`, author: 'Mark T.' },
    { quote: `Finally, a simple way to notify the council about overflowing bins. The response time has been impressive.`, author: 'David L.' },
    { quote: `Our neighborhood feels so much cleaner. It's amazing what we can do when we work together. Highly recommend this app!`, author: 'Emily R.' }
  ];

  scrollingTestimonials = [...this.testimonials, ...this.testimonials]; // Duplicate for seamless scroll effect

  recentActivity = [
    { src: 'https://th.bing.com/th/id/OIP.jP0QwZHkXx1txozA4qBTZQHaFc?w=289&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', alt: 'Public park cleaned after waste removal' },
    { src: 'https://th.bing.com/th/id/OIP.3irTyYGCkhV8Gxc54dPRrgHaE8?w=256&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', alt: 'Street cleared of illegal dumping' },
    { src: 'https://th.bing.com/th/id/OIP.D5uPAvr4-7_Eh_UANjQB8wHaFj?w=235&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', alt: 'Overflowing bin emptied and area tidied' },
    { src: 'https://th.bing.com/th/id/OIP.jSocnWsVvhfHylJY7pPfrAHaE8?w=306&h=204&c=7&r=0&o=7&cb=12&dpr=1.7&rm=3', alt: 'Community effort in public waste collection' }
  ];

  howItWorksSteps = [
    { step: 1, title: 'Snap a Photo', description: 'Spot waste? Snap a clear photo to provide evidence of the issue.' },
    { step: 2, title: 'Add Details', description: 'Set the location and add a brief description to help us identify the problem.' },
    { step: 3, title: 'Submit Report', description: 'Send it off! We notify local authorities to take immediate action.' }
  ];

  benefits = [
    { title: 'Cleaner Spaces', description: 'Your reports directly lead to cleaner parks, streets, and public areas for everyone to enjoy.' },
    { title: 'Protects Wildlife', description: 'Proper waste disposal prevents pollution that can harm local animals and ecosystems.' },
    { title: 'Builds Community', description: 'Working together to keep our neighborhood clean fosters a stronger sense of community pride.' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('animate-init'); // Clean up
          }
        });
      }, { threshold: 0.1 });

      this.animateItems.forEach(item => {
        // Add the initial state class only when we are ready to observe
        item.nativeElement.classList.add('animate-init');
        observer.observe(item.nativeElement);
      });
    }
  }
}
