import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Patient } from '../../interface/Patient';
import { ApiService } from '../../service/Api.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Observable<Patient>;
  patient: Patient;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.retrievePatients();
  }

  retrievePatients() {
    this.patients = this.apiService.getPatients();
    this.apiService.getPatients().subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
