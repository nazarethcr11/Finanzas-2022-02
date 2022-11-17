// @ts-ignore

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HomeCalculatorComponent} from "../home-calculator/home-calculator.component";

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
  displayedColumns: string[] = ['mes', 'fecha', 'deuda', 'amort', 'interes', 'cuota', 'IGV', 'cuota_con_igv'];
  tabla_datos: Pagos[] = [];
  dataSource = this.tabla_datos;

  IGV: number= 18/100;

  // variables de la formula
  Mes_tentativo_de_activacion: string = "2022-11-01";
  Moneda: string = "soles";
  Tipo_de_bien: string = "inmueble";
  Plazo: number = 10;
  TEA: number = 12/100;
  Valor_del_bien_igv: number = 118000;
  Seguro_igv: number = 0;
  Cuota_inicial_igv: number = 20/100;
  Comision_de_estructuracion: number = 1/100;
  Opcion_de_compra: number = 1/100;

  //datos que pertenecen a la tabla inicial
  Valor_del_bien: number = 0;
  Seguro: number = 0;
  Cuota_Inicial: number = 0;
  Riesgo_neto: number = 0;
  Total_monto_operacion_igv: number = 0;
  Total_monto_operacion: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.actualizarVariables()
    this.creartabladedatos()
  }

  actualizarVariables() {
    //valor_del_bien
    if (this.Tipo_de_bien == "inmueble") {
      this.Valor_del_bien = this.Valor_del_bien_igv
    } else {
      this.Valor_del_bien = this.Valor_del_bien_igv / (1 + this.IGV)
    }
    //seguro
    this.Seguro = this.Seguro_igv / (1 + this.IGV)
    //cuota inicial sin igv

    this.Cuota_Inicial = (this.Valor_del_bien + this.Seguro) * this.Cuota_inicial_igv
    //riesgo neto
    this.Riesgo_neto = this.Valor_del_bien + this.Seguro + this.Cuota_Inicial
    //total monto operacion igv
    this.Total_monto_operacion_igv = this.Valor_del_bien_igv + this.Seguro_igv
    //total monto operacion
    this.Total_monto_operacion = this.Valor_del_bien + this.Seguro
  }

  creartabladedatos() {
    var cuota_mensual: number=0;

    var mes = [];
    var fecha = [];
    var deuda: number[] = [];
    var amort=[];
    let interes:number[]=[];
    var cuota=[];
    var igv=[];
    var cuota_con_igv=[];

    var dias=[];
    var diasacumulados:number[]=[]
    var factor: number=0;
    for (let i = 0; i < this.Plazo+1; i++) {
      mes[i] = i;
      var fecha_aux = new Date(this.Mes_tentativo_de_activacion);
      fecha_aux.setMonth(fecha_aux.getMonth()+i);
      fecha[i]=fecha_aux;
      if (i==0){
        dias[i]=0
        diasacumulados[i]=0
        factor=0
      }
      else if (i!=0){
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        dias[i]=(fecha[i].getTime()-fecha[i-1].getTime())/day
        diasacumulados[i]=diasacumulados[i-1]+dias[i]
        factor += (1 / ((1 + this.TEA) ** (diasacumulados[i] / 360)))
      }
    }
    cuota_mensual=(this.Total_monto_operacion-this.Cuota_Inicial)/factor
    //segundo for para terminar de completar la tabla y lo paso a la lista principal
    for (let i = 0; i < this.Plazo+1; i++) {
      if (i==0){
        deuda[i]=this.Total_monto_operacion
        amort[i]=this.Cuota_Inicial
        interes[i]=0
        cuota[i]=amort[i]+interes[i]
      }
      else if(i!=0){
        deuda[i]=Number((deuda[i-1]-amort[i-1]).toFixed(2))
        interes[i]=Number((deuda[i]*(((1+this.TEA)**(dias[i]/360))-1)).toFixed(2))

        cuota[i]=Number((cuota_mensual).toFixed(2))
        amort[i]=Number((cuota[i]-interes[i]).toFixed(2))
      }
      igv[i]=Number((cuota[i]*this.IGV).toFixed(2))
      cuota_con_igv[i]=Number((cuota[i]+igv[i]).toFixed(2))
      let formattedDate = (moment(fecha[i])).format('DD-MMM-YYYY')

      this.tabla_datos.push({IGV: igv[i], amort: amort[i], cuota: cuota[i], cuota_con_igv: cuota_con_igv[i], deuda: deuda[i], fecha: formattedDate, interes: interes[i], mes:mes[i]})
    }

  }
}
