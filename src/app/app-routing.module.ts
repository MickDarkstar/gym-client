import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Va något knas med att köra lazy loading för denna module?
const routes: Routes = [
  { path: 'training', loadChildren: './training-manager/training-manager.module#TrainingManagerModule' },
  { path: 'user', loadChildren: './user-manager/user-manager.module#UserManagerModule' },
  { path: '**', redirectTo: 'training' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
