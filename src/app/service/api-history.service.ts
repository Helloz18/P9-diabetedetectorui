import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { History } from '../interface/history';

@Injectable({
  providedIn: 'root'
})
export class ApiHistoryService {

   /**
   * url to the server Java connected to the database containing Patients
   */
    public SERVER_HISTORY_URL = "http://localhost:8082";

    constructor(
      private httpClient: HttpClient   
    ) { }
  
    /**
     * get all histories for a patient
     * @param patId id of the patient
     * @returns 
     */
    getHistories(patId): Observable<History> {
      return this.httpClient.get<History>(this.SERVER_HISTORY_URL+'/history/'+patId);
    }
  
    /**
     * get a history from the histories of the patient
     * @param historyId of the history
     * @returns 
     */
    getHistoryById(historyId : string): Observable<History> {
      return this.httpClient.get<History>(this.SERVER_HISTORY_URL+'/history-get/'+historyId);
    }

    updateHistory(history, historyId) {
      const httpOptions = {
        headers: new HttpHeaders({
         'Content-Type': 'application/json'
        })
      }
      const req = new HttpRequest('PUT', this.SERVER_HISTORY_URL+'/history-update/'+historyId, history, httpOptions);
      return this.httpClient.request(req);
    }
  
    addHistory(history) {
      const httpOptions = {
        headers: new HttpHeaders({
         'Content-Type': 'application/json'
        })
      }
      const req = new HttpRequest('POST', this.SERVER_HISTORY_URL+'/history/add', history, httpOptions);
      return this.httpClient.request(req);
    }
  }
