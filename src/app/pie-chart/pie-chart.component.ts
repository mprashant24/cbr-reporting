import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() public title: string = "Default Title";
  @Input() public pieChartLabels = [];
  @Input() public pieChartData = [];
  @Input() public chartType = 'pie';
  constructor() { }

  public setLabels(labels: string[]): void {
    this.pieChartLabels = labels;
  }

  public setTitle(arg: string): void {
    this.title = arg;
  }

  public setChartData(data: number[]): void {
    this.pieChartData = data;
  }

  ngOnInit() {
  }

}
