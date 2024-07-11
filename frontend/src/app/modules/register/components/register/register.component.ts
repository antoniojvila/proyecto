import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../shared/modules/material/material.module';
import { GuestUserDialogComponent } from '../../../../shared/components/guest-user-dialog/guest-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterService } from '../../services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import moment from 'moment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    RegisterService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public registerFormGroup: FormGroup = new FormGroup({});

  constructor(
    private readonly registerService: RegisterService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      user: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required])
    });
  }

  public get getUserFormControl(): AbstractControl {
    return this.registerFormGroup.controls['user'];
  }

  public get getPasswordFormControl(): AbstractControl {
    return this.registerFormGroup.controls['password'];
  }

  public get getAgeFormControl(): AbstractControl {
    return this.registerFormGroup.controls['age'];
  }

  public get getGenderFormControl(): AbstractControl {
    return this.registerFormGroup.controls['gender'];
  }

  public get getEmailFormControl(): AbstractControl {
    return this.registerFormGroup.controls['email'];
  }

  public submit(): void {
    this.registerService.registerStudent({
      username: this.getUserFormControl.value,
      password: this.getPasswordFormControl.value,
      birthday: moment().format("YYYY-MM-DD"),
      email: this.getEmailFormControl.value,
    }).subscribe({
      next: (result: { success: boolean }) => {
          this.router.navigate(['/', 'login']);
      }, 
      error: error => console.error(error)
    });
  }
}
