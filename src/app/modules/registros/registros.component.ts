import { Component, OnInit } from '@angular/core';
import {RecordScheduleService} from "../../services/recordSchedule.service";

export interface Section {
  id: number;
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

  constructor(private recordScheduleService: RecordScheduleService) { }

  ngOnInit(): void {
    this.recordScheduleService.getAll().subscribe(
      (response:any) => {
        console.log(response);
        response.forEach((element:any) => {
          this.folders.push({id: element.id, name: element.fecha
            , updated: element.fecha});
        });
      });

  }
  goToSchedule(id: number){
    this.recordScheduleService.getAll().subscribe(
      (response:any) => {
        response.forEach((element:any) => {
          if(element.id == id){

          }
        });
      }
    )
  }

}
