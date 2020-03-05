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

  url: string = "https://app.contrastsecurity.com/Contrast/";
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
      disableClose: true,
      data: { url: this.url, orgId: this.orgId, username: this.username, apiKey: this.apiKey, serviceKey: this.serviceKey }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.isGeneratingReport = true;
      this.contrastService.setConnectionDetails(data.url, data.orgId, data.username, data.apiKey, data.serviceKey);
      this.generateReport();
    });
  }

  generateReport(): void {
    this.charts = [];
    this.contrastService.getApplicationForOrg("license,trace_breakdown").then(result => {
      this.buildAppOnBoardingTrends(result.applications);
      this.buildOnlineVsOfflineApps(result.applications);
      this.buildAppsByLanguage(result.applications);
      this.buildTop10AppsByVuln(result.applications);
      this.buildTop10RemediatingApps(result.applications);
    });

    this.contrastService.getVulnTrend().then(result => {
      this.buildVulnTrend(result.open, result.closed);
    });

    this.isGeneratingReport = false;
  }


  buildTop10RemediatingApps(applications: any) {
    let appTraceCounts: any[] = applications.map(function (app) { return [app, app.trace_breakdown.remediated + app.trace_breakdown.confirmed + app.trace_breakdown.suspicious + app.trace_breakdown.notProblem]});
    appTraceCounts.sort(function(first, second) {
      return second[1] - first[1];
    });

    let top10Apps: any[] = appTraceCounts.length >= 10 ? appTraceCounts.slice(0, 10) : appTraceCounts;
    var traceCounts = {};
    top10Apps.forEach(function (arrValue) {
      let app = arrValue[0];
      traceCounts[app.name] = traceCounts[app.name] || {};
      traceCounts[app.name]["total"] = app.trace_breakdown.traces;
      traceCounts[app.name]["closed"] = app.trace_breakdown.remediated + app.trace_breakdown.notProblem;
      traceCounts[app.name]["in_progress"] = app.trace_breakdown.confirmed + app.trace_breakdown.suspicious;
    });

    let top10AppsByTraceChart = new BarChartComponent();
    top10AppsByTraceChart.chartType = "bar";
    top10AppsByTraceChart.title = "Top 10 Apps by (Remdiated & In progress) Vulnrabilities Count";
    top10AppsByTraceChart.setLabels(Object.keys(traceCounts));
    let totalVulnCounts: number[] = [];
    let remediatedVulnCounts: number[] = [];
    let inProgressVulnCounts: number[] = [];
    Object.keys(traceCounts).forEach(function (key) {
      totalVulnCounts.push(traceCounts[key]["total"]);
      remediatedVulnCounts.push(traceCounts[key]["closed"]);
      inProgressVulnCounts.push(traceCounts[key]["in_progress"]);
    });
    top10AppsByTraceChart.addSeries("Total", totalVulnCounts);
    top10AppsByTraceChart.addSeries("Closed", remediatedVulnCounts);
    top10AppsByTraceChart.addSeries("In Progress", inProgressVulnCounts);
    this.charts.push(top10AppsByTraceChart);
  }


  buildTop10AppsByVuln(applications: any) : void{
    let appTraceCounts: any[] = applications.map(function (app) { return [app, app.trace_breakdown.criticals + app.trace_breakdown.highs]});
    appTraceCounts.sort(function(first, second) {
      return second[1] - first[1];
    });

    let top10Apps: any[] = appTraceCounts.length >= 10 ? appTraceCounts.slice(0, 10) : appTraceCounts;
    var traceCounts = {};
    top10Apps.forEach(function (arrValue) {
      let app = arrValue[0];
      traceCounts[app.name] = traceCounts[app.name] || {};
      traceCounts[app.name]["total"] = app.trace_breakdown.traces;
      traceCounts[app.name]["criticals"] = app.trace_breakdown.criticals;
      traceCounts[app.name]["highs"] = app.trace_breakdown.highs;
    });

    let top10AppsByTraceChart = new BarChartComponent();
    top10AppsByTraceChart.chartType = "bar";
    top10AppsByTraceChart.title = "Top 10 Apps by (Critical & High) Vulnrabilities Count";
    top10AppsByTraceChart.setLabels(Object.keys(traceCounts));
    let totalVulnCounts: number[] = [];
    let criticalVulnCounts: number[] = [];
    let highVulnCounts: number[] = [];
    Object.keys(traceCounts).forEach(function (key) {
      totalVulnCounts.push(traceCounts[key]["total"]);
      criticalVulnCounts.push(traceCounts[key]["criticals"]);
      highVulnCounts.push(traceCounts[key]["highs"]);
    });
    top10AppsByTraceChart.addSeries("Total", totalVulnCounts);
    top10AppsByTraceChart.addSeries("Critical", criticalVulnCounts);
    top10AppsByTraceChart.addSeries("High", highVulnCounts);
    this.charts.push(top10AppsByTraceChart);
  }

  buildVulnTrend(open: any, closed: any) {
    var data: [string, number, number, number, number, number, number, number][] = [["Jan", 0, 0, 0, 0, 0, 0, 0], ["Feb", 0, 0, 0, 0, 0, 0, 0], ["Mar", 0, 0, 0, 0, 0, 0, 0], ["Apr", 0, 0, 0, 0, 0, 0, 0], ["May", 0, 0, 0, 0, 0, 0, 0],
    ["Jun", 0, 0, 0, 0, 0, 0, 0], ["Jul", 0, 0, 0, 0, 0, 0, 0], ["Aug", 0, 0, 0, 0, 0, 0, 0], ["Sep", 0, 0, 0, 0, 0, 0, 0], ["Oct", 0, 0, 0, 0, 0, 0, 0],
    ["Nov", 0, 0, 0, 0, 0, 0, 0], ["Dec", 0, 0, 0, 0, 0, 0, 0]];
    open.forEach(function (trend) {
      var date = new Date(0);
      date.setMilliseconds(trend.timestamp);
      var reportedCount = trend.statusBreakdown.filter(function (status) { return status.name.toUpperCase() === "REPORTED" }).map(function (status) { return status.value; });
      var suspiciousCount = trend.statusBreakdown.filter(function (status) { return status.name.toUpperCase() === "SUSPICIOUS" }).map(function (status) { return status.value; });
      var confirmedCount = trend.statusBreakdown.filter(function (status) { return status.name.toUpperCase() === "CONFIRMED" }).map(function (status) { return status.value; });
      data[date.getMonth()][1] += reportedCount.length == 1 ? reportedCount[0] : 0;
      data[date.getMonth()][2] += suspiciousCount.length == 1 ? suspiciousCount[0] : 0;
      data[date.getMonth()][3] += confirmedCount.length == 1 ? confirmedCount[0] : 0;
    });

    closed.forEach(function (trend) {
      var date = new Date(0);
      date.setMilliseconds(trend.timestamp);
      var notAProblemCount = trend.statusBreakdown.filter(function (status) { return status.name.toUpperCase() === "NOTAPROBLEM" }).map(function (status) { return status.value; });
      var remediatedCount = trend.statusBreakdown.filter(function (status) { return status.name.toUpperCase() === "REMIDIATED" }).map(function (status) { return status.value; });
      var fixedCount = trend.statusBreakdown.filter(function (status) { return status.name.toUpperCase() === "FIXED" }).map(function (status) { return status.value; });
      var autoRemediatedCount = trend.statusBreakdown.filter(function (status) { return status.name.toUpperCase() === "AUTOREMEDIATED" }).map(function (status) { return status.value; });
      data[date.getMonth()][4] += notAProblemCount.length == 1 ? notAProblemCount[0] : 0;
      data[date.getMonth()][5] += remediatedCount.length == 1 ? remediatedCount[0] : 0;
      data[date.getMonth()][6] += fixedCount.length == 1 ? fixedCount[0] : 0;
      data[date.getMonth()][7] += autoRemediatedCount.length == 1 ? autoRemediatedCount[0] : 0;
    });

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    while (currentMonth >= 0) {
      var d = data.shift();
      data.push(d);
      currentMonth--;
    }

    let labels: string[] = [];
    let reportedCounts: number[] = [];
    let suspiciousCounts: number[] = [];
    let confirmedCounts: number[] = [];
    let notAProblemCounts: number[] = [];
    let remediatedCounts: number[] = [];
    let fixedCounts: number[] = [];
    let autoRemediatedCounts: number[] = [];
    data.forEach(function (row, index) {
      if (index > 0) {
        this[index][1] += this[index - 1][1];
        this[index][2] += this[index - 1][2];
        this[index][3] += this[index - 1][3];
        this[index][4] += this[index - 1][4];
        this[index][5] += this[index - 1][5];
        this[index][6] += this[index - 1][6];
        this[index][7] += this[index - 1][7];
      }
      labels.push(this[index][0]);
      reportedCounts.push(this[index][1]);
      suspiciousCounts.push(this[index][2]);
      confirmedCounts.push(this[index][3]);
      notAProblemCounts.push(this[index][4]);
      remediatedCounts.push(this[index][5]);
      fixedCounts.push(this[index][6]);
      autoRemediatedCounts.push(this[index][7]);
    }, data);

    let vulnTrendLineChart = new LineChartComponent();
    vulnTrendLineChart.title = "Application Vulnerability Trend";
    vulnTrendLineChart.setLineChartLables(labels);
    vulnTrendLineChart.addSeries(reportedCounts, "Reported", false);
    vulnTrendLineChart.addSeries(suspiciousCounts, "Suspicious", false);
    vulnTrendLineChart.addSeries(confirmedCounts, "Confirmed", false);
    vulnTrendLineChart.addSeries(notAProblemCounts, "NotAProblem", false);
    vulnTrendLineChart.addSeries(remediatedCounts, "Remediated", false);
    vulnTrendLineChart.addSeries(fixedCounts, "Fixed", false);
    vulnTrendLineChart.addSeries(autoRemediatedCounts, "AutoRemediated", false);
    this.charts.push(vulnTrendLineChart);
  }


  buildAppsByLanguage(applications: any): void {
    var statusCounts = {};
    applications.forEach(function (app) {
      var licenseStr = app.license.level.toUpperCase();
      statusCounts[app.language] = statusCounts[app.language] || {};
      statusCounts[app.language][licenseStr] = (statusCounts[app.language][licenseStr] || 0) + 1;
    });

    let appsByLanguageChart = new BarChartComponent();
    appsByLanguageChart.chartType = "horizontalBar";
    appsByLanguageChart.setStacked(true);
    appsByLanguageChart.title = "Apps by Language";
    appsByLanguageChart.setLabels(Object.keys(statusCounts));
    let licensedAppCounts: number[] = [];
    let unlicensedAppCounts: number[] = [];
    Object.keys(statusCounts).forEach(function (key) {
      licensedAppCounts.push((statusCounts[key]["LICENSED"] || 0));
      unlicensedAppCounts.push((statusCounts[key]["UNLICENSED"] || 0));
    });
    appsByLanguageChart.addSeries("Licensed", licensedAppCounts);
    appsByLanguageChart.addSeries("Unlicensed", unlicensedAppCounts);
    this.charts.push(appsByLanguageChart);
  }


  buildOnlineVsOfflineApps(applications: any): void {
    let licensedAppsCounts: number[] = [0, 0];
    let unlicensedAppsCounts: number[] = [0, 0];
    applications.forEach(function (app: any) {
      let index: number = app.status.toUpperCase() === 'ONLINE' ? 0 : 1;
      if (app.license.level.toUpperCase() === 'LICENSED') {
        licensedAppsCounts[index]++;
      }
      else {
        unlicensedAppsCounts[index]++;
      }
    });

    let onlineVsOfflineChart = new BarChartComponent();
    onlineVsOfflineChart.chartType = "horizontalBar";
    onlineVsOfflineChart.setStacked(true);
    onlineVsOfflineChart.title = "Online Vs Offline Apps";
    onlineVsOfflineChart.setLabels(["Online", "Offline"]);
    onlineVsOfflineChart.addSeries("Licensed", licensedAppsCounts);
    onlineVsOfflineChart.addSeries("UnLicensed", unlicensedAppsCounts);
    this.charts.push(onlineVsOfflineChart);
  }

  buildAppOnBoardingTrends(applications): void {
    var licensedAppsCreationDates = applications.filter(function (app) { return app.license.level.toUpperCase() === "LICENSED" }).map(function (app) { return app.created });
    var unlicensedAppsCreationDates = applications.filter(function (app) { return app.license.level.toUpperCase() === "UNLICENSED" }).map(function (app) { return app.created });

    var months: [string, number, number][] = [["Jan", 0, 0], ["Feb", 0, 0], ["Mar", 0, 0], ["Apr", 0, 0], ["May", 0, 0], ["Jun", 0, 0], ["Jul", 0, 0], ["Aug", 0, 0], ["Sep", 0, 0], ["Oct", 0, 0], ["Nov", 0, 0], ["Dec", 0, 0]];

    var currentDate = new Date();

    let yearOldLicensedApps:number = 0;
    let yearOldUnlicensedApps:number = 0;

    licensedAppsCreationDates.forEach(function (creationDate: number) {
      var date = new Date(0);
      date.setMilliseconds(creationDate);
      if (Utilities.monthsDiff(date, currentDate) < 12) {
        months[date.getMonth()][1]++;
      } else {
        console.log(date);
        yearOldLicensedApps++;
      }
    });

    unlicensedAppsCreationDates.forEach(function (creationDate: number) {
      var date = new Date(0);
      date.setMilliseconds(creationDate);
      if (Utilities.monthsDiff(date, currentDate) < 12) {
        months[date.getMonth()][2]++;
      } else {
        console.log(date);
        yearOldUnlicensedApps++;
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
      }else if (index == 0){
        this[0][1] += yearOldUnlicensedApps;
        this[0][2] += yearOldUnlicensedApps;
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