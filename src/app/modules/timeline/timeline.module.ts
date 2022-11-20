import {Route, RouterModule} from "@angular/router";
import {TimelineComponent} from "./timeline.component";
import {NgModule} from "@angular/core";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";

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
        MatTableModule,
        MatToolbarModule,
    ]
})

export class TimelineModule
{
}
