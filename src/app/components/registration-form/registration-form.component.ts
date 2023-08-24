import { Component,Input,OnInit,EventEmitter, Output, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { AbstractControl} from '@angular/forms';
import { AccountService } from 'src/app/services';
import { AlertService } from 'src/app/services';
import { MustMatch } from 'src/app/helpers';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass']
})
export class RegistrationFormComponent implements OnInit {

@Input() isAdmin: boolean = false;
@Input() isUpdate: boolean = false;
@Output() changeRouteEvent = new EventEmitter<void>();
@Output() updateSuccess = new EventEmitter<void>();



  account = this.accountService.accountValue!;
  form!: FormGroup;
  submitting = false;
  submitted = false;
  hidePassword = true; 
  hideConfirmPassword=true;
  deleting = false;


  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
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
      // acceptTerms: [false, Validators.requiredTrue],
      acceptTerms: [(this.isAdmin && this.isUpdate) ? true : false, [Validators.required, Validators.requiredTrue]],

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  
    //Used for the edit and profile update logic
    if (this.isUpdate) {
      this.form.patchValue({
        title: this.account.title,
        firstName: this.account.firstName,
        lastName: this.account.lastName,
        email: this.account.email,

      });
    }
  
    if (this.isAdmin && !this.isUpdate) {
      this.form.addControl('role', new FormControl('', Validators.required));
    }

  }

  

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    console.log(this.form.value)
    console.log('isAdmin:', this.isAdmin);
    console.log('isUpdate:', this.isUpdate);
   
      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.submitting = true;
      if(this.isUpdate){
      this.accountService.update(this.account.id!, this.form.value)
      this.submitted=true;
      this.updateSuccess.emit();
    }
      else{
      this.accountService.register(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Registration successful',{ 
                    keepAfterRouteChange: true,
                });
                this.submitted = true;
                  this.router.navigate(['../login'], { relativeTo: this.route });
                  
                  this.changeRouteEvent.emit();   
              

              },
              error: error => {
                  this.alertService.error(error);
                  this.submitting = false;
              }
          });   
        }  
  }

    onDelete() {
      if (confirm('Are you sure?')) {
          this.deleting = true;
          this.accountService.delete(this.account.id!)
              .pipe(first())
              .subscribe(() => {
                  this.alertService.success('Account deleted successfully', { keepAfterRouteChange: true });
              });
}
    }


  
}
