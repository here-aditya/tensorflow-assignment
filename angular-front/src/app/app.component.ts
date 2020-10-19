import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { MyserviceService } from './services/myservice.service';
import { SearchCriteria } from './models/search-criteria'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = '-: User Listing :-';
  users: User[];
  //searchCriteria: SearchCriteria = { isPageLoad: true, filter: "" };  
  dtOptions: DataTables.Settings = {};
  apiUDownloadRL =  'http://localhost:8080/api/users/csvdownload';

  constructor(private MyserviceService: MyserviceService) {}  

  ngOnInit() {
    this.dtOptions = {
      bPaginate: false,
      searching: false,
      //pagingType: 'full_numbers',
      //pageLength: 10,
      //processing: true,
      ajax: (dataTablesParameters: any, callback) => {    
        //dataTablesParameters.searchCriteria = this.searchCriteria;    
        this.MyserviceService    
          .getAllEmployeesWithPaging(dataTablesParameters)   
          .subscribe(resp => {    
            this.users = resp.data;    
            callback({    
              // recordsTotal: resp.datarecordsTotal,    
              // recordsFiltered: resp.recordsFiltered,    
              data: []    
            });    
          });    
      },    
      //columns: [null, null, null, null, null, null, { orderable: false }]  
    };
  }
}
