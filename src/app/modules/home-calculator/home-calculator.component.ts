import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

interface Moneda {
  value: string;
  viewValue: string;
}
interface Bien {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-calculator',
  templateUrl: './home-calculator.component.html',
  styleUrls: ['./home-calculator.component.css']
})
export class HomeCalculatorComponent implements OnInit {
  selectedMoneda: string = "";
  selectedTypeBien: string ="";


  calculateFormGroup = new FormGroup({
    dateStart: new FormControl(''),
    moneda: new FormControl(0),
    tipoDeBien: new FormControl(0),
    plazoEnMeses: new FormControl(0),
    tea: new FormControl(0),
    valorBien: new FormControl(0),
    seguroIgv: new FormControl(0),
    cuotaInicial: new FormControl(0),
    comisionDeEstructuracion: new FormControl(0),
    opcionDeCompra: new FormControl(0),
  })

  monedas: Moneda[] = [
    {value: 'soles', viewValue: 'Soles'},
    {value: 'dolares', viewValue: 'Dolares'},
  ];
  bienes: Bien[] = [
    {value: 'vehiculo', viewValue: 'Vehiculo'},
    {value: 'maquinaria y equipo', viewValue: 'Maquinaria y equipo'},
    {value: 'inmueble', viewValue: 'Inmueble'},
    {value: 'otros', viewValue: 'Otros'},
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

