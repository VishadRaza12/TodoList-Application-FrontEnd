import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { BsModalRef,ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { MasterComponent } from './pages/master/master.component';
import { HomeComponent } from './pages/home/home.component';
import { ImportanttaskComponent } from './pages/importanttask/importanttask.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    SideBarComponent,
    MasterComponent,
    HomeComponent,
    ImportanttaskComponent
  ],
  imports: [
    PerfectScrollbarModule,
    DataTablesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    RouterModule,
    SelectDropDownModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
  ],
  exports:[
    BsDatepickerModule,
  ],
  providers: [   BsModalRef, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
