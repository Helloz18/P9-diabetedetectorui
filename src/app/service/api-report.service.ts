import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiReportService {

     /**
   * url to the server Java connected to the database containing Patients
   */
      public SERVER_REPORT_URL = "http://localhost:8080";


  constructor(
    private httpClient: HttpClient   
  ) { }

  createReport(patId : number) {
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json'
      })
    }
    const req = new HttpRequest('POST', this.SERVER_REPORT_URL+'/assess/id?patId='+patId, httpOptions);
    return this.httpClient.request(req);

  }

}
