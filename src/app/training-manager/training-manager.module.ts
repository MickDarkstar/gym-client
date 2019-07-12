import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/modules/material.module';
import { TrainingManagerComponent } from './training-manager.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CommonModule } from '@angular/common';

import { CurrentEntryComponent } from '../entries/current-entry/current-entry.component';
import { ExercisesComponent } from '../exercises/exercises.component';
import { EntriesComponent } from '../entries/entries.component';
import { EditExerciseComponent } from '../exercises/edit-exercise/edit-exercise.component';
import { CreateExerciseComponent } from '../exercises/create-exercise/create-exercise.component';

const routes: Routes = [
  {
    path: '', component: TrainingManagerComponent,
    children: [
      { path: 'current-entry', component: CurrentEntryComponent },
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [TrainingManagerComponent, ToolbarComponent, MainContentComponent, SidenavComponent, CurrentEntryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TrainingManagerModule { }
