import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"  
//import { User } from '../models/user';  
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})

export class MyserviceService {

  private apiURL: string = 'http://localhost:8080/api/';  
  constructor(private http: HttpClient) {}  

  getAllEmployeesWithPaging(dtParams: any): Observable<any> {  
      return this.http.put(this.apiURL + 'users', dtParams);          
  }
}
