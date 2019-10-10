import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/modules/material.module';
import { TrainingManagerComponent } from './training-manager.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { CommonModule } from '@angular/common';

import { CurrentEntryComponent } from '../entries/current-entry/current-entry.component';
import { EntryDetailEditComponent } from '../entries/current-entry/entry-detail-edit.component';
import { CreateExerciseComponent } from '../exercises/create-exercise/create-exercise.component';

import { ExercisesComponent } from '../exercises/exercises.component';
import { EntriesComponent } from '../entries/entries.component';
import { EditExerciseComponent } from '../exercises/edit-exercise/edit-exercise.component';
import { AuthGuard } from '../_guards/auth.guards';
import { DeleteButtonComponent } from '../shared/components/delete-button/delete-button.component';
import { EditButtonComponent } from '../shared/components/edit-button/edit-button.component';
import { AppButtonComponent } from '../shared/components/app-button/app-button.component';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDirective } from '../shared/directives/confirm.directive';

const routes: Routes = [
  {
    path: '', component: TrainingManagerComponent,
    children: [
      { path: 'current-entry', component: CurrentEntryComponent, canActivate: [AuthGuard] },
      { path: 'edit-entry', component: EntryDetailEditComponent, canActivate: [AuthGuard] },
      { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuard] },
      { path: 'create-exercise', component: CreateExerciseComponent, canActivate: [AuthGuard] },
      { path: 'edit-exercise', component: EditExerciseComponent, canActivate: [AuthGuard] },
      { path: 'entries', component: EntriesComponent, canActivate: [AuthGuard] },

      { path: '', component: MainContentComponent, canActivate: [AuthGuard]}
    ]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    TrainingManagerComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    CurrentEntryComponent,
    ExercisesComponent,
    CreateExerciseComponent,
    EditExerciseComponent,
    EntryDetailEditComponent,
    EntriesComponent,
    AppButtonComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    ConfirmDialogComponent,
    ConfirmDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class TrainingManagerModule { }
