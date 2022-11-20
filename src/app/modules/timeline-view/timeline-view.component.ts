// @ts-ignore

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {ActivatedRoute} from "@angular/router";
import {ScheduleService} from "../../services/schedule.service";
import {RecordScheduleService} from "../../services/recordSchedule.service";
import {SchedulePost} from "../../models/schedulePost";
import {RecordSchedulePost} from "../../models/recordSchedulePost";
import {DatePipe} from "@angular/common";
import {Schedule} from "../../models/schedule";
import {MatTable, MatTableModule} from "@angular/material/table";

export interface Pagos_Leasing {
  number_table: number;
  fecha: string;
  saldo_inicial: number;
  interes: number;
  cuota: number;
  amortizacion: number;
  seguro:number;
  costos_y_gastos:number;
  recompra:number;
  saldo_final: number;
  depreciacion: number;
  ahorro_tributario:number;
  igv: number;
  flujo_bruto: number;
  flujo_con_igv:number;
  flujo_neto:number
}
@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.css'],
  providers: [DatePipe]
})
export class TimelineViewComponent implements OnInit, AfterViewInit{
  @ViewChild('myTable') myTable!: MatTable<any>;
  displayedColumns: string[] = ['Number_table', 'fecha', 'saldo_inicial', 'interes', 'cuota', 'amortizacion', 'seguro', 'costos_y_gastos', 'recompra', 'saldo_final', 'depreciacion', 'ahorro_tributario', 'igv', 'flujo_bruto', 'flujo_con_igv', 'flujo_neto'];
  tabla_datos: Schedule[] = [];
  dataSource = this.tabla_datos;
  Total_Intereses: number = 0;
  Total_Amortizacion_del_capital: number = 0;
  Total_Seguro_contra_todo_riesgo: number = 0;
  Total_Comisiones_periodicas: number = 0;
  Total_Recompra: number = 0;
  Total_Desembolso: number = 0;

  constructor(private recordScheduleService: RecordScheduleService, private scheduleService: ScheduleService){

  }

  ngOnInit() {
    this.recordScheduleService.getAll().subscribe(

      (response:any) => {

        response.forEach((element:any) => {
          let id = localStorage.getItem('recordScheduleId');
          if(element.id == id){
            this.Total_Intereses = element.total_intereses;
            this.Total_Amortizacion_del_capital = element.total_amortizacion;
            this.Total_Seguro_contra_todo_riesgo = element.total_seguro;
            this.Total_Comisiones_periodicas = element.comisiones;
            this.Total_Recompra = element.recompra;
            this.Total_Desembolso = element.desembolso;
            this.scheduleService.range(element.initialScheduleid, element.finalScheduleid).subscribe(
              (response2:any) => {
                response2.forEach((element2:any) => {
                  this.dataSource.push(element2);
                });

                this.myTable.renderRows();
              }
            );
          }
        });
      });
  }
  ngAfterViewInit() {

  }

  guardar(){
    console.log(this.dataSource)
  }
}
