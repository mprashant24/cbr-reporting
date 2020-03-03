import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportingComponent, ConnectionDialog } from './reporting/reporting.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar'

@NgModule({
  declarations: [
    AppComponent,
    ReportingComponent,
    ConnectionDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule
  ],
  entryComponents: [AppComponent, ReportingComponent, ConnectionDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
