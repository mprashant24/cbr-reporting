import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  @Input() public title: string = "Default Title";
  @Input() public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    },
    legend: {
      display: true
    }
  };

  @Input() public barChartLabels = [];
  @Input() public chartType = 'horizontalBar';
  @Input() public barChartLegend = true;
  @Input() public barChartData = [];

  ngOnInit(): void {
  }

  setLabels(lables: string[]): void {
    this.barChartLabels = lables;
  }

  displayLegend(enable: boolean): void {
    this.barChartLegend = enable;
  }

  addSeries(labelText: string, values: number[]): void {
    this.barChartData.push({ label: labelText, data: values });
  }
}
