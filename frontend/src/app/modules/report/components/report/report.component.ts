import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ReportService } from '../../services/report.service';

export interface IReportLesson {
  id: number;
  name: string;
  image: string;
  ico: string | null;
  video: string | null;
  completed: boolean;
}

export interface IReportUnits {
  id: number;
  name: string;
  user: number;
  average: number;
  lessons: IReportLesson[];
  createdAt: string;
  updatedAt: string;
}

export interface IReport {
  username: string;
  email: string;
  units: IReportUnits[];
  score: number | null;
}

const mockup: IReport[] = [
  {
      "username": "natalia1",
      "email": "natalia1@natalia1.com",
      "units": [],
      "score": null
  },
  {
      "username": "natalia2",
      "email": "natalia@gmail.com",
      "units": [
          {
              "id": 19,
              "name": "COLORES",
              "user": 4,
              "average": 0,
              "lessons": [
                  {
                      "id": 713,
                      "name": "azul",
                      "image": "/media/media/images/COLORES/azul.png",
                      "ico": "/media/media/images/COLORES/azul.png",
                      "video": "/media/media/videos/COLORES/azul.mp4",
                      "completed": false
                  },
                  {
                      "id": 714,
                      "name": "morado",
                      "image": "/media/media/images/COLORES/morado.png",
                      "ico": "/media/media/images/COLORES/morado.png",
                      "video": "/media/media/videos/COLORES/morado.mp4",
                      "completed": false
                  },
                  {
                      "id": 715,
                      "name": "verde",
                      "image": "/media/media/images/COLORES/verde.png",
                      "ico": "/media/media/images/COLORES/verde.png",
                      "video": "/media/media/videos/COLORES/verde.mp4",
                      "completed": false
                  },
                  {
                      "id": 716,
                      "name": "marrón",
                      "image": "/media/media/images/COLORES/marr%25C3%25B3n.png",
                      "ico": "/media/media/images/COLORES/marr%25C3%25B3n.png",
                      "video": "/media/media/videos/COLORES/marr%25C3%25B3n.mp4",
                      "completed": false
                  },
                  {
                      "id": 717,
                      "name": "colores",
                      "image": "/media/media/images/COLORES/colores.png",
                      "ico": "/media/media/images/COLORES/colores.png",
                      "video": "/media/media/videos/COLORES/colores.mp4",
                      "completed": false
                  },
                  {
                      "id": 718,
                      "name": "rosado",
                      "image": "/media/media/images/COLORES/rosado.png",
                      "ico": "/media/media/images/COLORES/rosado.png",
                      "video": "/media/media/videos/COLORES/rosado.mp4",
                      "completed": false
                  },
                  {
                      "id": 719,
                      "name": "amarillo",
                      "image": "/media/media/images/COLORES/amarillo.png",
                      "ico": "/media/media/images/COLORES/amarillo.png",
                      "video": "/media/media/videos/COLORES/amarillo.mp4",
                      "completed": false
                  },
                  {
                      "id": 720,
                      "name": "naranja",
                      "image": "/media/media/images/COLORES/naranja.png",
                      "ico": "/media/media/images/COLORES/naranja.png",
                      "video": "/media/media/videos/COLORES/naranja.mp4",
                      "completed": false
                  },
                  {
                      "id": 721,
                      "name": "blanco",
                      "image": "/media/media/images/COLORES/blanco.png",
                      "ico": "/media/media/images/COLORES/blanco.png",
                      "video": "/media/media/videos/COLORES/blanco.mp4",
                      "completed": false
                  },
                  {
                      "id": 722,
                      "name": "rojo",
                      "image": "/media/media/images/COLORES/rojo.png",
                      "ico": "/media/media/images/COLORES/rojo.png",
                      "video": "/media/media/videos/COLORES/rojo.mp4",
                      "completed": false
                  },
                  {
                      "id": 723,
                      "name": "negro",
                      "image": "/media/media/images/COLORES/negro.png",
                      "ico": "/media/media/images/COLORES/negro.png",
                      "video": "/media/media/videos/COLORES/negro.mp4",
                      "completed": false
                  },
                  {
                      "id": 769,
                      "name": "azul",
                      "image": "/media/images/COLORES/azul.png",
                      "ico": "/media/images/COLORES/ico/azul.png",
                      "video": "/media/videos/COLORES/azul.mp4",
                      "completed": false
                  },
                  {
                      "id": 770,
                      "name": "morado",
                      "image": "/media/images/COLORES/morado.png",
                      "ico": "/media/images/COLORES/ico/morado.png",
                      "video": "/media/videos/COLORES/morado.mp4",
                      "completed": false
                  },
                  {
                      "id": 771,
                      "name": "verde",
                      "image": "/media/images/COLORES/verde.png",
                      "ico": "/media/images/COLORES/ico/verde.png",
                      "video": "/media/videos/COLORES/verde.mp4",
                      "completed": false
                  },
                  {
                      "id": 772,
                      "name": "marrón",
                      "image": "/media/images/COLORES/marr%C3%B3n.png",
                      "ico": "/media/images/COLORES/ico/marr%C3%B3n.png",
                      "video": "/media/videos/COLORES/marr%C3%B3n.mp4",
                      "completed": false
                  },
                  {
                      "id": 773,
                      "name": "colores",
                      "image": "/media/images/COLORES/colores.png",
                      "ico": "/media/images/COLORES/ico/colores.png",
                      "video": "/media/videos/COLORES/colores.mp4",
                      "completed": false
                  },
                  {
                      "id": 774,
                      "name": "rosado",
                      "image": "/media/images/COLORES/rosado.png",
                      "ico": "/media/images/COLORES/ico/rosado.png",
                      "video": "/media/videos/COLORES/rosado.mp4",
                      "completed": false
                  },
                  {
                      "id": 775,
                      "name": "amarillo",
                      "image": "/media/images/COLORES/amarillo.png",
                      "ico": "/media/images/COLORES/ico/amarillo.png",
                      "video": "/media/videos/COLORES/amarillo.mp4",
                      "completed": false
                  },
                  {
                      "id": 776,
                      "name": "naranja",
                      "image": "/media/images/COLORES/naranja.png",
                      "ico": "/media/images/COLORES/ico/naranja.png",
                      "video": "/media/videos/COLORES/naranja.mp4",
                      "completed": false
                  },
                  {
                      "id": 777,
                      "name": "blanco",
                      "image": "/media/images/COLORES/blanco.png",
                      "ico": "/media/images/COLORES/ico/blanco.png",
                      "video": "/media/videos/COLORES/blanco.mp4",
                      "completed": false
                  },
                  {
                      "id": 778,
                      "name": "rojo",
                      "image": "/media/images/COLORES/rojo.png",
                      "ico": "/media/images/COLORES/ico/rojo.png",
                      "video": "/media/videos/COLORES/rojo.mp4",
                      "completed": false
                  },
                  {
                      "id": 779,
                      "name": "negro",
                      "image": "/media/images/COLORES/negro.png",
                      "ico": "/media/images/COLORES/ico/negro.png",
                      "video": "/media/videos/COLORES/negro.mp4",
                      "completed": false
                  },
                  {
                      "id": 825,
                      "name": "azul",
                      "image": "/media/images/COLORES/azul.png",
                      "ico": "/media/images/COLORES/ico/azul.png",
                      "video": "/media/videos/COLORES/azul.mp4",
                      "completed": false
                  },
                  {
                      "id": 826,
                      "name": "morado",
                      "image": "/media/images/COLORES/morado.png",
                      "ico": "/media/images/COLORES/ico/morado.png",
                      "video": "/media/videos/COLORES/morado.mp4",
                      "completed": false
                  },
                  {
                      "id": 827,
                      "name": "verde",
                      "image": "/media/images/COLORES/verde.png",
                      "ico": "/media/images/COLORES/ico/verde.png",
                      "video": "/media/videos/COLORES/verde.mp4",
                      "completed": false
                  },
                  {
                      "id": 828,
                      "name": "marrón",
                      "image": "/media/images/COLORES/marr%C3%B3n.png",
                      "ico": "/media/images/COLORES/ico/marr%C3%B3n.png",
                      "video": "/media/videos/COLORES/marr%C3%B3n.mp4",
                      "completed": false
                  },
                  {
                      "id": 829,
                      "name": "colores",
                      "image": "/media/images/COLORES/colores.png",
                      "ico": "/media/images/COLORES/ico/colores.png",
                      "video": "/media/videos/COLORES/colores.mp4",
                      "completed": false
                  },
                  {
                      "id": 830,
                      "name": "rosado",
                      "image": "/media/images/COLORES/rosado.png",
                      "ico": "/media/images/COLORES/ico/rosado.png",
                      "video": "/media/videos/COLORES/rosado.mp4",
                      "completed": false
                  },
                  {
                      "id": 831,
                      "name": "amarillo",
                      "image": "/media/images/COLORES/amarillo.png",
                      "ico": "/media/images/COLORES/ico/amarillo.png",
                      "video": "/media/videos/COLORES/amarillo.mp4",
                      "completed": false
                  },
                  {
                      "id": 832,
                      "name": "naranja",
                      "image": "/media/images/COLORES/naranja.png",
                      "ico": "/media/images/COLORES/ico/naranja.png",
                      "video": "/media/videos/COLORES/naranja.mp4",
                      "completed": false
                  },
                  {
                      "id": 833,
                      "name": "blanco",
                      "image": "/media/images/COLORES/blanco.png",
                      "ico": "/media/images/COLORES/ico/blanco.png",
                      "video": "/media/videos/COLORES/blanco.mp4",
                      "completed": false
                  },
                  {
                      "id": 834,
                      "name": "rojo",
                      "image": "/media/images/COLORES/rojo.png",
                      "ico": "/media/images/COLORES/ico/rojo.png",
                      "video": "/media/videos/COLORES/rojo.mp4",
                      "completed": false
                  },
                  {
                      "id": 835,
                      "name": "negro",
                      "image": "/media/images/COLORES/negro.png",
                      "ico": "/media/images/COLORES/ico/negro.png",
                      "video": "/media/videos/COLORES/negro.mp4",
                      "completed": false
                  },
                  {
                      "id": 881,
                      "name": "azul",
                      "image": "/media/images/COLORES/azul.png",
                      "ico": "/media/images/COLORES/ico/azul.png",
                      "video": "/media/videos/COLORES/azul.mp4",
                      "completed": false
                  },
                  {
                      "id": 882,
                      "name": "morado",
                      "image": "/media/images/COLORES/morado.png",
                      "ico": "/media/images/COLORES/ico/morado.png",
                      "video": "/media/videos/COLORES/morado.mp4",
                      "completed": false
                  },
                  {
                      "id": 883,
                      "name": "verde",
                      "image": "/media/images/COLORES/verde.png",
                      "ico": "/media/images/COLORES/ico/verde.png",
                      "video": "/media/videos/COLORES/verde.mp4",
                      "completed": false
                  },
                  {
                      "id": 884,
                      "name": "marrón",
                      "image": "/media/images/COLORES/marr%C3%B3n.png",
                      "ico": "/media/images/COLORES/ico/marr%C3%B3n.png",
                      "video": "/media/videos/COLORES/marr%C3%B3n.mp4",
                      "completed": false
                  },
                  {
                      "id": 885,
                      "name": "colores",
                      "image": "/media/images/COLORES/colores.png",
                      "ico": "/media/images/COLORES/ico/colores.png",
                      "video": "/media/videos/COLORES/colores.mp4",
                      "completed": false
                  },
                  {
                      "id": 886,
                      "name": "rosado",
                      "image": "/media/images/COLORES/rosado.png",
                      "ico": "/media/images/COLORES/ico/rosado.png",
                      "video": "/media/videos/COLORES/rosado.mp4",
                      "completed": false
                  },
                  {
                      "id": 887,
                      "name": "amarillo",
                      "image": "/media/images/COLORES/amarillo.png",
                      "ico": "/media/images/COLORES/ico/amarillo.png",
                      "video": "/media/videos/COLORES/amarillo.mp4",
                      "completed": false
                  },
                  {
                      "id": 888,
                      "name": "naranja",
                      "image": "/media/images/COLORES/naranja.png",
                      "ico": "/media/images/COLORES/ico/naranja.png",
                      "video": "/media/videos/COLORES/naranja.mp4",
                      "completed": false
                  },
                  {
                      "id": 889,
                      "name": "blanco",
                      "image": "/media/images/COLORES/blanco.png",
                      "ico": "/media/images/COLORES/ico/blanco.png",
                      "video": "/media/videos/COLORES/blanco.mp4",
                      "completed": false
                  },
                  {
                      "id": 890,
                      "name": "rojo",
                      "image": "/media/images/COLORES/rojo.png",
                      "ico": "/media/images/COLORES/ico/rojo.png",
                      "video": "/media/videos/COLORES/rojo.mp4",
                      "completed": false
                  },
                  {
                      "id": 891,
                      "name": "negro",
                      "image": "/media/images/COLORES/negro.png",
                      "ico": "/media/images/COLORES/ico/negro.png",
                      "video": "/media/videos/COLORES/negro.mp4",
                      "completed": false
                  },
                  {
                      "id": 937,
                      "name": "azul",
                      "image": "/media/images/COLORES/azul.png",
                      "ico": "/media/images/COLORES/ico/azul.png",
                      "video": "/media/videos/COLORES/azul.mp4",
                      "completed": false
                  },
                  {
                      "id": 938,
                      "name": "morado",
                      "image": "/media/images/COLORES/morado.png",
                      "ico": "/media/images/COLORES/ico/morado.png",
                      "video": "/media/videos/COLORES/morado.mp4",
                      "completed": false
                  },
                  {
                      "id": 939,
                      "name": "verde",
                      "image": "/media/images/COLORES/verde.png",
                      "ico": "/media/images/COLORES/ico/verde.png",
                      "video": "/media/videos/COLORES/verde.mp4",
                      "completed": false
                  },
                  {
                      "id": 940,
                      "name": "marrón",
                      "image": "/media/images/COLORES/marr%C3%B3n.png",
                      "ico": "/media/images/COLORES/ico/marr%C3%B3n.png",
                      "video": "/media/videos/COLORES/marr%C3%B3n.mp4",
                      "completed": false
                  },
                  {
                      "id": 941,
                      "name": "colores",
                      "image": "/media/images/COLORES/colores.png",
                      "ico": "/media/images/COLORES/ico/colores.png",
                      "video": "/media/videos/COLORES/colores.mp4",
                      "completed": false
                  },
                  {
                      "id": 942,
                      "name": "rosado",
                      "image": "/media/images/COLORES/rosado.png",
                      "ico": "/media/images/COLORES/ico/rosado.png",
                      "video": "/media/videos/COLORES/rosado.mp4",
                      "completed": false
                  },
                  {
                      "id": 943,
                      "name": "amarillo",
                      "image": "/media/images/COLORES/amarillo.png",
                      "ico": "/media/images/COLORES/ico/amarillo.png",
                      "video": "/media/videos/COLORES/amarillo.mp4",
                      "completed": false
                  },
                  {
                      "id": 944,
                      "name": "naranja",
                      "image": "/media/images/COLORES/naranja.png",
                      "ico": "/media/images/COLORES/ico/naranja.png",
                      "video": "/media/videos/COLORES/naranja.mp4",
                      "completed": false
                  },
                  {
                      "id": 945,
                      "name": "blanco",
                      "image": "/media/images/COLORES/blanco.png",
                      "ico": "/media/images/COLORES/ico/blanco.png",
                      "video": "/media/videos/COLORES/blanco.mp4",
                      "completed": false
                  },
                  {
                      "id": 946,
                      "name": "rojo",
                      "image": "/media/images/COLORES/rojo.png",
                      "ico": "/media/images/COLORES/ico/rojo.png",
                      "video": "/media/videos/COLORES/rojo.mp4",
                      "completed": false
                  },
                  {
                      "id": 947,
                      "name": "negro",
                      "image": "/media/images/COLORES/negro.png",
                      "ico": "/media/images/COLORES/ico/negro.png",
                      "video": "/media/videos/COLORES/negro.mp4",
                      "completed": false
                  },
                  {
                      "id": 993,
                      "name": "azul",
                      "image": "/media/images/COLORES/azul.png",
                      "ico": "/media/images/COLORES/ico/azul.png",
                      "video": "/media/videos/COLORES/azul.mp4",
                      "completed": false
                  },
                  {
                      "id": 994,
                      "name": "morado",
                      "image": "/media/images/COLORES/morado.png",
                      "ico": "/media/images/COLORES/ico/morado.png",
                      "video": "/media/videos/COLORES/morado.mp4",
                      "completed": false
                  },
                  {
                      "id": 995,
                      "name": "verde",
                      "image": "/media/images/COLORES/verde.png",
                      "ico": "/media/images/COLORES/ico/verde.png",
                      "video": "/media/videos/COLORES/verde.mp4",
                      "completed": false
                  },
                  {
                      "id": 996,
                      "name": "marrón",
                      "image": "/media/images/COLORES/marr%C3%B3n.png",
                      "ico": "/media/images/COLORES/ico/marr%C3%B3n.png",
                      "video": "/media/videos/COLORES/marr%C3%B3n.mp4",
                      "completed": false
                  },
                  {
                      "id": 997,
                      "name": "colores",
                      "image": "/media/images/COLORES/colores.png",
                      "ico": "/media/images/COLORES/ico/colores.png",
                      "video": "/media/videos/COLORES/colores.mp4",
                      "completed": false
                  },
                  {
                      "id": 998,
                      "name": "rosado",
                      "image": "/media/images/COLORES/rosado.png",
                      "ico": "/media/images/COLORES/ico/rosado.png",
                      "video": "/media/videos/COLORES/rosado.mp4",
                      "completed": false
                  },
                  {
                      "id": 999,
                      "name": "amarillo",
                      "image": "/media/images/COLORES/amarillo.png",
                      "ico": "/media/images/COLORES/ico/amarillo.png",
                      "video": "/media/videos/COLORES/amarillo.mp4",
                      "completed": false
                  },
                  {
                      "id": 1000,
                      "name": "naranja",
                      "image": "/media/images/COLORES/naranja.png",
                      "ico": "/media/images/COLORES/ico/naranja.png",
                      "video": "/media/videos/COLORES/naranja.mp4",
                      "completed": false
                  },
                  {
                      "id": 1001,
                      "name": "blanco",
                      "image": "/media/images/COLORES/blanco.png",
                      "ico": "/media/images/COLORES/ico/blanco.png",
                      "video": "/media/videos/COLORES/blanco.mp4",
                      "completed": false
                  },
                  {
                      "id": 1002,
                      "name": "rojo",
                      "image": "/media/images/COLORES/rojo.png",
                      "ico": "/media/images/COLORES/ico/rojo.png",
                      "video": "/media/videos/COLORES/rojo.mp4",
                      "completed": false
                  },
                  {
                      "id": 1003,
                      "name": "negro",
                      "image": "/media/images/COLORES/negro.png",
                      "ico": "/media/images/COLORES/ico/negro.png",
                      "video": "/media/videos/COLORES/negro.mp4",
                      "completed": false
                  }
              ],
              "createdAt": "2024-07-08T01:01:35.800308Z",
              "updatedAt": "2024-07-08T01:01:35.800319Z"
          },
          {
              "id": 20,
              "name": "ABC",
              "user": 4,
              "average": 0,
              "lessons": [
                  {
                      "id": 724,
                      "name": "RR",
                      "image": "/media/media/images/ABC/RR.png",
                      "ico": null,
                      "video": "/media/media/videos/ABC/RR.mp4",
                      "completed": false
                  },
                  {
                      "id": 725,
                      "name": "X",
                      "image": "/media/media/images/ABC/X.png",
                      "ico": "/media/media/images/ABC/X.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 726,
                      "name": "F",
                      "image": "/media/media/images/ABC/F.png",
                      "ico": "/media/media/images/ABC/F.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 727,
                      "name": "B",
                      "image": "/media/media/images/ABC/B.png",
                      "ico": "/media/media/images/ABC/B.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 728,
                      "name": "N",
                      "image": "/media/media/images/ABC/N.png",
                      "ico": "/media/media/images/ABC/N.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 729,
                      "name": "W",
                      "image": "/media/media/images/ABC/W.png",
                      "ico": "/media/media/images/ABC/W.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 730,
                      "name": "Ñ",
                      "image": "/media/media/images/ABC/%25C3%2591.png",
                      "ico": "/media/media/images/ABC/%25C3%2591.png",
                      "video": "/media/media/videos/ABC/%25C3%2591.mp4",
                      "completed": false
                  },
                  {
                      "id": 731,
                      "name": "R",
                      "image": "/media/media/images/ABC/R.png",
                      "ico": "/media/media/images/ABC/R.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 732,
                      "name": "S",
                      "image": "/media/media/images/ABC/S.png",
                      "ico": "/media/media/images/ABC/S.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 733,
                      "name": "G",
                      "image": "/media/media/images/ABC/G.png",
                      "ico": "/media/media/images/ABC/G.png",
                      "video": "/media/media/videos/ABC/G.mp4",
                      "completed": false
                  },
                  {
                      "id": 734,
                      "name": "P",
                      "image": "/media/media/images/ABC/P.png",
                      "ico": "/media/media/images/ABC/P.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 735,
                      "name": "M",
                      "image": "/media/media/images/ABC/M.png",
                      "ico": "/media/media/images/ABC/M.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 736,
                      "name": "U",
                      "image": "/media/media/images/ABC/U.png",
                      "ico": "/media/media/images/ABC/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 737,
                      "name": "D",
                      "image": "/media/media/images/ABC/D.png",
                      "ico": "/media/media/images/ABC/D.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 738,
                      "name": "H",
                      "image": "/media/media/images/ABC/H.png",
                      "ico": "/media/media/images/ABC/H.png",
                      "video": "/media/media/videos/ABC/H.mp4",
                      "completed": false
                  },
                  {
                      "id": 739,
                      "name": "Z",
                      "image": "/media/media/images/ABC/Z.png",
                      "ico": "/media/media/images/ABC/Z.png",
                      "video": "/media/media/videos/ABC/Z.mp4",
                      "completed": false
                  },
                  {
                      "id": 740,
                      "name": "T",
                      "image": "/media/media/images/ABC/T.png",
                      "ico": "/media/media/images/ABC/T.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 741,
                      "name": "V",
                      "image": "/media/media/images/ABC/V.png",
                      "ico": "/media/media/images/ABC/V.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 742,
                      "name": "J",
                      "image": "/media/media/images/ABC/J.png",
                      "ico": "/media/media/images/ABC/J.png",
                      "video": "/media/media/videos/ABC/J.mp4",
                      "completed": false
                  },
                  {
                      "id": 743,
                      "name": "LL",
                      "image": "/media/media/images/ABC/LL.png",
                      "ico": "/media/media/images/ABC/LL.png",
                      "video": "/media/media/videos/ABC/LL.mp4",
                      "completed": false
                  },
                  {
                      "id": 744,
                      "name": "I",
                      "image": "/media/media/images/ABC/I.png",
                      "ico": "/media/media/images/ABC/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 745,
                      "name": "O",
                      "image": "/media/media/images/ABC/O.png",
                      "ico": "/media/media/images/ABC/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 746,
                      "name": "Y",
                      "image": "/media/media/images/ABC/Y.png",
                      "ico": "/media/media/images/ABC/Y.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 747,
                      "name": "E",
                      "image": "/media/media/images/ABC/E.png",
                      "ico": "/media/media/images/ABC/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 748,
                      "name": "K",
                      "image": "/media/media/images/ABC/K.png",
                      "ico": "/media/media/images/ABC/K.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 749,
                      "name": "C",
                      "image": "/media/media/images/ABC/C.png",
                      "ico": "/media/media/images/ABC/C.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 750,
                      "name": "A",
                      "image": "/media/media/images/ABC/A.png",
                      "ico": "/media/media/images/ABC/A.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 751,
                      "name": "Q",
                      "image": "/media/media/images/ABC/Q.png",
                      "ico": "/media/media/images/ABC/Q.png",
                      "video": "/media/media/videos/ABC/Q.mp4",
                      "completed": false
                  },
                  {
                      "id": 752,
                      "name": "L",
                      "image": "/media/media/images/ABC/L.png",
                      "ico": "/media/media/images/ABC/L.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 780,
                      "name": "RR",
                      "image": "/media/images/ABC/RR.png",
                      "ico": null,
                      "video": "/media/videos/ABC/RR.mp4",
                      "completed": false
                  },
                  {
                      "id": 781,
                      "name": "X",
                      "image": "/media/images/ABC/X.png",
                      "ico": "/media/images/ABC/ico/X.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 782,
                      "name": "F",
                      "image": "/media/images/ABC/F.png",
                      "ico": "/media/images/ABC/ico/F.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 783,
                      "name": "B",
                      "image": "/media/images/ABC/B.png",
                      "ico": "/media/images/ABC/ico/B.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 784,
                      "name": "N",
                      "image": "/media/images/ABC/N.png",
                      "ico": "/media/images/ABC/ico/N.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 785,
                      "name": "W",
                      "image": "/media/images/ABC/W.png",
                      "ico": "/media/images/ABC/ico/W.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 786,
                      "name": "Ñ",
                      "image": "/media/images/ABC/%C3%91.png",
                      "ico": "/media/images/ABC/ico/%C3%91.png",
                      "video": "/media/videos/ABC/%C3%91.mp4",
                      "completed": false
                  },
                  {
                      "id": 787,
                      "name": "R",
                      "image": "/media/images/ABC/R.png",
                      "ico": "/media/images/ABC/ico/R.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 788,
                      "name": "S",
                      "image": "/media/images/ABC/S.png",
                      "ico": "/media/images/ABC/ico/S.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 789,
                      "name": "G",
                      "image": "/media/images/ABC/G.png",
                      "ico": "/media/images/ABC/ico/G.png",
                      "video": "/media/videos/ABC/G.mp4",
                      "completed": false
                  },
                  {
                      "id": 790,
                      "name": "P",
                      "image": "/media/images/ABC/P.png",
                      "ico": "/media/images/ABC/ico/P.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 791,
                      "name": "M",
                      "image": "/media/images/ABC/M.png",
                      "ico": "/media/images/ABC/ico/M.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 792,
                      "name": "U",
                      "image": "/media/images/ABC/U.png",
                      "ico": "/media/images/ABC/ico/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 793,
                      "name": "D",
                      "image": "/media/images/ABC/D.png",
                      "ico": "/media/images/ABC/ico/D.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 794,
                      "name": "H",
                      "image": "/media/images/ABC/H.png",
                      "ico": "/media/images/ABC/ico/H.png",
                      "video": "/media/videos/ABC/H.mp4",
                      "completed": false
                  },
                  {
                      "id": 795,
                      "name": "Z",
                      "image": "/media/images/ABC/Z.png",
                      "ico": "/media/images/ABC/ico/Z.png",
                      "video": "/media/videos/ABC/Z.mp4",
                      "completed": false
                  },
                  {
                      "id": 796,
                      "name": "T",
                      "image": "/media/images/ABC/T.png",
                      "ico": "/media/images/ABC/ico/T.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 797,
                      "name": "V",
                      "image": "/media/images/ABC/V.png",
                      "ico": "/media/images/ABC/ico/V.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 798,
                      "name": "J",
                      "image": "/media/images/ABC/J.png",
                      "ico": "/media/images/ABC/ico/J.png",
                      "video": "/media/videos/ABC/J.mp4",
                      "completed": false
                  },
                  {
                      "id": 799,
                      "name": "LL",
                      "image": "/media/images/ABC/LL.png",
                      "ico": "/media/images/ABC/ico/LL.png",
                      "video": "/media/videos/ABC/LL.mp4",
                      "completed": false
                  },
                  {
                      "id": 800,
                      "name": "I",
                      "image": "/media/images/ABC/I.png",
                      "ico": "/media/images/ABC/ico/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 801,
                      "name": "O",
                      "image": "/media/images/ABC/O.png",
                      "ico": "/media/images/ABC/ico/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 802,
                      "name": "Y",
                      "image": "/media/images/ABC/Y.png",
                      "ico": "/media/images/ABC/ico/Y.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 803,
                      "name": "E",
                      "image": "/media/images/ABC/E.png",
                      "ico": "/media/images/ABC/ico/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 804,
                      "name": "K",
                      "image": "/media/images/ABC/K.png",
                      "ico": "/media/images/ABC/ico/K.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 805,
                      "name": "C",
                      "image": "/media/images/ABC/C.png",
                      "ico": "/media/images/ABC/ico/C.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 806,
                      "name": "A",
                      "image": "/media/images/ABC/A.png",
                      "ico": "/media/images/ABC/ico/A.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 807,
                      "name": "Q",
                      "image": "/media/images/ABC/Q.png",
                      "ico": "/media/images/ABC/ico/Q.png",
                      "video": "/media/videos/ABC/Q.mp4",
                      "completed": false
                  },
                  {
                      "id": 808,
                      "name": "L",
                      "image": "/media/images/ABC/L.png",
                      "ico": "/media/images/ABC/ico/L.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 836,
                      "name": "RR",
                      "image": "/media/images/ABC/RR.png",
                      "ico": null,
                      "video": "/media/videos/ABC/RR.mp4",
                      "completed": false
                  },
                  {
                      "id": 837,
                      "name": "X",
                      "image": "/media/images/ABC/X.png",
                      "ico": "/media/images/ABC/ico/X.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 838,
                      "name": "F",
                      "image": "/media/images/ABC/F.png",
                      "ico": "/media/images/ABC/ico/F.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 839,
                      "name": "B",
                      "image": "/media/images/ABC/B.png",
                      "ico": "/media/images/ABC/ico/B.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 840,
                      "name": "N",
                      "image": "/media/images/ABC/N.png",
                      "ico": "/media/images/ABC/ico/N.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 841,
                      "name": "W",
                      "image": "/media/images/ABC/W.png",
                      "ico": "/media/images/ABC/ico/W.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 842,
                      "name": "Ñ",
                      "image": "/media/images/ABC/%C3%91.png",
                      "ico": "/media/images/ABC/ico/%C3%91.png",
                      "video": "/media/videos/ABC/%C3%91.mp4",
                      "completed": false
                  },
                  {
                      "id": 843,
                      "name": "R",
                      "image": "/media/images/ABC/R.png",
                      "ico": "/media/images/ABC/ico/R.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 844,
                      "name": "S",
                      "image": "/media/images/ABC/S.png",
                      "ico": "/media/images/ABC/ico/S.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 845,
                      "name": "G",
                      "image": "/media/images/ABC/G.png",
                      "ico": "/media/images/ABC/ico/G.png",
                      "video": "/media/videos/ABC/G.mp4",
                      "completed": false
                  },
                  {
                      "id": 846,
                      "name": "P",
                      "image": "/media/images/ABC/P.png",
                      "ico": "/media/images/ABC/ico/P.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 847,
                      "name": "M",
                      "image": "/media/images/ABC/M.png",
                      "ico": "/media/images/ABC/ico/M.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 848,
                      "name": "U",
                      "image": "/media/images/ABC/U.png",
                      "ico": "/media/images/ABC/ico/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 849,
                      "name": "D",
                      "image": "/media/images/ABC/D.png",
                      "ico": "/media/images/ABC/ico/D.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 850,
                      "name": "H",
                      "image": "/media/images/ABC/H.png",
                      "ico": "/media/images/ABC/ico/H.png",
                      "video": "/media/videos/ABC/H.mp4",
                      "completed": false
                  },
                  {
                      "id": 851,
                      "name": "Z",
                      "image": "/media/images/ABC/Z.png",
                      "ico": "/media/images/ABC/ico/Z.png",
                      "video": "/media/videos/ABC/Z.mp4",
                      "completed": false
                  },
                  {
                      "id": 852,
                      "name": "T",
                      "image": "/media/images/ABC/T.png",
                      "ico": "/media/images/ABC/ico/T.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 853,
                      "name": "V",
                      "image": "/media/images/ABC/V.png",
                      "ico": "/media/images/ABC/ico/V.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 854,
                      "name": "J",
                      "image": "/media/images/ABC/J.png",
                      "ico": "/media/images/ABC/ico/J.png",
                      "video": "/media/videos/ABC/J.mp4",
                      "completed": false
                  },
                  {
                      "id": 855,
                      "name": "LL",
                      "image": "/media/images/ABC/LL.png",
                      "ico": "/media/images/ABC/ico/LL.png",
                      "video": "/media/videos/ABC/LL.mp4",
                      "completed": false
                  },
                  {
                      "id": 856,
                      "name": "I",
                      "image": "/media/images/ABC/I.png",
                      "ico": "/media/images/ABC/ico/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 857,
                      "name": "O",
                      "image": "/media/images/ABC/O.png",
                      "ico": "/media/images/ABC/ico/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 858,
                      "name": "Y",
                      "image": "/media/images/ABC/Y.png",
                      "ico": "/media/images/ABC/ico/Y.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 859,
                      "name": "E",
                      "image": "/media/images/ABC/E.png",
                      "ico": "/media/images/ABC/ico/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 860,
                      "name": "K",
                      "image": "/media/images/ABC/K.png",
                      "ico": "/media/images/ABC/ico/K.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 861,
                      "name": "C",
                      "image": "/media/images/ABC/C.png",
                      "ico": "/media/images/ABC/ico/C.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 862,
                      "name": "A",
                      "image": "/media/images/ABC/A.png",
                      "ico": "/media/images/ABC/ico/A.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 863,
                      "name": "Q",
                      "image": "/media/images/ABC/Q.png",
                      "ico": "/media/images/ABC/ico/Q.png",
                      "video": "/media/videos/ABC/Q.mp4",
                      "completed": false
                  },
                  {
                      "id": 864,
                      "name": "L",
                      "image": "/media/images/ABC/L.png",
                      "ico": "/media/images/ABC/ico/L.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 892,
                      "name": "RR",
                      "image": "/media/images/ABC/RR.png",
                      "ico": null,
                      "video": "/media/videos/ABC/RR.mp4",
                      "completed": false
                  },
                  {
                      "id": 893,
                      "name": "X",
                      "image": "/media/images/ABC/X.png",
                      "ico": "/media/images/ABC/ico/X.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 894,
                      "name": "F",
                      "image": "/media/images/ABC/F.png",
                      "ico": "/media/images/ABC/ico/F.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 895,
                      "name": "B",
                      "image": "/media/images/ABC/B.png",
                      "ico": "/media/images/ABC/ico/B.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 896,
                      "name": "N",
                      "image": "/media/images/ABC/N.png",
                      "ico": "/media/images/ABC/ico/N.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 897,
                      "name": "W",
                      "image": "/media/images/ABC/W.png",
                      "ico": "/media/images/ABC/ico/W.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 898,
                      "name": "Ñ",
                      "image": "/media/images/ABC/%C3%91.png",
                      "ico": "/media/images/ABC/ico/%C3%91.png",
                      "video": "/media/videos/ABC/%C3%91.mp4",
                      "completed": false
                  },
                  {
                      "id": 899,
                      "name": "R",
                      "image": "/media/images/ABC/R.png",
                      "ico": "/media/images/ABC/ico/R.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 900,
                      "name": "S",
                      "image": "/media/images/ABC/S.png",
                      "ico": "/media/images/ABC/ico/S.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 901,
                      "name": "G",
                      "image": "/media/images/ABC/G.png",
                      "ico": "/media/images/ABC/ico/G.png",
                      "video": "/media/videos/ABC/G.mp4",
                      "completed": false
                  },
                  {
                      "id": 902,
                      "name": "P",
                      "image": "/media/images/ABC/P.png",
                      "ico": "/media/images/ABC/ico/P.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 903,
                      "name": "M",
                      "image": "/media/images/ABC/M.png",
                      "ico": "/media/images/ABC/ico/M.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 904,
                      "name": "U",
                      "image": "/media/images/ABC/U.png",
                      "ico": "/media/images/ABC/ico/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 905,
                      "name": "D",
                      "image": "/media/images/ABC/D.png",
                      "ico": "/media/images/ABC/ico/D.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 906,
                      "name": "H",
                      "image": "/media/images/ABC/H.png",
                      "ico": "/media/images/ABC/ico/H.png",
                      "video": "/media/videos/ABC/H.mp4",
                      "completed": false
                  },
                  {
                      "id": 907,
                      "name": "Z",
                      "image": "/media/images/ABC/Z.png",
                      "ico": "/media/images/ABC/ico/Z.png",
                      "video": "/media/videos/ABC/Z.mp4",
                      "completed": false
                  },
                  {
                      "id": 908,
                      "name": "T",
                      "image": "/media/images/ABC/T.png",
                      "ico": "/media/images/ABC/ico/T.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 909,
                      "name": "V",
                      "image": "/media/images/ABC/V.png",
                      "ico": "/media/images/ABC/ico/V.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 910,
                      "name": "J",
                      "image": "/media/images/ABC/J.png",
                      "ico": "/media/images/ABC/ico/J.png",
                      "video": "/media/videos/ABC/J.mp4",
                      "completed": false
                  },
                  {
                      "id": 911,
                      "name": "LL",
                      "image": "/media/images/ABC/LL.png",
                      "ico": "/media/images/ABC/ico/LL.png",
                      "video": "/media/videos/ABC/LL.mp4",
                      "completed": false
                  },
                  {
                      "id": 912,
                      "name": "I",
                      "image": "/media/images/ABC/I.png",
                      "ico": "/media/images/ABC/ico/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 913,
                      "name": "O",
                      "image": "/media/images/ABC/O.png",
                      "ico": "/media/images/ABC/ico/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 914,
                      "name": "Y",
                      "image": "/media/images/ABC/Y.png",
                      "ico": "/media/images/ABC/ico/Y.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 915,
                      "name": "E",
                      "image": "/media/images/ABC/E.png",
                      "ico": "/media/images/ABC/ico/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 916,
                      "name": "K",
                      "image": "/media/images/ABC/K.png",
                      "ico": "/media/images/ABC/ico/K.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 917,
                      "name": "C",
                      "image": "/media/images/ABC/C.png",
                      "ico": "/media/images/ABC/ico/C.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 918,
                      "name": "A",
                      "image": "/media/images/ABC/A.png",
                      "ico": "/media/images/ABC/ico/A.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 919,
                      "name": "Q",
                      "image": "/media/images/ABC/Q.png",
                      "ico": "/media/images/ABC/ico/Q.png",
                      "video": "/media/videos/ABC/Q.mp4",
                      "completed": false
                  },
                  {
                      "id": 920,
                      "name": "L",
                      "image": "/media/images/ABC/L.png",
                      "ico": "/media/images/ABC/ico/L.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 948,
                      "name": "RR",
                      "image": "/media/images/ABC/RR.png",
                      "ico": null,
                      "video": "/media/videos/ABC/RR.mp4",
                      "completed": false
                  },
                  {
                      "id": 949,
                      "name": "X",
                      "image": "/media/images/ABC/X.png",
                      "ico": "/media/images/ABC/ico/X.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 950,
                      "name": "F",
                      "image": "/media/images/ABC/F.png",
                      "ico": "/media/images/ABC/ico/F.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 951,
                      "name": "B",
                      "image": "/media/images/ABC/B.png",
                      "ico": "/media/images/ABC/ico/B.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 952,
                      "name": "N",
                      "image": "/media/images/ABC/N.png",
                      "ico": "/media/images/ABC/ico/N.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 953,
                      "name": "W",
                      "image": "/media/images/ABC/W.png",
                      "ico": "/media/images/ABC/ico/W.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 954,
                      "name": "Ñ",
                      "image": "/media/images/ABC/%C3%91.png",
                      "ico": "/media/images/ABC/ico/%C3%91.png",
                      "video": "/media/videos/ABC/%C3%91.mp4",
                      "completed": false
                  },
                  {
                      "id": 955,
                      "name": "R",
                      "image": "/media/images/ABC/R.png",
                      "ico": "/media/images/ABC/ico/R.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 956,
                      "name": "S",
                      "image": "/media/images/ABC/S.png",
                      "ico": "/media/images/ABC/ico/S.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 957,
                      "name": "G",
                      "image": "/media/images/ABC/G.png",
                      "ico": "/media/images/ABC/ico/G.png",
                      "video": "/media/videos/ABC/G.mp4",
                      "completed": false
                  },
                  {
                      "id": 958,
                      "name": "P",
                      "image": "/media/images/ABC/P.png",
                      "ico": "/media/images/ABC/ico/P.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 959,
                      "name": "M",
                      "image": "/media/images/ABC/M.png",
                      "ico": "/media/images/ABC/ico/M.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 960,
                      "name": "U",
                      "image": "/media/images/ABC/U.png",
                      "ico": "/media/images/ABC/ico/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 961,
                      "name": "D",
                      "image": "/media/images/ABC/D.png",
                      "ico": "/media/images/ABC/ico/D.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 962,
                      "name": "H",
                      "image": "/media/images/ABC/H.png",
                      "ico": "/media/images/ABC/ico/H.png",
                      "video": "/media/videos/ABC/H.mp4",
                      "completed": false
                  },
                  {
                      "id": 963,
                      "name": "Z",
                      "image": "/media/images/ABC/Z.png",
                      "ico": "/media/images/ABC/ico/Z.png",
                      "video": "/media/videos/ABC/Z.mp4",
                      "completed": false
                  },
                  {
                      "id": 964,
                      "name": "T",
                      "image": "/media/images/ABC/T.png",
                      "ico": "/media/images/ABC/ico/T.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 965,
                      "name": "V",
                      "image": "/media/images/ABC/V.png",
                      "ico": "/media/images/ABC/ico/V.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 966,
                      "name": "J",
                      "image": "/media/images/ABC/J.png",
                      "ico": "/media/images/ABC/ico/J.png",
                      "video": "/media/videos/ABC/J.mp4",
                      "completed": false
                  },
                  {
                      "id": 967,
                      "name": "LL",
                      "image": "/media/images/ABC/LL.png",
                      "ico": "/media/images/ABC/ico/LL.png",
                      "video": "/media/videos/ABC/LL.mp4",
                      "completed": false
                  },
                  {
                      "id": 968,
                      "name": "I",
                      "image": "/media/images/ABC/I.png",
                      "ico": "/media/images/ABC/ico/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 969,
                      "name": "O",
                      "image": "/media/images/ABC/O.png",
                      "ico": "/media/images/ABC/ico/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 970,
                      "name": "Y",
                      "image": "/media/images/ABC/Y.png",
                      "ico": "/media/images/ABC/ico/Y.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 971,
                      "name": "E",
                      "image": "/media/images/ABC/E.png",
                      "ico": "/media/images/ABC/ico/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 972,
                      "name": "K",
                      "image": "/media/images/ABC/K.png",
                      "ico": "/media/images/ABC/ico/K.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 973,
                      "name": "C",
                      "image": "/media/images/ABC/C.png",
                      "ico": "/media/images/ABC/ico/C.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 974,
                      "name": "A",
                      "image": "/media/images/ABC/A.png",
                      "ico": "/media/images/ABC/ico/A.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 975,
                      "name": "Q",
                      "image": "/media/images/ABC/Q.png",
                      "ico": "/media/images/ABC/ico/Q.png",
                      "video": "/media/videos/ABC/Q.mp4",
                      "completed": false
                  },
                  {
                      "id": 976,
                      "name": "L",
                      "image": "/media/images/ABC/L.png",
                      "ico": "/media/images/ABC/ico/L.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1004,
                      "name": "RR",
                      "image": "/media/images/ABC/RR.png",
                      "ico": null,
                      "video": "/media/videos/ABC/RR.mp4",
                      "completed": false
                  },
                  {
                      "id": 1005,
                      "name": "X",
                      "image": "/media/images/ABC/X.png",
                      "ico": "/media/images/ABC/ico/X.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1006,
                      "name": "F",
                      "image": "/media/images/ABC/F.png",
                      "ico": "/media/images/ABC/ico/F.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1007,
                      "name": "B",
                      "image": "/media/images/ABC/B.png",
                      "ico": "/media/images/ABC/ico/B.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1008,
                      "name": "N",
                      "image": "/media/images/ABC/N.png",
                      "ico": "/media/images/ABC/ico/N.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1009,
                      "name": "W",
                      "image": "/media/images/ABC/W.png",
                      "ico": "/media/images/ABC/ico/W.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1010,
                      "name": "Ñ",
                      "image": "/media/images/ABC/%C3%91.png",
                      "ico": "/media/images/ABC/ico/%C3%91.png",
                      "video": "/media/videos/ABC/%C3%91.mp4",
                      "completed": false
                  },
                  {
                      "id": 1011,
                      "name": "R",
                      "image": "/media/images/ABC/R.png",
                      "ico": "/media/images/ABC/ico/R.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1012,
                      "name": "S",
                      "image": "/media/images/ABC/S.png",
                      "ico": "/media/images/ABC/ico/S.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1013,
                      "name": "G",
                      "image": "/media/images/ABC/G.png",
                      "ico": "/media/images/ABC/ico/G.png",
                      "video": "/media/videos/ABC/G.mp4",
                      "completed": false
                  },
                  {
                      "id": 1014,
                      "name": "P",
                      "image": "/media/images/ABC/P.png",
                      "ico": "/media/images/ABC/ico/P.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1015,
                      "name": "M",
                      "image": "/media/images/ABC/M.png",
                      "ico": "/media/images/ABC/ico/M.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1016,
                      "name": "U",
                      "image": "/media/images/ABC/U.png",
                      "ico": "/media/images/ABC/ico/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1017,
                      "name": "D",
                      "image": "/media/images/ABC/D.png",
                      "ico": "/media/images/ABC/ico/D.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1018,
                      "name": "H",
                      "image": "/media/images/ABC/H.png",
                      "ico": "/media/images/ABC/ico/H.png",
                      "video": "/media/videos/ABC/H.mp4",
                      "completed": false
                  },
                  {
                      "id": 1019,
                      "name": "Z",
                      "image": "/media/images/ABC/Z.png",
                      "ico": "/media/images/ABC/ico/Z.png",
                      "video": "/media/videos/ABC/Z.mp4",
                      "completed": false
                  },
                  {
                      "id": 1020,
                      "name": "T",
                      "image": "/media/images/ABC/T.png",
                      "ico": "/media/images/ABC/ico/T.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1021,
                      "name": "V",
                      "image": "/media/images/ABC/V.png",
                      "ico": "/media/images/ABC/ico/V.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1022,
                      "name": "J",
                      "image": "/media/images/ABC/J.png",
                      "ico": "/media/images/ABC/ico/J.png",
                      "video": "/media/videos/ABC/J.mp4",
                      "completed": false
                  },
                  {
                      "id": 1023,
                      "name": "LL",
                      "image": "/media/images/ABC/LL.png",
                      "ico": "/media/images/ABC/ico/LL.png",
                      "video": "/media/videos/ABC/LL.mp4",
                      "completed": false
                  },
                  {
                      "id": 1024,
                      "name": "I",
                      "image": "/media/images/ABC/I.png",
                      "ico": "/media/images/ABC/ico/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1025,
                      "name": "O",
                      "image": "/media/images/ABC/O.png",
                      "ico": "/media/images/ABC/ico/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1026,
                      "name": "Y",
                      "image": "/media/images/ABC/Y.png",
                      "ico": "/media/images/ABC/ico/Y.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1027,
                      "name": "E",
                      "image": "/media/images/ABC/E.png",
                      "ico": "/media/images/ABC/ico/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1028,
                      "name": "K",
                      "image": "/media/images/ABC/K.png",
                      "ico": "/media/images/ABC/ico/K.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1029,
                      "name": "C",
                      "image": "/media/images/ABC/C.png",
                      "ico": "/media/images/ABC/ico/C.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1030,
                      "name": "A",
                      "image": "/media/images/ABC/A.png",
                      "ico": "/media/images/ABC/ico/A.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 1031,
                      "name": "Q",
                      "image": "/media/images/ABC/Q.png",
                      "ico": "/media/images/ABC/ico/Q.png",
                      "video": "/media/videos/ABC/Q.mp4",
                      "completed": false
                  },
                  {
                      "id": 1032,
                      "name": "L",
                      "image": "/media/images/ABC/L.png",
                      "ico": "/media/images/ABC/ico/L.png",
                      "video": null,
                      "completed": false
                  }
              ],
              "createdAt": "2024-07-08T01:01:35.822458Z",
              "updatedAt": "2024-07-08T01:01:35.822467Z"
          },
          {
              "id": 21,
              "name": "VOCALES",
              "user": 4,
              "average": 0,
              "lessons": [
                  {
                      "id": 753,
                      "name": "U",
                      "image": "/media/images/VOCALES/U.png",
                      "ico": "/media/images/VOCALES/ico/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 754,
                      "name": "I",
                      "image": "/media/images/VOCALES/I.png",
                      "ico": "/media/images/VOCALES/ico/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 755,
                      "name": "O",
                      "image": "/media/images/VOCALES/O.png",
                      "ico": "/media/images/VOCALES/ico/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 756,
                      "name": "E",
                      "image": "/media/images/VOCALES/E.png",
                      "ico": "/media/images/VOCALES/ico/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 757,
                      "name": "A",
                      "image": "/media/images/VOCALES/A.png",
                      "ico": "/media/images/VOCALES/ico/A.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 809,
                      "name": "U",
                      "image": "/media/images/VOCALES/U.png",
                      "ico": "/media/images/VOCALES/ico/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 810,
                      "name": "I",
                      "image": "/media/images/VOCALES/I.png",
                      "ico": "/media/images/VOCALES/ico/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 811,
                      "name": "O",
                      "image": "/media/images/VOCALES/O.png",
                      "ico": "/media/images/VOCALES/ico/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 812,
                      "name": "E",
                      "image": "/media/images/VOCALES/E.png",
                      "ico": "/media/images/VOCALES/ico/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 813,
                      "name": "A",
                      "image": "/media/images/VOCALES/A.png",
                      "ico": "/media/images/VOCALES/ico/A.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 865,
                      "name": "U",
                      "image": "/media/images/VOCALES/U.png",
                      "ico": "/media/images/VOCALES/ico/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 866,
                      "name": "I",
                      "image": "/media/images/VOCALES/I.png",
                      "ico": "/media/images/VOCALES/ico/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 867,
                      "name": "O",
                      "image": "/media/images/VOCALES/O.png",
                      "ico": "/media/images/VOCALES/ico/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 868,
                      "name": "E",
                      "image": "/media/images/VOCALES/E.png",
                      "ico": "/media/images/VOCALES/ico/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 869,
                      "name": "A",
                      "image": "/media/images/VOCALES/A.png",
                      "ico": "/media/images/VOCALES/ico/A.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 921,
                      "name": "U",
                      "image": "/media/images/VOCALES/U.png",
                      "ico": "/media/images/VOCALES/ico/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 922,
                      "name": "I",
                      "image": "/media/images/VOCALES/I.png",
                      "ico": "/media/images/VOCALES/ico/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 923,
                      "name": "O",
                      "image": "/media/images/VOCALES/O.png",
                      "ico": "/media/images/VOCALES/ico/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 924,
                      "name": "E",
                      "image": "/media/images/VOCALES/E.png",
                      "ico": "/media/images/VOCALES/ico/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 925,
                      "name": "A",
                      "image": "/media/images/VOCALES/A.png",
                      "ico": "/media/images/VOCALES/ico/A.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 977,
                      "name": "U",
                      "image": "/media/images/VOCALES/U.png",
                      "ico": "/media/images/VOCALES/ico/U.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 978,
                      "name": "I",
                      "image": "/media/images/VOCALES/I.png",
                      "ico": "/media/images/VOCALES/ico/I.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 979,
                      "name": "O",
                      "image": "/media/images/VOCALES/O.png",
                      "ico": "/media/images/VOCALES/ico/O.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 980,
                      "name": "E",
                      "image": "/media/images/VOCALES/E.png",
                      "ico": "/media/images/VOCALES/ico/E.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 981,
                      "name": "A",
                      "image": "/media/images/VOCALES/A.png",
                      "ico": "/media/images/VOCALES/ico/A.png",
                      "video": null,
                      "completed": false
                  }
              ],
              "createdAt": "2024-07-08T01:01:35.945412Z",
              "updatedAt": "2024-07-08T01:01:35.945426Z"
          },
          {
              "id": 22,
              "name": "123",
              "user": 4,
              "average": 0,
              "lessons": [
                  {
                      "id": 758,
                      "name": "6",
                      "image": "/media/images/123/6.png",
                      "ico": "/media/images/123/ico/6.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 759,
                      "name": "9",
                      "image": "/media/images/123/9.png",
                      "ico": "/media/images/123/ico/9.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 760,
                      "name": "7",
                      "image": "/media/images/123/7.png",
                      "ico": "/media/images/123/ico/7.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 761,
                      "name": "2",
                      "image": "/media/images/123/2.png",
                      "ico": "/media/images/123/ico/2.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 762,
                      "name": "5",
                      "image": "/media/images/123/5.png",
                      "ico": "/media/images/123/ico/5.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 763,
                      "name": "4",
                      "image": "/media/images/123/4.png",
                      "ico": "/media/images/123/ico/4.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 764,
                      "name": "1",
                      "image": "/media/images/123/1.png",
                      "ico": "/media/images/123/ico/1.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 765,
                      "name": "3",
                      "image": "/media/images/123/3.png",
                      "ico": "/media/images/123/ico/3.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 766,
                      "name": "números",
                      "image": "/media/images/123/n%C3%BAmeros.png",
                      "ico": "/media/images/123/ico/n%C3%BAmeros.png",
                      "video": "/media/videos/123/n%C3%BAmeros.mp4",
                      "completed": false
                  },
                  {
                      "id": 767,
                      "name": "10",
                      "image": "/media/images/123/10.png",
                      "ico": "/media/images/123/ico/10.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 768,
                      "name": "8",
                      "image": "/media/images/123/8.png",
                      "ico": "/media/images/123/ico/8.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 814,
                      "name": "6",
                      "image": "/media/images/123/6.png",
                      "ico": "/media/images/123/ico/6.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 815,
                      "name": "9",
                      "image": "/media/images/123/9.png",
                      "ico": "/media/images/123/ico/9.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 816,
                      "name": "7",
                      "image": "/media/images/123/7.png",
                      "ico": "/media/images/123/ico/7.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 817,
                      "name": "2",
                      "image": "/media/images/123/2.png",
                      "ico": "/media/images/123/ico/2.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 818,
                      "name": "5",
                      "image": "/media/images/123/5.png",
                      "ico": "/media/images/123/ico/5.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 819,
                      "name": "4",
                      "image": "/media/images/123/4.png",
                      "ico": "/media/images/123/ico/4.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 820,
                      "name": "1",
                      "image": "/media/images/123/1.png",
                      "ico": "/media/images/123/ico/1.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 821,
                      "name": "3",
                      "image": "/media/images/123/3.png",
                      "ico": "/media/images/123/ico/3.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 822,
                      "name": "números",
                      "image": "/media/images/123/n%C3%BAmeros.png",
                      "ico": "/media/images/123/ico/n%C3%BAmeros.png",
                      "video": "/media/videos/123/n%C3%BAmeros.mp4",
                      "completed": false
                  },
                  {
                      "id": 823,
                      "name": "10",
                      "image": "/media/images/123/10.png",
                      "ico": "/media/images/123/ico/10.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 824,
                      "name": "8",
                      "image": "/media/images/123/8.png",
                      "ico": "/media/images/123/ico/8.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 870,
                      "name": "6",
                      "image": "/media/images/123/6.png",
                      "ico": "/media/images/123/ico/6.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 871,
                      "name": "9",
                      "image": "/media/images/123/9.png",
                      "ico": "/media/images/123/ico/9.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 872,
                      "name": "7",
                      "image": "/media/images/123/7.png",
                      "ico": "/media/images/123/ico/7.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 873,
                      "name": "2",
                      "image": "/media/images/123/2.png",
                      "ico": "/media/images/123/ico/2.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 874,
                      "name": "5",
                      "image": "/media/images/123/5.png",
                      "ico": "/media/images/123/ico/5.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 875,
                      "name": "4",
                      "image": "/media/images/123/4.png",
                      "ico": "/media/images/123/ico/4.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 876,
                      "name": "1",
                      "image": "/media/images/123/1.png",
                      "ico": "/media/images/123/ico/1.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 877,
                      "name": "3",
                      "image": "/media/images/123/3.png",
                      "ico": "/media/images/123/ico/3.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 878,
                      "name": "números",
                      "image": "/media/images/123/n%C3%BAmeros.png",
                      "ico": "/media/images/123/ico/n%C3%BAmeros.png",
                      "video": "/media/videos/123/n%C3%BAmeros.mp4",
                      "completed": false
                  },
                  {
                      "id": 879,
                      "name": "10",
                      "image": "/media/images/123/10.png",
                      "ico": "/media/images/123/ico/10.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 880,
                      "name": "8",
                      "image": "/media/images/123/8.png",
                      "ico": "/media/images/123/ico/8.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 926,
                      "name": "6",
                      "image": "/media/images/123/6.png",
                      "ico": "/media/images/123/ico/6.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 927,
                      "name": "9",
                      "image": "/media/images/123/9.png",
                      "ico": "/media/images/123/ico/9.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 928,
                      "name": "7",
                      "image": "/media/images/123/7.png",
                      "ico": "/media/images/123/ico/7.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 929,
                      "name": "2",
                      "image": "/media/images/123/2.png",
                      "ico": "/media/images/123/ico/2.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 930,
                      "name": "5",
                      "image": "/media/images/123/5.png",
                      "ico": "/media/images/123/ico/5.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 931,
                      "name": "4",
                      "image": "/media/images/123/4.png",
                      "ico": "/media/images/123/ico/4.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 932,
                      "name": "1",
                      "image": "/media/images/123/1.png",
                      "ico": "/media/images/123/ico/1.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 933,
                      "name": "3",
                      "image": "/media/images/123/3.png",
                      "ico": "/media/images/123/ico/3.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 934,
                      "name": "números",
                      "image": "/media/images/123/n%C3%BAmeros.png",
                      "ico": "/media/images/123/ico/n%C3%BAmeros.png",
                      "video": "/media/videos/123/n%C3%BAmeros.mp4",
                      "completed": false
                  },
                  {
                      "id": 935,
                      "name": "10",
                      "image": "/media/images/123/10.png",
                      "ico": "/media/images/123/ico/10.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 936,
                      "name": "8",
                      "image": "/media/images/123/8.png",
                      "ico": "/media/images/123/ico/8.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 982,
                      "name": "6",
                      "image": "/media/images/123/6.png",
                      "ico": "/media/images/123/ico/6.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 983,
                      "name": "9",
                      "image": "/media/images/123/9.png",
                      "ico": "/media/images/123/ico/9.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 984,
                      "name": "7",
                      "image": "/media/images/123/7.png",
                      "ico": "/media/images/123/ico/7.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 985,
                      "name": "2",
                      "image": "/media/images/123/2.png",
                      "ico": "/media/images/123/ico/2.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 986,
                      "name": "5",
                      "image": "/media/images/123/5.png",
                      "ico": "/media/images/123/ico/5.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 987,
                      "name": "4",
                      "image": "/media/images/123/4.png",
                      "ico": "/media/images/123/ico/4.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 988,
                      "name": "1",
                      "image": "/media/images/123/1.png",
                      "ico": "/media/images/123/ico/1.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 989,
                      "name": "3",
                      "image": "/media/images/123/3.png",
                      "ico": "/media/images/123/ico/3.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 990,
                      "name": "números",
                      "image": "/media/images/123/n%C3%BAmeros.png",
                      "ico": "/media/images/123/ico/n%C3%BAmeros.png",
                      "video": "/media/videos/123/n%C3%BAmeros.mp4",
                      "completed": false
                  },
                  {
                      "id": 991,
                      "name": "10",
                      "image": "/media/images/123/10.png",
                      "ico": "/media/images/123/ico/10.png",
                      "video": null,
                      "completed": false
                  },
                  {
                      "id": 992,
                      "name": "8",
                      "image": "/media/images/123/8.png",
                      "ico": "/media/images/123/ico/8.png",
                      "video": null,
                      "completed": false
                  }
              ],
              "createdAt": "2024-07-08T01:01:35.959527Z",
              "updatedAt": "2024-07-08T01:01:35.959540Z"
          }
      ],
      "score": null
  }
];

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public userFormControl: FormControl = new FormControl();
  public reports: IReport[] = [];
  public selectedUser!: IReport;

  constructor(private readonly reportService: ReportService) {}

  ngOnInit(): void {
    this.userFormControl = new FormControl();

    this.userFormControl.valueChanges.subscribe({
      next: (result) => {
        this.selectedUser = result;
      },
      error: error => console.error(error)
    });

    this.reportService.getReport().subscribe({
      next: (result: IReport[]) => {
        this.reports = result;
      },
      error: error => console.error(error)
    });
  }

  public selectChange(event: Event): void {
    alert(this.userFormControl.value);
  }
}
