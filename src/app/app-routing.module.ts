import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListCarsComponent } from './list-cars/list-cars.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'list', component: ListCarsComponent},
  {path: 'register' , component:RegisterComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
