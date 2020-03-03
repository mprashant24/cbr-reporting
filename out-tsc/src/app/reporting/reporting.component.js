import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
let ReportingComponent = class ReportingComponent {
    constructor(dialog, contrastService) {
        this.dialog = dialog;
        this.contrastService = contrastService;
        this.isGeneratingReport = false;
        this.charts = [];
    }
    ngOnInit() {
    }
    openDialog() {
        const dialogRef = this.dialog.open(ConnectionDialog, {
            width: '500px',
            data: { url: this.url, orgId: this.orgId, username: this.username, apiKey: this.apiKey, serviceKey: this.serviceKey }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.isGeneratingReport = true;
            this.generateReport();
            this.charts.push(new BarChartComponent());
        });
    }
    generateReport() {
        this.buildAppOnBoardingTrends();
    }
    buildAppOnBoardingTrends() {
        var appData = this.contrastService.getApplicationForOrg("license");
        console.log(appData);
    }
};
ReportingComponent = __decorate([
    Component({
        selector: 'app-reporting',
        templateUrl: './reporting.component.html',
        styleUrls: ['./reporting.component.css']
    })
], ReportingComponent);
export { ReportingComponent };
let ConnectionDialog = class ConnectionDialog {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    onGenerateReport() {
        console.log(this.data);
        this.dialogRef.close();
    }
};
ConnectionDialog = __decorate([
    Component({
        selector: 'connection-dialog',
        templateUrl: 'connection-dialog.html',
        styleUrls: ['./connection-dialog.css']
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], ConnectionDialog);
export { ConnectionDialog };
//# sourceMappingURL=reporting.component.js.map