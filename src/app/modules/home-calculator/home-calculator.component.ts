import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

    precioVentaActivo: new FormControl(0, [Validators.required]),
    nAnios: new FormControl(0,[Validators.required]),
    dateStart: new FormControl('',[Validators.required]),
    frecuenciaPago: new FormControl('', [Validators.required]),
    diasAnnio: new FormControl('',[Validators.required]),
    tea: new FormControl(0,[Validators.required]),
    igv: new FormControl(0,[Validators.required]),
    impuestoRenta: new FormControl(0,[Validators.required]),
    recompra: new FormControl(0,[Validators.required]),
    costesNotariales: new FormControl(0,[Validators.required]),
    costesRegistrales: new FormControl(0,[Validators.required]),
    tasacion: new FormControl(0,[Validators.required]),
    comisionEstudio: new FormControl(0,[Validators.required]),
    comisionActivacion: new FormControl(0,[Validators.required]),
    comisionPeriodica: new FormControl(0,[Validators.required]),
    seguroRiesgo: new FormControl(0,[Validators.required]),

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

