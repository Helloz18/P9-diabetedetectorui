import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './components/patient/patient.component';

import { PatientUpdateComponent } from './components/patient-update/patient-update.component';
import { PatientCreateComponent } from './components/patient-create/patient-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HistoryComponent } from './components/history/history.component';
import { HistoryUpdateComponent } from './components/history-update/history-update.component';
import { HistoryCreateComponent } from './components/history-create/history-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientUpdateComponent,
    PatientCreateComponent,
    HistoryComponent,
    HistoryUpdateComponent,
    HistoryCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
