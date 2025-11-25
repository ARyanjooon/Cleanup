import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get f() {
    return this.signupForm.controls;
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
      // Here you would typically call an authentication service
      this.onClose(); // Close modal on successful submission
    }
  }

  onSwitchToLogin(): void {
    this.switchToLogin.emit();
  }
}
