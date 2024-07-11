import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../shared/modules/material/material.module';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GuestUserDialogComponent } from '../../../../shared/components/guest-user-dialog/guest-user-dialog.component';
import { LoginService } from '../../services/login.services';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup = new FormGroup({});

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      user: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  public get getUserFormControl(): AbstractControl {
    return this.loginFormGroup.controls['user'];
  }

  public get getPasswordFormControl(): AbstractControl {
    return this.loginFormGroup.controls['password'];
  }

  public submit(): void {
    this.loginService.loginStudent({
      username: this.getUserFormControl.value,
      password: this.getPasswordFormControl.value
    }).subscribe({
      next: (result: { refresh: string, access: string, diagnostic_completed: string, role: string }) => {
        localStorage.setItem("token", result.access);
        localStorage.setItem("refresh", result.refresh);

        if(result.role === "alumno") {
          if(result.diagnostic_completed) this.router.navigate(['/', 'stages']);
          else this.router.navigate(['/', 'diagnostic']);
        } else {
          this.router.navigate(["/", "report"]);
        }
      }, 
      error: error => {
        console.error(error);

        this.matSnackBar.open("Correo o contraseña incorrecto", "", {
          duration: 3000,
          verticalPosition: "top"
        });
      }
    });
  }
}
