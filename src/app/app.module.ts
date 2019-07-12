import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';

// const routes: Routes = [
//   { path: 'start', loadChildren: './training-manager/training-manager.module#TrainingManagerModule' },
//   { path: '**', redirectTo: 'start' }
// ];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
