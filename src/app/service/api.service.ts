import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from  '@angular/common/http'; 
import { Patient } from '../interface/Patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    /**
   * url to the server Java connected to the database containing Patients
   */
  public SERVER_PATIENT_URL = "http://localhost:8081";

  constructor(
    private httpClient: HttpClient   
  ) { }

  getPatients(): Observable<Patient> {
    return this.httpClient.get<Patient>(this.SERVER_PATIENT_URL+'/patients');
  }

  getPatientById(id): Observable<Patient> {
    return this.httpClient.get<Patient>(this.SERVER_PATIENT_URL+'/patient/'+id);
  }

  addPatient(patient) {
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json'
      })
    }
    const req = new HttpRequest('POST', this.SERVER_PATIENT_URL+'/patient/add', patient, httpOptions);
    return this.httpClient.request(req);
  }

  
  updatePatient(patient, id) {
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json'
      })
    }
    const req = new HttpRequest('PUT', this.SERVER_PATIENT_URL+'/patient/'+id, patient, httpOptions);
    return this.httpClient.request(req);
  }
}
