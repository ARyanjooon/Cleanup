import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, SignupComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Community-waste-reporting-app';
  isMenuOpen = false;
  isSignUpVisible = false;
  isLoginVisible = false;
  showNavLinks = true;

  constructor(private viewportScroller: ViewportScroller, private router: Router) {
    // Hide navigation links on complain page
    this.router.events.subscribe(() => {
      this.showNavLinks = this.router.url !== '/complain';
    });
  }

  navLinks = [
    { path: '#about', label: 'About' },
    { path: '#activity', label: 'Activity' },
    { path: '#contact', label: 'Contact' },
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSignUp(): void {
    this.isSignUpVisible = !this.isSignUpVisible;
    if (this.isSignUpVisible) {
      this.isLoginVisible = false;
    }
  }

  toggleLogin(): void {
    this.isLoginVisible = !this.isLoginVisible;
    if (this.isLoginVisible) {
      this.isSignUpVisible = false;
    }
  }

  switchToLogin(): void {
    this.isSignUpVisible = false;
    this.isLoginVisible = true;
  }

  switchToSignup(): void {
    this.isLoginVisible = false;
    this.isSignUpVisible = true;
  }

  scrollToSection(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
    this.isMenuOpen = false;
  }
}
