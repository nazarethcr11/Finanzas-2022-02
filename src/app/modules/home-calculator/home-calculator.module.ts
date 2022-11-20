import {Route, RouterModule} from "@angular/router";
import {HomeCalculatorComponent} from "./home-calculator.component";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";

const homeCalculatorRoutes: Route[] = [
  {
    path: '',
    component: HomeCalculatorComponent
  }
]

@NgModule({
  declarations: [
    HomeCalculatorComponent,
  ],
    imports: [
        RouterModule.forChild(homeCalculatorRoutes),
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        CommonModule,
        MatDatepickerModule,
        MatIconModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatToolbarModule,

    ]
})

export class HomeCalculatorModule
{
}
