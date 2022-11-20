import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TimelineViewComponent} from "./timeline-view.component";

const timeLineViewModule: Route[] = [
  {
    path: '',
    component: TimelineViewComponent
  }
]

@NgModule({
  declarations: [
    TimelineViewComponent,
  ],
  imports: [
    RouterModule.forChild(timeLineViewModule),
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
  ]
})

export class TimelineViewModule
{
}
