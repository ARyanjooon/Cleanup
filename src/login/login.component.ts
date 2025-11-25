import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() switchToSignup = new EventEmitter<void>();
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login Form Submitted!', this.loginForm.value);
      // Here you would typically call an authentication service
      this.onClose(); // Close modal on successful submission
    }
  }

  onSwitchToSignup(): void {
    this.switchToSignup.emit();
  }
}
