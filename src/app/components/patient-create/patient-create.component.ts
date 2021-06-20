import { HttpEventType } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiPatientService } from 'src/app/service/api-patient.service';

@Injectable()
@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  
  patientForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiPatientService: ApiPatientService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.patientForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      birthdate: '',
      gender: '',
      address:'',
      phoneNumber:''
    });

  }

  savePatient() {
    const formValue = this.patientForm.value;
    let patient = {
      firstName: formValue['firstName'],
      lastName: formValue['lastName'],
      birthdate: formValue['birthdate'],
      gender: formValue['gender'],
      address: formValue['address'],
      phoneNumber: formValue['phoneNumber']
    };      
      this.apiPatientService.addPatient(patient).subscribe(
        result => {
          if (result.type == HttpEventType.Response) {
          this.router.navigate(['/']);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  genderSelect(event) {
    console.log(event.target.value);
  }

}
