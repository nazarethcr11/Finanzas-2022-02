import {Route, RouterModule} from "@angular/router";
import {TimelineComponent} from "./timeline.component";
import {NgModule} from "@angular/core";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

const timeLineModule: Route[] = [
  {
    path: '',
    component: TimelineComponent
  }
]

@NgModule({
  declarations: [
    TimelineComponent,
  ],
  imports: [
    RouterModule.forChild(timeLineModule),
    MatCardModule,
    MatButtonModule,
  ]
})

export class TimelineModule
{
}
