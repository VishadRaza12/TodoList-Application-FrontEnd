import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { TodolistService } from '../service/todolist.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
sidebars:[];
public width: string = '220px';
public mediaQuery: string = ('(min-width: 600px)');
public target: string = '.main-content';
public dockSize: string = '50px';
 public enableDock: boolean = true;
 Importantcount:number=0;
@ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;
  constructor( private todoListService: TodolistService,private router:Router,
    private zone:NgZone) { }

  ngOnInit(): void {
    debugger
this.todoListService.getAll("/api/sidemenu").subscribe(data=>{
  debugger
  this.sidebars = data;


})
  }

  openClick() {
   // this.sidebarMenuInstance.toggle();
}
menuClick(Id){
  debugger
  if(Id == 3){
    this.router.navigate(['/important'])
  }
  if(Id == 2)
  {
    this.router.navigate(['/todolist'])
  }
}

}
