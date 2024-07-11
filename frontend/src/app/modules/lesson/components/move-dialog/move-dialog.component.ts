import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-move-dialog',
  standalone: true,
  imports: [],
  templateUrl: './move-dialog.component.html',
  styleUrl: './move-dialog.component.scss'
})
export class MoveDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string }) {}
}
