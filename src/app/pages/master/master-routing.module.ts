import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ImportanttaskComponent } from '../importanttask/importanttask.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { MasterComponent } from './master.component';

const routes: Routes = [
  {
    path: 'todolist',
    component: MasterComponent,

children: [

  {
     path: '',
     component:HomeComponent
  },

]


},
{
  path: '/important',
  component: ImportanttaskComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }
