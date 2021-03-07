import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DateFormat } from 'src/app/JSON/DateFormat';
import { steps } from '../model/step';
import { Task } from '../model/task';
import { Notifyservice } from '../service/notifyservice';
import { TodolistService } from '../service/todolist.service';

@Component({
  selector: 'app-importanttask',
  templateUrl: './importanttask.component.html',
  styleUrls: ['./importanttask.component.css']
})
export class ImportanttaskComponent implements OnInit {
  PositionsForm: FormGroup;
  dateFormatVar;
  title;id;
  tasklist:Task;
  stepsAlll: steps[]=[];
  url="/api/task/save"
  submitted = false;
  list: Task[]=[];
  isActive:boolean=false;
  importantCheck:boolean=false;
  selectedDueDate;
  minDate = new Date();
  addTask:boolean=false;
  GlobalTaskData;
  addSteps:boolean=false;
  StepsForm: FormGroup;
  DueDate=[];
  datepicker:boolean=false;
  showDateDropdown:boolean=true;
  constructor(private todoListService: TodolistService,private builder: FormBuilder,private http: HttpClient,
    private dateFormat: DateFormat,private notifyService: Notifyservice,
    public datepipe: DatePipe,private toastr: ToastrService,
     private modalService: BsModalService,) {

    this.PositionsForm = this.builder.group({
      id: [{ value: '', disabled: true }],
      title: ['', [Validators.required]],
      attachment:['',[]],
      dueDate: ['', []],

    });
   }

   ngOnInit(): void {
    this.getAll();
   }
   getAll(){
     debugger
   this.todoListService.getAllTask("/api/task/all/","I").subscribe(data =>{
 this.list = data;

   });
   this.addTask=false;
 }
 saveImportant(Id){
  debugger
  let mylist = new Task();
  mylist.id= Id;
  this.todoListService.getById("/api/task/",Id).subscribe(data=>{
    mylist = data;
    if(mylist.important == false){
      debugger
      mylist.important= true
      this.isActive=false;
    }
    else{
      debugger
      mylist.important= false;
      this.isActive=false;
    }
    this.todoListService.addRecord(mylist,this.url).subscribe(data => {
      if (data != null) {



      }
  this.addTask=false;


    });

  })
  this.getAll();

 }
 AddTask(){
  debugger
  this.addTask = true;
  console.log(this.addTask)
}

SaveTitle(event) {
  debugger
  //this.submitted = true;
  // stop here if form is invalid
  debugger
  let mylist = new Task();

 mylist.title= event.target.value;
    this.todoListService.addRecord(mylist,this.url).subscribe(data => {
      if (data != null) {



      }
  this.addTask=false;


    });

}
openNav(list) {
  debugger
  this.title= list.title;
  this.id = list.id;
  this.todoListService.getById("/api/task/",this.id).subscribe(data =>{
    if(data.important == 1){
      debugger
      this.importantCheck=true;
      this.isActive=true;
    }


  })
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";

}

 closeNav() {
   debugger
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginRight= "0";
}

deleteStep(step){
  debugger

  this.todoListService.deleteRecord(step.id,"/api/step/").subscribe(result => {
    debugger
    this.toastr.warning("Step is deleted ")
    this.openNav(this.GlobalTaskData);
  });


}

onSelectedDueDate(id, name){
debugger
if(id == 3){
this.datepicker=true;
this.showDateDropdown=false;
}
this.selectedDueDate;
debugger
}

onSelectedDate(date){
  debugger
  let lis = new Task();

  lis= this.GlobalTaskData;
  lis.dueDate= date;

  this.todoListService.addRecord(lis,this.url).subscribe(data => {
    if (data.id != null) {
      this.toastr.success("updated successfully")
    }
  })



    }
    addStep(){
      this.addSteps=true;
        }

        saveStep(event) {
          debugger
          this.submitted = true;
          // stop here if form is invalid
          debugger
          let step = new steps();

          step.title= event.target.value;
          step.task=null;
          step.id=null;

         var obj={
          step,
      idTask: this.id,


         }
       //  Steps.title= event.target.value;
            this.todoListService.addRecord(obj,"/api/step").subscribe(data => {
              if (data != null) {
      this.toastr.success("Step Added Successfully")
                this.todoListService.getAllTask("/api/step/",this.id).subscribe(data=>{
                  this.stepsAlll=data;})

              }
          this.addSteps=false;


            });

        }

}
