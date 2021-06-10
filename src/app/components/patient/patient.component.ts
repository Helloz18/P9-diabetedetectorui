import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../interface/patient';
import { ApiPatientService } from '../../service/api-patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Observable<Patient>;
  patient: Patient;

  constructor(
    private apiPatientService: ApiPatientService
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

}
