import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ImportanttaskComponent } from './pages/importanttask/importanttask.component';
import { MasterComponent } from './pages/master/master.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/todolist', pathMatch: 'full' },
  { path: 'todolist', component: MasterComponent, pathMatch: 'full' },
  { path: 'important', component: ImportanttaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
