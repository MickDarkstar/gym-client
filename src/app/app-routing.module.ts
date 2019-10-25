import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Va något knas med att köra lazy loading för denna module?
const routes: Routes = [
  { path: 'training', loadChildren: () => import('./training-manager/training-manager.module').then(m => m.TrainingManagerModule)},
  { path: 'user', loadChildren: () => import('./user-manager/user-manager.module').then(m => m.UserManagerModule) },
  { path: '**', redirectTo: 'training' }
];
// https://www.youtube.com/watch?v=7JA90VI9fAI
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
