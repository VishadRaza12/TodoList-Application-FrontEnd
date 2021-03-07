import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor(  private httpClient:HttpClient) { }

  getAllRecords<T>(model: T | any, url: string): Observable<T[]> {

    return this.httpClient.get(url)
        .pipe(map((response: any) => {
            return response.map(d => {
                return new model(d);
            });

        }
        ))
}
getAllTask(url: string, key:string): Observable<any> {
  return this.httpClient.get(url+key)
    .pipe(map((response: Response) => {

      // console.log(response);
      return response;
    }));
}
getAll(url: string): Observable<any> {
  return this.httpClient.get(url)
    .pipe(map((response: Response) => {

      // console.log(response);
      return response;
    }));
}

addRecord<T>(model: T, url: string) {

    return this.httpClient.post(url, model)
        .pipe(map((response: T) => {
          console.log(response)
          return response;
        }));
}


deleteRecord(id: number, url) {

    return this.httpClient.delete(url + '/' + id);

}
getById(url: string, object: any): Observable<any> {
  console.log(object)

  return this.httpClient.get(url + '/' + object)
    .pipe(map((response: Response) => {

      console.log(response);
      return response;
    }));
}

}
