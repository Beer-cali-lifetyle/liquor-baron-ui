import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppBase } from '../../../../app-base.component';
import { ContextService } from '../../../core/services/context.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
  standalone: true,
  imports: [
    SharedModule, CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class PersonalDetailsComponent extends AppBase implements OnInit {
  title: string = '';
  constructor(private fb:FormBuilder,
    private contextService: ContextService
  ) { super(); }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      changeEmail: [false],
      changePassword: [false],
      newEmail: [''],
      newPassword: [''],
      confirmPassword: [''],
      currentPassword: [''],
    }, { validators: this.passwordMatchValidator });
  }

  updateTitle() {
    const changeEmail = this.form.get('changeEmail')?.value;
    const changePassword = this.form.get('changePassword')?.value;

    if (changeEmail && changePassword) {
      this.title = 'Change Email and Password';
    } else if (changeEmail) {
      this.title = 'Change Email';
    } else if (changePassword) {
      this.title = 'Change Password';
    } else {
      this.title = '';
    }

    // Update field validators based on checkbox selections
    this.toggleEmail();
    this.togglePassword();
  }

  toggleEmail() {
    const newEmail = this.form.get('newEmail');
    const currentPassword = this.form.get('currentPassword');
    if (this.form.get('changeEmail')?.value) {
      newEmail?.setValidators([Validators.required, Validators.email]);
      currentPassword?.setValidators([Validators.required]);
    } else {
      newEmail?.clearValidators();
      if (!this.form.get('newPassword')?.value) {
        currentPassword?.clearValidators(); }
    }
    newEmail?.updateValueAndValidity();
    currentPassword?.updateValueAndValidity();
  }

  togglePassword() {
    const newPassword = this.form.get('newPassword');
    const confirmPassword = this.form.get('confirmPassword');
    const currentPassword = this.form.get('currentPassword');
    if (this.form.get('changePassword')?.value) {
      newPassword?.setValidators([Validators.required]);
      confirmPassword?.setValidators([Validators.required]);
      currentPassword?.setValidators([Validators.required]);
    } else {
      newPassword?.clearValidators();
      confirmPassword?.clearValidators();
      if (!this.form.get('newEmail')?.value) {
      currentPassword?.clearValidators(); }
    }
    newPassword?.updateValueAndValidity();
    confirmPassword?.updateValueAndValidity();
    currentPassword?.updateValueAndValidity();
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if(this.form.invalid) {
      this.validateForm();
    } else {

    }
  }

}