import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface IUnit {
  id: string;
  lessons: ILesson[];
}

interface ILesson {
  id: string;
  name: string;
}

@Component({
  selector: 'app-drag-sign',
  templateUrl: './drag-sign.component.html',
  styleUrls: ['./drag-sign.component.scss']
})
export class DragSignComponent implements OnInit {
  public units: IUnit[] = [];
  public unit!: IUnit;
  public unitId: string | null = "";
  public todo: string[] = ['hourglass_empty'];
  public done: string[] = [];

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (route) => {
        this.unitId = route.get("id");
        this.unit = this.units.filter((value: IUnit) => value.id === route.get("id"))[0];
      },
      error: error => console.error(error)
    });

    this.units = [
      {
        id: "1",
        lessons: [
          {
            id: "1",
            name: "Lección 1 - A",
          },
          {
            id: "2",
            name: "Lección 2 - E",
          },
          {
            id: "3",
            name: "Lección 3 - I",
          },
          {
            id: "4",
            name: "Lección 4 - O",
          },
          {
            id: "5",
            name: "Lección 5 - U",
          },
        ]
      },
      {
        id: "2",
        lessons: [
          {
            id: "1",
            name: "Lección 1 - Números",
          }
        ]
      },
      {
        id: "3",
        lessons: [
          {
            id: "1",
            name: "Lección 1 - Amarillo",
          },
          {
            id: "2",
            name: "Lección 2 - Azul",
          },
          {
            id: "3",
            name: "Lección 3 - Blanco",
          },
          {
            id: "4",
            name: "Lección 4 - Marron",
          },
          {
            id: "5",
            name: "Lección 5 - Morado",
          },
          {
            id: "6",
            name: "Lección 6 - Naranja",
          },
          {
            id: "7",
            name: "Lección 7 - Negro",
          },
          {
            id: "8",
            name: "Lección 8 - Rojo",
          },
          {
            id: "9",
            name: "Lección 9 - Rosado",
          },
          {
            id: "10",
            name: "Lección 10 - Verde",
          }
        ]
      },
      {
        id: "4",
        lessons: [
          {
            id: "1",
            name: "Lección 1 - A",
          },
          {
            id: "2",
            name: "Lección 2 - B",
          },
          {
            id: "3",
            name: "Lección 3 - C",
          },
          {
            id: "4",
            name: "Lección 4 - D",
          },
          {
            id: "5",
            name: "Lección 5 - E",
          },
          {
            id: "6",
            name: "Lección 6 - F",
          },
          {
            id: "7",
            name: "Lección 7 - G",
          },
          {
            id: "8",
            name: "Lección 8 - H",
          },
          {
            id: "9",
            name: "Lección 9 - I",
          },
          {
            id: "10",
            name: "Lección 10 - J",
          },
          {
            id: "11",
            name: "Lección 11 - K",
          },
          {
            id: "12",
            name: "Lección 12 - L",
          },
          {
            id: "13",
            name: "Lección 13 - LL",
          },
          {
            id: "14",
            name: "Lección 14 - M",
          },
          {
            id: "15",
            name: "Lección 15 - N",
          },
          {
            id: "16",
            name: "Lección 16 - Ñ",
          },
          {
            id: "17",
            name: "Lección 17 - O",
          },
          {
            id: "18",
            name: "Lección 18 - P",
          },
          {
            id: "19",
            name: "Lección 19 - Q",
          },
          {
            id: "20",
            name: "Lección 20 - R",
          },
          {
            id: "21",
            name: "Lección 21 - RR",
          },
          {
            id: "22",
            name: "Lección 22 - S",
          },
          {
            id: "23",
            name: "Lección 23 - T",
          },
          {
            id: "24",
            name: "Lección 24 - U",
          },
          {
            id: "25",
            name: "Lección 25 - V",
          },
          {
            id: "26",
            name: "Lección 26 - W",
          },
          {
            id: "27",
            name: "Lección 27 - X",
          },
          {
            id: "28",
            name: "Lección 28 - Y",
          },
          {
            id: "29",
            name: "Lección 29 - Z",
          }
        ]
      },
    ];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
