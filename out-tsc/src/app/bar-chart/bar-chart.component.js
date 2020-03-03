import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let BarChartComponent = class BarChartComponent {
    constructor() {
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
    }
    ngOnInit() {
    }
    setLabels(lables) {
        this.barChartLabels = lables;
    }
    setChartType(chartType) {
        this.barChartType = chartType;
    }
    displayLegend(enable) {
        this.barChartLegend = enable;
    }
    setChartData(chartData) {
        this.barChartData = chartData;
    }
};
__decorate([
    Input()
], BarChartComponent.prototype, "barChartOptions", void 0);
__decorate([
    Input()
], BarChartComponent.prototype, "barChartLabels", void 0);
__decorate([
    Input()
], BarChartComponent.prototype, "barChartType", void 0);
__decorate([
    Input()
], BarChartComponent.prototype, "barChartLegend", void 0);
__decorate([
    Input()
], BarChartComponent.prototype, "barChartData", void 0);
BarChartComponent = __decorate([
    Component({
        selector: 'bar-chart',
        templateUrl: './bar-chart.component.html',
        styleUrls: ['./bar-chart.component.css']
    })
], BarChartComponent);
export { BarChartComponent };
//# sourceMappingURL=bar-chart.component.js.map