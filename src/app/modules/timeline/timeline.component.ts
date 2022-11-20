// @ts-ignore

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ActivatedRoute} from "@angular/router";

export interface Pagos_Leasing {
  Number_table: number;
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
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  displayedColumns: string[] = ['Number_table', 'fecha', 'saldo_inicial', 'interes', 'cuota', 'amortizacion', 'seguro', 'costos_y_gastos', 'recompra', 'saldo_final', 'depreciacion', 'ahorro_tributario', 'igv', 'flujo_bruto', 'flujo_con_igv', 'flujo_neto'];
  tabla_datos: Pagos_Leasing[] = [];
  dataSource = this.tabla_datos;

  IGV: number = 18 / 100;
  //Datos del préstamo
  Dato_precio_venta_activo: number = 0;
  Dato_n_anios: number = 0;
  Dato_fecha: string = "";
  Dato_fecuencia_pago_s: string = "";
  Dato_fecuencia_pago: number = 0;
  Dato_n_dias_anio: number = 0;
  Dato_TEA: number = 0;
  Dato_IGV: number = 0;
  Dato_impuesto_renta: number = 0;
  Dato_recompra: number = 0;

  //Costes iniciales
  Costes_notariales: number = 0;
  Costes_registrales: number = 0;
  Coste_tasacion: number = 0;
  Coste_comision_estudio: number = 0;
  Coste_comision_activacion: number = 0;

  //De los gastos periodiocos
  Gasto_comision_periodica: number = 0;
  Gasto_seguro_riesgo: number = 0;
  //Del costo de oportunidad

  // Resultados varibles
  Resultado_IGV: number = 0;
  Resultado_valor_venta_activo: number = 0;
  Resultado_monto_leasing: number = 0;
  Resultado_TEP: number = 0;
  Resultado_n_cuotas_anio: number = 0;
  Resultado_total_cuotas: number = 0;
  Resultado_seguro_riesgo: number = 0;

