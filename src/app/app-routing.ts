import {Routes} from "@angular/router";

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: async () => import('src/app/example/example.component'),
  }
]
