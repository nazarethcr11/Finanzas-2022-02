import { Component, OnInit } from '@angular/core';
import {RecordScheduleService} from "../../services/recordSchedule.service";
import {Router} from "@angular/router";

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

  constructor(private recordScheduleService: RecordScheduleService, private router: Router) { }

  ngOnInit(): void {
    this.recordScheduleService.getAll().subscribe(
      (response:any) => {
        response.forEach((element:any) => {
          if(element.usuarioid == localStorage.getItem('id')){
            this.folders.push({id: element.id, name: element.fecha
              , updated: element.fecha});
          }

        });
      });

  }
  goToSchedule(id: number){
    this.recordScheduleService.getAll().subscribe(
      (response:any) => {
        response.forEach((element:any) => {
          if(element.id == id) {
            localStorage.setItem('recordScheduleId', element.id);
            // go to timeline-view
            this.router.navigate(['/timeline-view']);
          }
        });
      }
    )
  }

}
