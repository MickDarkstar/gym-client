import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

// const routes: Routes = [
//   { path: 'training', loadChildren: './training-manager/training-manager.module#TrainingManagerModule' },
//   { path: '**', redirectTo: 'training' }
// ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
