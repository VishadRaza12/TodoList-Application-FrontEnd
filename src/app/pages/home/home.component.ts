import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DateFormat } from 'src/app/JSON/DateFormat';
import { steps } from '../model/step';
import { Task } from '../model/task';
import { Notifyservice } from '../service/notifyservice';
import { TodolistService } from '../service/todolist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dtOptions: any = {};
  PositionsForm: FormGroup;
  isActive:boolean=false;
  isCompleted:boolean=true;
  dateFormatVar;
  title;id;
  url="/api/task/save"
  submitted = false;
  modalRef: BsModalRef;
  list: Task[]=[];
  stepsAlll: steps[]=[];
  idTask;
  GlobalTaskData;
  importantCheck:boolean=false;
  tasklist:Task;
  addSteps:boolean=false;
  addTask:boolean=false;
  StepsForm: FormGroup;
  DueDate=[];
  datepicker:boolean=false;
  showDateDropdown:boolean=true;
  selectedDueDate;
  listCompleted;

  minDate= new Date();
  constructor(private todoListService: TodolistService,private builder: FormBuilder,private http: HttpClient,
    private dateFormat: DateFormat,private notifyService: Notifyservice,
    public datepipe: DatePipe,private toastr: ToastrService,
     private modalService: BsModalService,
     ) {

    this.PositionsForm = this.builder.group({
      id: [{ value: '', disabled: true }],
      title: ['', [Validators.required]],
      attachment:['',[]],
      dueDate: ['', []],

    });
    this.StepsForm = this.builder.group({
      step: this.builder.group({
        id: [{ value: '', disabled: true }],
        title: ['', [Validators.required]],
       task: [[]],
      }),
    idTask:[[]],
    })

   }


  ngOnInit(): void {
    debugger
   this.getAll();
   this.getCompleted();

  }
  getAll(){
    debugger
    let a;
  this.todoListService.getAllTask("/api/task/all/","T").subscribe(data =>{
this.list = data;
this.list.forEach(obj=>{

  console.log(new Date())
  let d = new Date().toISOString();

 d=d.split('T')[0];
 a=obj.dueDate;
 if(a!=null){
 a=a.split('T')[0];}
  if(a == d){
    debugger
    console.log(obj)
    var mp3_url = 'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3'
    let titl=obj.title;
    this.toastr.show("Task due for today is "+titl);
    (new Audio(mp3_url)).play()

  }
})
  });

}
getCompleted(){
  debugger
  this.todoListService.getAllTask("/api/task/all/","C").subscribe(data =>{
this.listCompleted = data;

  });
}

openNav(list) {
  debugger
  this.title= list.title;
  this.id = list.id;
  this.GlobalTaskData=list;
  this.todoListService.getById("/api/task/",this.id).subscribe(data =>{
    if(data.completed ==1 ){
debugger
this.isCompleted=true;
    }else{
this.isCompleted=false
    }
    if(data.important == 1){
      debugger
      this.importantCheck=true;
      this.isActive=true;
    }
    else{
      this.importantCheck=false;
      this.isActive=false;
    }
    if(data.dueDate != null){
debugger
      this.selectedDueDate=  this.datepipe.transform(data.dueDate, 'dd/MM/yyyy');
    }
    else{
      debugger
      this.selectedDueDate=null
    }


  })
  this.todoListService.getAllTask("/api/step/",this.id).subscribe(data=>{
this.stepsAlll=data;
  })
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";

}

 closeNav() {
   debugger
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginRight= "0";
}
  AddTask(){
    debugger
    this.addTask = true;
    console.log(this.addTask)
  }

  SaveTitle(event) {
    debugger
    this.submitted = true;
    // stop here if form is invalid
    debugger
    let mylist = new Task();

   mylist.title= event.target.value;
      this.todoListService.addRecord(mylist,this.url).subscribe(data => {
        if (data != null) {

this.toastr.success("Added Successfully")

        }
    this.addTask=false;


      });
      this.getAll();

  }
  MarkCompleted(Id){
    debugger
    let mylist = new Task();
    mylist.id= Id;
    this.todoListService.getById("/api/task/",Id).subscribe(data=>{
      debugger
      mylist = data;
      if(mylist.completed == false){
        mylist.completed= true
        this.isCompleted=true;
      }
      else{
        mylist.completed= false;
        this.isCompleted=false;
      }
      this.todoListService.addRecord(mylist,this.url).subscribe(data => {
        if (data != null) {

          this.toastr.success("Updated successfully");
          this.getCompleted()

        }



      });

    })


  }
  saveImportant(Id){
    debugger
    let mylist = new Task();
    mylist.id= Id;
    this.todoListService.getById("/api/task/",Id).subscribe(data=>{
      mylist = data;
      if(mylist.important == false){
        mylist.important= true
        this.isActive=true;
      }
      else{
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



}
