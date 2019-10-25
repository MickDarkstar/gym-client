import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@src/app/user-manager/login/login.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@src/app/shared/modules/material.module';
import { ReactiveFormsModule  } from '@angular/forms'

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class UserManagerModule { }
