import { Component, OnInit } from '@angular/core';
export interface Pagos {
  fecha: string;
  mes: number;
  deuda: number;
  amort: number;
  interes:number;
  cuota: number;
  IGV: number;
  cuota_con_igv: number;
}
const DATA: Pagos[] = [
  {mes: 1, fecha: '10/11/12', deuda: 1.0079, amort: 43, interes: 34, cuota:20 ,IGV: 43, cuota_con_igv:20},
  {mes: 2, fecha: '10/11/12', deuda: 4.0026, amort: 43, interes: 34, cuota:20 ,IGV: 43, cuota_con_igv:20},
  {mes: 3, fecha: '10/11/12', deuda: 6.941, amort: 43, interes: 34, cuota:20 ,IGV: 43, cuota_con_igv:20},
  {mes: 4, fecha: '10/11/12', deuda: 9.0122, amort: 43, interes: 34, cuota:20 ,IGV: 43, cuota_con_igv:20},
  {mes: 5, fecha: '10/11/12', deuda: 10.811, amort: 43, interes: 34, cuota:20 ,IGV: 43, cuota_con_igv:20},
  {mes: 6, fecha: '10/11/12', deuda: 12.0107,amort: 43, interes: 34, cuota:20 ,IGV: 43, cuota_con_igv:20},
  {mes: 7, fecha: '10/11/12', deuda: 14.0067,amort: 43, interes: 34, cuota:20 ,IGV: 43, cuota_con_igv:20},
  {mes: 8, fecha: '10/11/12', deuda: 15.9994,amort: 43, interes: 34, cuota:20 ,IGV: 43, cuota_con_igv:20},
  {mes: 9, fecha: '10/11/12', deuda: 18.9984,amort: 43, interes: 34, cuota:20 ,IGV: 43, cuota_con_igv:20},
  {mes: 10,fecha: '10/11/12', deuda: 20.1797, amort: 43, interes: 34, cuota:20 ,IGV: 43, cuota_con_igv:20},
];

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  //Mes	Fecha	Deuda	Amort.	Interés	Cuota	IGV	      Cuota con IGV
  displayedColumns: string[] = ['mes', 'fecha', 'deuda', 'amort','interes','cuota','IGV','cuota_con_igv'];
  dataSource = DATA;
}
