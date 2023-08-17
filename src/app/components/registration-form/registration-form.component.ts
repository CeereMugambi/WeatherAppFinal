import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AbstractControl} from '@angular/forms';

import { AccountService } from 'src/app/services';
import { AlertService } from 'src/app/services';
import { MustMatch } from 'src/app/helpers';
import { first } from 'rxjs/operators';;

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass']
})
export class RegistrationFormComponent implements OnInit {
  
  form!: FormGroup;
  submitting = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService
  ) { }

  noSpecialChars(control: AbstractControl) {
    const pattern = /^[a-zA-Z0-9]*$/; // Regular expression to allow only alphanumeric characters
    if (!pattern.test(control.value)) {
      return { specialChars: true };
    }
    return null;
  }
  

  ngOnInit() {
      this.form = this.formBuilder.group({
          title: ['', Validators.required],
          firstName: ['', [Validators.required, this.noSpecialChars]],
          lastName: ['', [Validators.required, this.noSpecialChars]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          acceptTerms: [false, Validators.requiredTrue]
      }, {
          validator: MustMatch('password','confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.submitting = true;
      this.accountService.register(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Registration successful',{ 
                    keepAfterRouteChange: true,
                });
                  this.router.navigate(['../login'], { relativeTo: this.route });
                  
              },
              error: error => {
                  this.alertService.error(error);
                  this.submitting = false;
              }
          });
        
          
  }


  
}

