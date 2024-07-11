import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WIPDialogComponent } from '../../../../shared/components/wip-dialog/wip-dialog.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  constructor(private readonly matDialog: MatDialog) {}

  public openWIP(): void {
    this.matDialog.open(WIPDialogComponent, {
      width: "30rem",
      disableClose: true,
      data: {
        title: "Configuración",
        message: "La configuración de usuario está en proceso de desarrollo"
      }
    });
  }
}
