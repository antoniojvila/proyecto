import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';

@Component({
  selector: 'app-guest-user-dialog',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './guest-user-dialog.component.html',
  styleUrl: './guest-user-dialog.component.scss'
})
export class GuestUserDialogComponent {

}