  //RESULTADO SEGUNDA TABLA- CONTADORES
  Total_Intereses: number = 0
  Total_Amortizacion_del_capital: number = 0
  Total_Seguro_contra_todo_riesgo: number = 0
  Total_Comisiones_periodicas: number = 0
  Total_Recompra: number = 0
  Total_Desembolso: number = 0


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      console.log(params.valorBien)
      this.Dato_precio_venta_activo = Number(params.precioVentaActivo)
      this.Dato_n_anios = Number(params.nAnios)
      this.Dato_fecha = params.dateStart
      this.Dato_fecuencia_pago_s = params.frecuenciaPago
      this.Dato_n_dias_anio = Number(params.diasAnnio)
      this.Dato_TEA = Number(params.tea / 100)
      this.Dato_IGV = Number(params.igv / 100)
      this.Dato_impuesto_renta = Number(params.impuestoRenta / 100)
      this.Dato_recompra = Number(params.recompra / 100)
      this.Costes_notariales = Number(params.costesNotariales)
      this.Costes_registrales = Number(params.costesRegistrales)
      this.Coste_tasacion = Number(params.tasacion)
      this.Coste_comision_estudio = Number(params.comisionEstudio)
      this.Coste_comision_activacion = Number(params.comisionActivacion)
      this.Gasto_comision_periodica = Number(params.comisionPeriodica)
      this.Gasto_seguro_riesgo = Number(params.seguroRiesgo / 100)
    })
    this.actualizarVariables()
    this.creartabladedatos()
  }

  actualizarVariables() {
    //
    if (this.Dato_fecuencia_pago_s == "quincenal") {
      this.Dato_fecuencia_pago = 15
    } else if (this.Dato_fecuencia_pago_s == "mensual") {
      this.Dato_fecuencia_pago = 30
    } else if (this.Dato_fecuencia_pago_s == "bimestral") {
      this.Dato_fecuencia_pago = 60
    } else if (this.Dato_fecuencia_pago_s == "trimestral") {
      this.Dato_fecuencia_pago = 90
    } else if (this.Dato_fecuencia_pago_s == "cuatrimestral") {
      this.Dato_fecuencia_pago = 120
    } else if (this.Dato_fecuencia_pago_s == "semestral") {
      this.Dato_fecuencia_pago = 180
    } else if (this.Dato_fecuencia_pago_s == "anual") {
      this.Dato_fecuencia_pago = 360
    }

    this.Resultado_IGV = this.Dato_precio_venta_activo / (1 + this.Dato_IGV) * this.Dato_IGV
    this.Resultado_valor_venta_activo = this.Dato_precio_venta_activo - this.Resultado_IGV
    this.Resultado_monto_leasing = this.Resultado_valor_venta_activo + (this.Costes_notariales + this.Costes_registrales + this.Coste_tasacion + this.Coste_comision_estudio + this.Coste_comision_activacion)
    this.Resultado_TEP = ((1 + this.Dato_TEA) ** (this.Dato_fecuencia_pago / this.Dato_n_dias_anio)) - 1
    this.Resultado_n_cuotas_anio = this.Dato_n_dias_anio / this.Dato_fecuencia_pago
    this.Resultado_total_cuotas = this.Resultado_n_cuotas_anio * this.Dato_n_anios
    this.Resultado_seguro_riesgo = this.Gasto_seguro_riesgo * this.Dato_precio_venta_activo / this.Resultado_n_cuotas_anio
  }

  creartabladedatos() {
    //'N', 'fecha', 'saldo_inicial', 'interes', 'cuota', 'amortizacion', 'seguro', 'costos_y_gastos'
    //'recompra','saldo_final','depreciacion','ahorro_tributario','igv','flujo_bruto','flujo_con_igv','flujo_neto'
    var mes = [];
    var fecha = [];
    var saldo_inicial = [];
    var interes = [];
    var cuota = [];
    var amortizacion = [];
    var seguro = [];
    var costos_y_gastos = [];
    var recompra = [];
    var saldo_final: number[] = [];
    var depreciacion = [];
    var ahorro_tributario = [];
    var igv = [];
    var flujo_bruto = [];
    var flujo_con_igv = [];
    var flujo_neto = [];


    for (let i = 0; i < this.Resultado_total_cuotas + 1; i++) {
      mes[i] = i;
      var fecha_aux = new Date(this.Dato_fecha);
      fecha_aux.setMonth(fecha_aux.getMonth() + i);
      fecha[i] = fecha_aux;
      if (i == 0) {
        saldo_inicial[0] = 0
        interes[0] = 0
        cuota[0] = 0
        amortizacion[0] = 0
        seguro[0] = 0
        costos_y_gastos[0] = 0
        recompra[0] = 0
        saldo_final[0] = this.Resultado_monto_leasing
        depreciacion[0] = 0
        ahorro_tributario[0] = 0
        igv[0] = 0
        flujo_bruto[0] = this.Resultado_monto_leasing
        flujo_con_igv[0] = this.Resultado_monto_leasing
        flujo_neto[0] = this.Resultado_monto_leasing
      } else if (i != 0) {
        saldo_inicial[i] = saldo_final[i - 1]
        interes[i] = saldo_inicial[i] * this.Resultado_TEP
        amortizacion[i] = this.Resultado_monto_leasing / this.Resultado_total_cuotas
        cuota[i] = interes[i] + amortizacion[i]
        seguro[i] = this.Resultado_seguro_riesgo
        costos_y_gastos[i] = this.Gasto_comision_periodica
        recompra[i] = 0
        if (i == this.Resultado_total_cuotas) {
          recompra[i] = this.Dato_recompra * this.Resultado_valor_venta_activo
        }
        saldo_final[i] = saldo_inicial[i] - amortizacion[i]
        depreciacion[i] = this.Resultado_valor_venta_activo / this.Resultado_total_cuotas
        ahorro_tributario[i] = (interes[i] + seguro[i] + costos_y_gastos[i] + depreciacion[i]) * this.Dato_impuesto_renta
        igv[i] = (cuota[i] + seguro[i] + costos_y_gastos[i] + recompra[i]) * this.Dato_IGV
        flujo_bruto[i] = cuota[i] + seguro[i] + costos_y_gastos[i] + recompra[i]
        flujo_con_igv[i] = flujo_bruto[i] + igv[i]
        flujo_neto[i] = flujo_bruto[i] - ahorro_tributario[i]
      }
      //contadores
      this.Total_Intereses += interes[i]
      this.Total_Amortizacion_del_capital += amortizacion[i]
      this.Total_Recompra += recompra[i]
      this.Total_Seguro_contra_todo_riesgo += seguro[i]
      this.Total_Comisiones_periodicas += costos_y_gastos[i]
    }
    //fixeando decimales
    this.Total_Desembolso = this.Total_Intereses + this.Total_Amortizacion_del_capital + this.Total_Recompra + this.Total_Seguro_contra_todo_riesgo + this.Total_Comisiones_periodicas
    this.Total_Intereses = Number(this.Total_Intereses.toFixed(2))
    this.Total_Amortizacion_del_capital = Number(this.Total_Amortizacion_del_capital.toFixed(2))
    this.Total_Recompra = Number(this.Total_Recompra.toFixed(2))
    this.Total_Seguro_contra_todo_riesgo = Number(this.Total_Seguro_contra_todo_riesgo.toFixed(2))
    this.Total_Comisiones_periodicas = Number(this.Total_Comisiones_periodicas.toFixed(2))
    //contador final
    this.Total_Desembolso =Number(this.Total_Desembolso.toFixed(2))
    //for para fixear datos
    for (let i = 0; i < this.Resultado_total_cuotas + 1; i++) {

      interes[i] = Number((Number(interes[i])).toFixed(2))
      ahorro_tributario[i] = Number((Number(ahorro_tributario[i])).toFixed(2))
      amortizacion[i] = Number((Number(amortizacion[i])).toFixed(2))
      costos_y_gastos[i] = Number((Number(costos_y_gastos[i])).toFixed(2))
      cuota[i] = Number((Number(cuota[i])).toFixed(2))
      depreciacion[i] = Number((Number(depreciacion[i])).toFixed(2))
      flujo_bruto[i] = Number((Number(flujo_bruto[i])).toFixed(2))
      flujo_con_igv[i] = Number((Number(flujo_con_igv[i])).toFixed(2))
      flujo_neto[i] = Number((Number(flujo_neto[i])).toFixed(2))
      igv[i] = Number((Number(igv[i])).toFixed(2))
      recompra[i] = Number((Number(recompra[i])).toFixed(2))
      saldo_final[i] = Number((Number(saldo_final[i])).toFixed(2))
      saldo_inicial[i] = Number((Number(saldo_inicial[i])).toFixed(2))
      seguro[i] = Number((Number(seguro[i])).toFixed(2))

      let formattedDate = (moment(fecha[i])).format('DD-MMM-YYYY')
      //'N', 'fecha', 'saldo_inicial', 'interes', 'cuota', 'amortizacion', 'seguro', 'costos_y_gastos'
      //'recompra','saldo_final','depreciacion','ahorro_tributario','igv','flujo_bruto','flujo_con_igv','flujo_neto'
      this.tabla_datos.push({
        Number_table: mes[i],
        fecha: formattedDate,
        interes: interes[i],
        ahorro_tributario: ahorro_tributario[i],
        amortizacion: amortizacion[i],
        costos_y_gastos: costos_y_gastos[i],
        cuota: cuota[i],
        depreciacion: depreciacion[i],
        flujo_bruto: flujo_bruto[i],
        flujo_con_igv: flujo_con_igv[i],
        flujo_neto: flujo_neto[i],
        igv: igv[i],
        recompra: recompra[i],
        saldo_final: saldo_final[i],
        saldo_inicial: saldo_inicial[i],
        seguro: seguro[i],
      })

    }
  }
}
