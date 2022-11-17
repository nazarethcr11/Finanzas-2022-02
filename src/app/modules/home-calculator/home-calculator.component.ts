import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

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

  monedas: Moneda[] = [
    {value: 'soles-0', viewValue: 'Soles'},
    {value: 'dolares-1', viewValue: 'Dolares'},
  ];
  bienes: Bien[] = [
    {value: 'vehiculo-0', viewValue: 'Vehiculo'},
    {value: 'maquinaria y equipo-1', viewValue: 'Maquinaria y equipo'},
    {value: 'inmueble-2', viewValue: 'Inmueble'},
    {value: 'otros-3', viewValue: 'Otros'},
  ];
  dateStart = new FormControl(new Date());

  constructor() { }

  ngOnInit(): void {
  }
}

