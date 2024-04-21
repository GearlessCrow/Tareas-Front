import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareasListComponent } from './components/tareas-list/tareas-list.component';
import { TareasFormComponent } from './components/tareas-form/tareas-form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'inicio', component: HomeComponent},
  { path: 'tareas', component: TareasListComponent},
  { path: 'tareas/nueva', component: TareasFormComponent },
  { path: 'tareas/:id/editar', component: TareasFormComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
