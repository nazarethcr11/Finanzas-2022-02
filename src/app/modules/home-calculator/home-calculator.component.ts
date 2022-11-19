import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

interface DiasAnio {
  value: string;
  viewValue: string;
}
interface Frecuencia {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-calculator',
  templateUrl: './home-calculator.component.html',
  styleUrls: ['./home-calculator.component.css']
})
export class HomeCalculatorComponent implements OnInit {


  calculateFormGroup = new FormGroup({

    precioVentaActivo: new FormControl(0),
    nAnios: new FormControl(0),
    dateStart: new FormControl(''),
    frecuenciaPago: new FormControl(0),
    diasAnnio: new FormControl(0),
    tea: new FormControl(0),
    igv: new FormControl(0),
    impuestoRenta: new FormControl(0),
    recompra: new FormControl(0),
    costesNotariales: new FormControl(0),
    costesRegistrales: new FormControl(0),
    tasacion: new FormControl(0),
    comisionEstudio: new FormControl(0),
    comisionActivacion: new FormControl(0),
    comisionPeriodica: new FormControl(0),
    seguroRiesgo: new FormControl(0),
    tasaDescuentoKs: new FormControl(0),
    tasaDescuentoWacc: new FormControl(0),

  })

  diasAnios: DiasAnio[] = [
    {value: '360', viewValue: '360'},
    {value: '365', viewValue: '365'},
  ];
  frecuencias: Frecuencia[] = [
    {value: 'quincenal', viewValue: 'Quincenal'},
    {value: 'mensual', viewValue: 'Mensual'},
    {value: 'bimestral', viewValue: 'Bimestral'},
    {value: 'trimestral', viewValue: 'Trimestral'},
    {value: 'cuatrimestral', viewValue: 'Cuatrimestral'},
    {value: 'semestral', viewValue: 'Semestral'},
    {value: 'anual', viewValue: 'Anual'},
  ];
  dateStart = new FormControl(new Date());


  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  calculate(){
    console.log(this.calculateFormGroup.value);
    this.route.navigate(['/timeline'],{queryParams: this.calculateFormGroup.value});
  }
}

