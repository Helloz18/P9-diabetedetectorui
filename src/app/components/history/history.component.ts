import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { History } from '../../interface/history';
import { ApiHistoryService } from '../../service/api-history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  patId: string;
  patientHistory: Observable<History>;

  constructor(
    private apiHistoryService: ApiHistoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.patientHistory = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.apiHistoryService.getHistories(+params.get('patId'))));
  }

}
