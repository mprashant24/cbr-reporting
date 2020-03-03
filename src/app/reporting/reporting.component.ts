import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface ConnectionData {
  url : string;
  orgId : string;
  username : string;
  apiKey : string;
  serviceKey : string;
  isGeneratingReport: boolean;
}

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  url : string;
  orgId : string;
  username : string;
  apiKey : string;
  serviceKey : string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConnectionDialog, {
      width: '500px',
      data: {url: this.url, orgId: this.orgId, username: this.username, apiKey: this.apiKey, serviceKey : this.serviceKey}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}

@Component({
  selector: 'connection-dialog',
  templateUrl: 'connection-dialog.html',
  styleUrls: ['./connection-dialog.css']
})
export class ConnectionDialog {
  
  constructor(
    public dialogRef: MatDialogRef<ConnectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConnectionData) {
      data.isGeneratingReport = false;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onGenerateReport(): void {
    this.dialogRef.disableClose = true;
    this.data.isGeneratingReport = true;

    console.log(this.data);

  }
}
