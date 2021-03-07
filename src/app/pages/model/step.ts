import { Task } from "./task";

export class steps{
  public id:number;
  public title: String;
  public task: Task

  // constructor(jsonData: any) {
  //     this.mapData(jsonData);
  // }

  mapData(data) { //this function receive your json
      this.id = data.id;
      this.title = data.title;
      this.task = data.task;
  }

}
