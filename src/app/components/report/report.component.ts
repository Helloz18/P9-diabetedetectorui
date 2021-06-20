import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiReportService } from 'src/app/service/api-report.service';
import { Report } from '../../interface/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  report: Report;

  constructor(
    private apiReportService: ApiReportService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params:ParamMap) =>
    this.apiReportService.createReport(+params.get('patId')))).subscribe(
      result => {
        let res = "";
        if(result.type == HttpEventType.Response) {
          console.log("result" +result);
          res = JSON.stringify(result);
          console.log("res " + res);
          this.report = {
            "patientFirstName":JSON.parse(res).body.patientFirstName,
            "patientLastName":JSON.parse(res).body.patientLastName,
            "patientAge":JSON.parse(res).body.patientAge,
            "risk":JSON.parse(res).body.risk       
        }
        this.getClass(this.report.risk);
}
})
  
}
getClass(risk) {
  let classList ="";
  if(risk =="None") {
    classList="alert alert-secondary";
  } 
  else if(risk =="Borderline") {
    classList="alert alert-secondary";
  } 
  else if(risk =="Early onset") {
    classList="alert alert-secondary";
  } 
  else if(risk =="In danger") {
    classList="alert alert-secondary";
  } 
  return classList;
}

}
  
