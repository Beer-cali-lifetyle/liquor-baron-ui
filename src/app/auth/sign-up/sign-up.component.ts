import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { CommonModule } from '@angular/common';
import { AppBase } from '../../../app-base.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import { ContextService } from '../../core/services/context.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignUpComponent extends AppBase implements OnInit {

  constructor(private fb: FormBuilder, private ApiService: ApiService, private router: Router, private context: ContextService) { super(); }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'password_confirmation') });
  }

 async onSignup() {
    if (this.form.valid) {
      try {
        const res = await this.ApiService.SignUp(this.form.value);
        this.context.user.set(res?.user);
          localStorage.setItem('access_token', res?.access_token);
          localStorage.setItem('user_id', res?.user?.id);
          localStorage.setItem('user', JSON.stringify(res?.user));
        this.router.navigate(['/home'])
      } catch (error) {
        console.error('Sign-in error:', error);
      }
    } else {
      this.validateForm();
    }
  }

  mustMatch(password: string, password_confirmation: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[password_confirmation];

      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

}
