import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodolistService } from '../service/todolist.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Task } from '../model/task';
import { DateFormat } from 'src/app/JSON/DateFormat';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTablesResponse } from 'src/app/datatables/datatables-response';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { Notifyservice } from '../service/notifyservice';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers:[DataTablesResponse]
})


export class TodoListComponent implements OnInit {
  dtOptions: any = {};
  PositionsForm: FormGroup;
  dateFormatVar;
  url="/api/task/save"
  submitted = false;
  modalRef: BsModalRef;
  list: Task[];
  tasklist:Task[];
 // dtOptions: any = {};
  dtTrigger = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  minDate = new Date();
 // dtTrigger: Subject<Task> = new Subject();

  constructor(private todoListService: TodolistService,private builder: FormBuilder,private http: HttpClient,
    private dateFormat: DateFormat,private notifyService: Notifyservice,
    public datepipe: DatePipe,
     private modalService: BsModalService,) {

    this.PositionsForm = this.builder.group({
      id: [{ value: '', disabled: true }],
      title: ['', [Validators.required]],
      attachment:['',[]],
      dueDate: ['', [Validators.required]],

    });
   }

  ngOnInit(): void {
    debugger
    this.dateFormat.currentFormat.subscribe(data => { this.dateFormatVar = data });
    this.getAll();


debugger
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      stateSave: true,
      autoWidth: false,
      columnDefs:
      [
      { targets: [0], width: "10%", orderable:false},
      { targets: [1], width: "30%" },
      { targets: [2], width: "30"},
      { targets: [3], width: "30%" },],
        ajax: (dataTablesParameters: any, callback) => {
            this.http
                .post<DataTablesResponse>('/api/tasktable', dataTablesParameters, {})
                .subscribe(resp => {
                  debugger
                    this.list = resp.data;

                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: [],
                    });
                });
        },
        columns: [
            { data: "id" },
            { data: "title" },
            { data: "attachment"},
            { data: "dueDate" },
        ],
    };
}

changeDate(date) {
  debugger
  return this.datepipe.transform(date, 'yyyy-MM-dd');
}
getAll(){
  debugger
this.todoListService.getAll("/api/task/all").subscribe(data =>{
data.forEach(element => {
  debugger
  var br = this.datepipe.transform(element.dueDate, 'yyyy-MM-dd');

  var date = new Date();

  this.dateFormatVar= this.datepipe.transform(date,'yyyy-MM-dd');

 if(br == this.dateFormatVar){
   debugger
   this.notifyService.showSuccess(this.dateFormatVar,element.title)
 }
});
});

  }
  openModal(template: TemplateRef<any>, id) {
    debugger
    this.submitted = false;
    if (id !== '') {//edit
      this.todoListService.getById("/api/task/",id).subscribe(data => {
        if (data != null) {
          debugger
          data.dueDate = new Date(data.dueDate);
          (<FormGroup>this.PositionsForm).setValue(data);
        }
      });
    }
    else { //add new
      this.PositionsForm.reset();
    }
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
  onPostFormSubmit(model: Task, isValid: boolean) {
    this.submitted = true;
    // stop here if form is invalid
    debugger
    if (!isValid) {
      return;
    }
    else {
      this.todoListService.addRecord(model,this.url).subscribe(data => {
        if (data != null) {
          this.modalRef.hide();
          if (model.id == null) {
         //   this.notifyService.showSuccess("Successfully", "Inserted");
          }
          else {
         //   this.notifyService.showSuccess("Successfully", "Updated");
          }

        }
        this.modalRef.hide();
        this.rerender();

      });
    }
  }

  rerender(): void {
    debugger
    if (this.dtElement.dtInstance != undefined) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}

ngAfterViewInit(): void {
  this.dtTrigger.next();
}
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
   this.dtTrigger.unsubscribe();
  }
  get f() {
    return this.PositionsForm.controls;
  }
}
