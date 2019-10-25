import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@src/app/shared/modules/material.module';
import { TrainingManagerComponent } from '@src/app/training-manager/training-manager.component';
import { ToolbarComponent } from '@src/app/toolbar/toolbar.component';
import { MainContentComponent } from '@src/app/main-content/main-content.component';
import { SidenavComponent } from '@src/app/sidenav/sidenav.component';
import { CommonModule } from '@angular/common';

import { CurrentEntryComponent } from '@src/app/entries/current-entry/current-entry.component';
import { EntryDetailEditComponent } from '@src/app/entries/current-entry/entry-detail-edit.component';
import { CreateExerciseComponent } from '@src/app/exercises/create-exercise/create-exercise.component';

import { ExercisesComponent } from '@src/app/exercises/exercises.component';
import { EntriesComponent } from '@src/app/entries/entries.component';
import { EditExerciseComponent } from '@src/app/exercises/edit-exercise/edit-exercise.component';
import { AuthGuard } from '@src/app/_guards/auth.guards';
import { EditButtonComponent } from '@src/app/shared/components/edit-button/edit-button.component';
import { AppButtonComponent } from '@src/app/shared/components/app-button/app-button.component';
import { ConfirmDialogComponent } from '@src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDirective } from '@src/app/shared/directives/confirm.directive';
import { ConfirmButtonComponent } from '@src/app/shared/components/delete-button/confirm-button.component';

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

      { path: '', component: MainContentComponent, canActivate: [AuthGuard] }
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
    ConfirmButtonComponent,
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
