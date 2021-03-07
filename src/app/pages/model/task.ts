export class Task{
  public id:number;
  public title: String;
  public dueDate: Date;
  public attachment: String;
  public important: boolean;
  public completed: boolean

  // constructor(jsonData: any) {
  //     this.mapData(jsonData);
  // }

  mapData(data) { //this function receive your json
      this.id = data.id;
      this.dueDate = data.dueDate;
      this.title = data.title;
      this.attachment = data.attachment;
      this.important = data.important;

  }

}
