import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})


export class RegistrosComponent implements OnInit {
  folders: Section[] = [ ];

  constructor() { }

  ngOnInit(): void {
    this.folders.push({name:"11:58",updated:new Date('1/1/16')})
    this.folders.push({name:"12:48",updated:new Date('1/1/16')})
    this.folders.push({name:"13:01",updated:new Date('1/1/16')})
    this.folders.push({name:"14:20",updated:new Date('1/1/16')})

  }

}
