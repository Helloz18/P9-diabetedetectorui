import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { PatientCreateComponent } from './components/patient-create/patient-create.component';
import { PatientUpdateComponent } from './components/patient-update/patient-update.component';
import { PatientComponent } from './components/patient/patient.component';

const routes: Routes = [
  
  { path: '', component: PatientComponent,
  // children: [
  //   {
  //     path: 'create', // child route path
  //     component: PatientCreateComponent, // child route component that the router renders
  //   }
  // ]
},
  { path: 'update/:id', component: PatientUpdateComponent }, 
  { path: 'create', component: PatientCreateComponent },
  { path: 'history/:patId', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
