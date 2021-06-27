import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Patient } from 'src/app/interface/patient';
import { ApiPatientService } from 'src/app/service/api-patient.service';
import { History } from '../../interface/history';
import { ApiHistoryService } from '../../service/api-history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  patientHistory: Observable<History>;
  patient: Observable<Patient>;
  patId: number;
  patientFirstName : string;
  patientLastName: string;
  info: string ="";
 
  constructor(
    private apiHistoryService: ApiHistoryService,
    private apiPatientService: ApiPatientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.patientHistory = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.apiHistoryService.getHistories(+params.get('patId'))));
        this.patientHistory.subscribe(
          res => {
            if (res == null) {
              this.info="no notes for this patient";
            };
          }
        )
        
      
  this.patient = this.route.paramMap.pipe(switchMap((params:ParamMap) =>
  this.apiPatientService.getPatientById(+params.get('patId'))));
  this.patient.subscribe( 
    res => {
      let value = JSON.stringify(res);
      this.patId = JSON.parse(value).id;
      this.patientFirstName = JSON.parse(value).firstName;
      this.patientLastName = JSON.parse(value).lastName;
    }
  ) 
    
      }
    }