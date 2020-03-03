import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() public title:string = "Default Title";
  @Input() public lineChartData: ChartDataSets[] = [];
  @Input() public lineChartLabels: Label[] = [];
  @Input() public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input() public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(51, 255, 173)',
      backgroundColor: 'rgba(51, 255, 173,0.3)',
    },
    {
      borderColor: 'rgb(255, 77, 77)',
      backgroundColor: 'rgba(51, 255, 173,0.3)',
    },
  ];
  @Input() public lineChartLegend = true;
  @Input() public chartType = 'line';
  @Input() public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

  public setLineChartLables(labels:string[]):void{
    this.lineChartLabels = labels;
  }

  public addSeries(dataArray:number[], labelText:string, backGroundFill:boolean){
    this.lineChartData.push({data : dataArray, label: labelText, fill:backGroundFill});
  }

  public setLineColors(colors: Color[]):void{
    this.lineChartColors = colors;
  }

  public setTitle(text:string): void{
    this.title = text;
  }

}
