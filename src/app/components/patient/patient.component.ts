import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from 'src/app/interface/report';
import { Patient } from '../../interface/patient';
import { ApiPatientService } from '../../service/api-patient.service';
import { ApiReportService } from '../../service/api-report.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Observable<Patient>;
  patient: Patient;
  report: Report;

  constructor(
    private apiPatientService: ApiPatientService,
    private apiReportService: ApiReportService,   
    private router: Router
      ) { }

  ngOnInit(): void {
    this.retrievePatients();
  }

  retrievePatients() {
    this.patients = this.apiPatientService.getPatients();
    this.apiPatientService.getPatients().subscribe(
      res => {
        console.log(res);
      }
    );
  }

  
  createReport(patId){
    this.router.navigate(['/report/'+patId]); 
  }
}
