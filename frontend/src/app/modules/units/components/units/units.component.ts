import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WIPDialogComponent } from '../../../../shared/components/wip-dialog/wip-dialog.component';
import { ILesson, UnitsService } from '../../services/units.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss'
})
export class UnitsComponent implements OnInit {
  public lessons!: ILesson[];
  public unitId: string | null = "";

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly unitsService: UnitsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (route) => {
        this.unitId = route.get("id");
        
        this.unitsService.getUnit(this.unitId as string).subscribe({
          next: (result: ILesson[]) => this.lessons = result,
          error: error => console.error(error)
        });
      },
      error: error => console.error(error)
    });
  }

  public open(): void {
    location.href = "http://127.0.0.1:8000/games/1/?unit_id=" + this.unitId;
  }

  public openWIP(): void {
    this.matDialog.open(WIPDialogComponent, {
      width: "30rem",
      disableClose: true,
      data: {
        title: "Pruebas",
        message: "Las pruebas (quiz, juegos) están en proceso de desarrollo"
      }
    });
  }
}
