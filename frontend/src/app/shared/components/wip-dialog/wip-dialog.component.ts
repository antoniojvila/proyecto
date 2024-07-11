import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IWIPDialog {
  title: string;
  message: string;
}

@Component({
  selector: 'app-wip-dialog',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './wip-dialog.component.html',
  styleUrl: './wip-dialog.component.scss'
})
export class WIPDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public matDialogData: IWIPDialog) {}

}
