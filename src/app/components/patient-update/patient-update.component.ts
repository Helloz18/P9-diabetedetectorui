import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Patient } from 'src/app/interface/patient';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ApiPatientService } from 'src/app/service/api-patient.service';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent implements OnInit {

  patientUpdateForm: FormGroup;
  patient: Observable<Patient>;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private apiPatientService: ApiPatientService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.patientUpdateForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      birthdate: '',
      gender: '',
      address:'',
      phoneNumber:''
    });

    this.patient = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.apiPatientService.getPatientById(+params.get('id'))));
    this.patient.subscribe(
       result => {
        const formValue = result;
        this.patientUpdateForm = this.formBuilder.group({
          firstName: formValue['firstName'],
          lastName: formValue['lastName'],
          birthdate: formValue['birthdate'],
          gender: formValue['gender'],
          address: formValue['address'],
          phoneNumber: formValue['phoneNumber']  
        });
        this.id = result.id;
       })
    
  }

  updatePatient() {
    const formValue = this.patientUpdateForm.value;
    let updatedPatient = {
      id: this.id,
      firstName: formValue['firstName'],
      lastName: formValue['lastName'],
      birthdate: formValue['birthdate'],
      gender: formValue['gender'],
      address: formValue['address'],
      phoneNumber: formValue['phoneNumber']
    };      
      this.apiPatientService.updatePatient(updatedPatient, this.id).subscribe(
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
