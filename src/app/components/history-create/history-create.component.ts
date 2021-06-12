import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Patient } from 'src/app/interface/patient';
import { ApiHistoryService } from 'src/app/service/api-history.service';
import { ApiPatientService } from 'src/app/service/api-patient.service';

@Component({
  selector: 'app-history-create',
  templateUrl: './history-create.component.html',
  styleUrls: ['./history-create.component.css']
})
export class HistoryCreateComponent implements OnInit {

  historyCreateForm: FormGroup;
  id: number;
  patient: Observable<Patient>;
  patientFirstName: string;
  patientLastName: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiHistoryService: ApiHistoryService,
    private apiPatientService: ApiPatientService,
    private router: Router,
    private route: ActivatedRoute
  
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => { this.id = +params['patId']} );
    
    this.historyCreateForm = this.formBuilder.group({
      noteTitle: '',
      doctorName: '',
      noteDate: '',
      noteContent:''
    });

    this.patient = this.route.paramMap.pipe(switchMap((params:ParamMap) =>
  this.apiPatientService.getPatientById(+params.get('patId'))));
  this.patient.subscribe( 
    res => {
      let value = JSON.stringify(res);
      this.patientFirstName = JSON.parse(value).firstName;
      this.patientLastName = JSON.parse(value).lastName;
    }
  )

  }

  createHistory() {
      const formValue = this.historyCreateForm.value;
      console.log(formValue);
      let createdNote = {
        noteTitle: formValue['noteTitle'],
        doctorName: formValue['doctorName'],
        noteDate: formValue['noteDate'],
        noteContent: formValue['noteContent']  
      };    
      let createdHistory = {     
        patId: this.id,
        note: createdNote
      }  
        this.apiHistoryService.addHistory(createdHistory).subscribe(
          result => {
            if (result.type == HttpEventType.Response) {
              this.router.navigate(['/history/'+this.id]);
            }
          },
          error => {
            console.log(error);
          }
        );
    }
  

  
}
