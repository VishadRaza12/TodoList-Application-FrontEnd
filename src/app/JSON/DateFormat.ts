
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateFormat {

  private dateFormat = new BehaviorSubject("MMMM Do YYYY");
  //private dateFormat = new BehaviorSubject("MMMM DD YYYY");
  currentFormat = this.dateFormat.asObservable();

  private dateFormatWithTime = new BehaviorSubject("MMMM d y h:mm a");
  currentFormatWithTime = this.dateFormatWithTime.asObservable();

  private dateFormatBs = new BehaviorSubject("MMMM d y");
  currentFormatBs = this.dateFormatBs.asObservable();

  private dateFormatMY = new BehaviorSubject("MMMM y");
  currentFormatMY = this.dateFormatMY.asObservable();

  private notificationDate = new BehaviorSubject("MMMM d, y");
  notificationDateFormat = this.notificationDate.asObservable();

  private notificationTime = new BehaviorSubject("h:mm a");
  notificationTimeFormat = this.notificationTime.asObservable();

  
  private dateFormatsMY = new BehaviorSubject("MMM y");
  currentFormatsMY = this.dateFormatsMY.asObservable();
  constructor() { }

}