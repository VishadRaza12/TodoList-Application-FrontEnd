import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ImportanttaskComponent } from '../importanttask/importanttask.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

@NgModule({
  declarations: [MasterComponent,
    SideBarComponent,
    HomeComponent,
    ImportanttaskComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),

  ],
  exports:[
    BsDatepickerModule
  ]
})
export class MasterModule { }
