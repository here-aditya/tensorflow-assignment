import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http'; 
import { MyserviceService } from './services/myservice.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule 
  ],
  providers: [MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
