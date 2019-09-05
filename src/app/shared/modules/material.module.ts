import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, } from '@angular/material/sidenav';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
