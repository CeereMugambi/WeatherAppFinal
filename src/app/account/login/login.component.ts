import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.noSpecialCharactersValidator]]
    });
  }

  // Custom validator for no special characters in password
  noSpecialCharactersValidator(control: any) { // Specify the type of 'control'
    if (/[!@#$%^&*()_+[\]{};':"\\|,.<>?]/.test(control.value)) {
      return { specialCharacters: true };
    }
    return null;
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.accountService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // Get return URL from query parameters or default to home page
          const returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.alertService.error(error);
          this.submitting = false;
        },
      });
  }
}
