import {Route} from "@angular/router";

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home_calculator', loadChildren: () => import('src/app/modules/home-calculator/home-calculator.module').then(m => m.HomeCalculatorModule)},
  { path: 'timeline', loadChildren: () => import('src/app/modules/timeline/timeline.module').then(m => m.TimelineModule)},
  { path: 'home', loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule)},
  { path: 'register', loadChildren: () => import('src/app/modules/register/register.module').then(m => m.RegisterModule)},
];
