import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { ContrastService } from '../contrast.service';
import { LineChartComponent } from '../line-chart/line-chart.component';


export interface ConnectionData {
  url: string;
  orgId: string;
  username: string;
  apiKey: string;
  serviceKey: string;
}

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  url: string = "";
  orgId: string = "";
  username: string = "";
  apiKey: string = "";
  serviceKey: string = "";
  isGeneratingReport: boolean = false;

  charts: Array<any> = [];

  constructor(public dialog: MatDialog, public contrastService: ContrastService) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConnectionDialog, {
      width: '500px',
      data: { url: this.url, orgId: this.orgId, username: this.username, apiKey: this.apiKey, serviceKey: this.serviceKey }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.isGeneratingReport = true;
      this.contrastService.setConnectionDetails(data.url, data.orgId, data.username, data.apiKey, data.serviceKey);
      this.generateReport();
    });
  }

  generateReport(): void {
    this.contrastService.getApplicationForOrg("license").then(result => {
      this.buildAppOnBoardingTrends(result.applications);
    });
  }

  buildAppOnBoardingTrends(applications): void {
    var appNames = applications.map(function (value) { return value.name });
    var licensedAppsCreationDates = applications.filter(function (app) { return app.license.level.toUpperCase() === "LICENSED" }).map(function (app) { return app.created });
    var unlicensedAppsCreationDates = applications.filter(function (app) { return app.license.level.toUpperCase() === "UNLICENSED" }).map(function (app) { return app.created });

    var months: [string, number, number][] = [["Jan", 0, 0], ["Feb", 0, 0], ["Mar", 0, 0], ["Apr", 0, 0], ["May", 0, 0], ["Jun", 0, 0], ["Jul", 0, 0], ["Aug", 0, 0], ["Sep", 0, 0], ["Oct", 0, 0], ["Nov", 0, 0], ["Dec", 0, 0]];

    var currentDate = new Date();

    licensedAppsCreationDates.forEach(function (creationDate: number) {
      var date = new Date(0);
      date.setMilliseconds(creationDate);
      if (Utilities.monthsDiff(date, currentDate) < 12) {
        months[date.getMonth()][1]++;
      } else {
        months[0][1]++;
      }
    });

    unlicensedAppsCreationDates.forEach(function (creationDate: number) {
      var date = new Date(0);
      date.setMilliseconds(creationDate);
      if (Utilities.monthsDiff(date, currentDate) < 12) {
        months[date.getMonth()][2]++;
      } else {
        months[0][2]++;
      }
    });

    var currentMonth = currentDate.getMonth();
    while (currentMonth >= 0) {
      var month = months.shift();
      months.push(month);
      currentMonth--;
    }

    let labels: string[] = [];
    let licensedAppCounts: number[] = [];
    let unLicensedAppCounts: number[] = [];
    months.forEach(function (row, index) {
      if (index > 0) {
        this[index][1] += this[index - 1][1];
        this[index][2] += this[index - 1][2];
      }
      labels.push(this[index][0]);
      licensedAppCounts.push(this[index][1]);
      unLicensedAppCounts.push(this[index][2]);
    }, months);

    let appOnboardingLineChart = new LineChartComponent();
    appOnboardingLineChart.title = "Application Onboarding Trend";
    appOnboardingLineChart.setLineChartLables(labels);
    appOnboardingLineChart.addSeries(licensedAppCounts, "Licensed Apps", false);
    appOnboardingLineChart.addSeries(unLicensedAppCounts, "Unlicensed Apps", false);
    this.charts.push(appOnboardingLineChart);
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
  }
}


export class Utilities {
  static yearsDiff(d1: Date, d2: Date): number {
    let years = d2.getFullYear() - d1.getFullYear();
    return years;
  }

  static monthsDiff(d1: Date, d2: Date): number {
    let years = Utilities.yearsDiff(d1, d2);
    let months = (years * 12) + (d2.getMonth() - d1.getMonth());
    return months;
  }
}