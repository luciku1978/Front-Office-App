import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Register } from '../../models/register';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;

  loading = false;
  submitted = false;
  hide = true;

  errors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
        firstname: ['',[Validators.required]],
        lastname:['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        passwords: this.formBuilder.group({
          password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(55)]],
          confirmedPassword: ['', [Validators.required]],
        }, {validator: this.passwordConfirming}),
    });
  }

  get form() { return this.signUpForm.controls; }
  get passwords(): any { return this.signUpForm.controls.passwords; }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmedPassword').value) {
        return {invalid: true};
    }
  }

  arePasswordsEqual(): boolean {
    return this.passwords.controls.password.value !== this.passwords.controls.confirmedPassword.value && this.passwords.controls.password.touched && this.passwords.controls.confirmedPassword.touched;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;
    let user: Register = {
      FirstName: this.form.firstname.value,
      LastName: this.form.lastname.value,
      Username: this.form.username.value,
      Password: this.passwords.controls.password.value,
      Email: this.form.email.value,
    };

    this.authService.register(user)
      .subscribe(
        u => {
          this.toastr.success('Account created successfully!', '', {
            positionClass: 'toast-bottom-right',
          });
        },
        error => {

          this.errors = [error];
          this.loading = false;
          this.toastr.error('Account can not be created - username already exists!', '', {
            positionClass: 'toast-bottom-right',
          });
        });
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > 2000){
            break;
          }
        }
        this.router.navigate(['/login']);
  }

}