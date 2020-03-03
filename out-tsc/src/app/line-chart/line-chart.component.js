import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let LineChartComponent = class LineChartComponent {
    constructor() {
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', fill: false },
            { data: [0, 9, 13, 43, 76, 100, 100], label: 'Series B', fill: false },
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartOptions = {
            responsive: true,
        };
        this.lineChartColors = [
            {
                borderColor: 'black',
                backgroundColor: 'rgba(255,0,0,0.3)',
            },
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.lineChartPlugins = [];
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], LineChartComponent.prototype, "lineChartData", void 0);
__decorate([
    Input()
], LineChartComponent.prototype, "lineChartLabels", void 0);
__decorate([
    Input()
], LineChartComponent.prototype, "lineChartOptions", void 0);
__decorate([
    Input()
], LineChartComponent.prototype, "lineChartColors", void 0);
__decorate([
    Input()
], LineChartComponent.prototype, "lineChartLegend", void 0);
__decorate([
    Input()
], LineChartComponent.prototype, "lineChartType", void 0);
__decorate([
    Input()
], LineChartComponent.prototype, "lineChartPlugins", void 0);
LineChartComponent = __decorate([
    Component({
        selector: 'line-chart',
        templateUrl: './line-chart.component.html',
        styleUrls: ['./line-chart.component.css']
    })
], LineChartComponent);
export { LineChartComponent };
//# sourceMappingURL=line-chart.component.js.map