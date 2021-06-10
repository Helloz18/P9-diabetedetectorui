import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiHistoryService } from 'src/app/service/api-history.service';
import { History } from 'src/app/interface/history';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-history-update',
  templateUrl: './history-update.component.html',
  styleUrls: ['./history-update.component.css']
})
export class HistoryUpdateComponent implements OnInit {

  historyUpdateForm: FormGroup;
  history: Observable<History>;
  id: string;
  historyId: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private apiHistoryService: ApiHistoryService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.historyUpdateForm = this.formBuilder.group({
      noteTitle: '',
      doctorName: '',
      noteDate: '',
      noteContent:''
    });

    this.history = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.apiHistoryService.getHistoryById(params.get('historyId'))));
    this.history.subscribe(
       result => {
        const formValue = JSON.stringify(result);
        this.historyUpdateForm = this.formBuilder.group({
          noteTitle: JSON.parse(formValue).note.noteTitle,
          doctorName: JSON.parse(formValue).note.doctorName,
          noteDate: JSON.parse(formValue).note.noteDate,
          noteContent: JSON.parse(formValue).note.noteContent  
        });
        this.historyId = JSON.parse(formValue).historyId;
        this.id = JSON.parse(formValue).patId;
       })
    
 
  }

  updateHistory() {
    const formValue = this.historyUpdateForm.value;
    console.log(formValue);
    let updatedNote = {
      noteTitle: formValue['noteTitle'],
      doctorName: formValue['doctorName'],
      noteDate: formValue['noteDate'],
      noteContent: formValue['noteContent']  
    };    
    let updatedHistory = {     
      historyId: this.historyId,
      patId: this.id,
      note: updatedNote
    }  
      this.apiHistoryService.updateHistory(updatedHistory, this.historyId).subscribe(
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
