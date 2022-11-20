import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatNativeDateModule} from "@angular/material/core";
import {NavBarComponent} from "./nav-bar.component";
import {MatToolbarModule} from "@angular/material/toolbar";

const navBarRoutes: Route[] = [
  {
    path: '',
    component: NavBarComponent
  }
]

@NgModule({
  declarations: [
    NavBarComponent,
  ],
  exports: [
    NavBarComponent
  ],
  imports: [
    RouterModule.forChild(navBarRoutes),
    FormsModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,

  ]
})

export class NavBarModule
{
}
