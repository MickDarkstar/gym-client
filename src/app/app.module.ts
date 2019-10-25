import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from '@src/app/app.component';
import { AuthService } from '@src/app/shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@src/app/shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ApiInterceptor } from '@src/app/_helpers/api.interceptor';
import { TokenInterceptor } from '@src/app/_helpers/token.interceptor';
import { ErrorInterceptor } from '@src/app/_helpers/error.interceptor';
import { AutoGeneratedComponent } from '@src/app/auto-generated/auto-generated.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoGeneratedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(
      {
        autoDismiss: true,
        tapToDismiss: true
      }
    ),
    HttpClientModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
