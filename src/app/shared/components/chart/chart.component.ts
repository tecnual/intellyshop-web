import { AfterViewInit, Component, input, Input } from '@angular/core';
import Chart, { ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js/auto';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html'
})
export class ChartComponent implements AfterViewInit {

  /**
   * Type of the chart.
   * @group Props
   */
  type = input<'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | undefined>();

  options: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      },
    }
  }
  data2 = [
  {
    x: '2024-11-08',
    y: 2.1
  },
  {
    x: '2024-11-15',
    y: 2.1
  },
  {
    x: '2024-11-22',
    y: 1.8
  },
  {
    x: '2024-06-04',
    y: 2.4
  },
  {
    x: '2024-12-18',
    y: 2.8
  }
  ]
  data = input<{ x: string, y: number }[]>();

  chart: Chart;


  public chartType: keyof ChartTypeRegistry = 'line';

  ngAfterViewInit(): void {
    console.log('Data: ', this.data);
    const chartData: ChartData<'line'> = {
      labels: this.data().map(row => row.x),
      datasets: [
        {
          label: 'Acquisitions by year',
          data: this.data().map(row => row.y),
          tension: 0.4
        }
      ],
    }
    console.log('chartData: ', chartData);

    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx:any = canvas.getContext('2d');

    this.chart = new Chart(
     ctx, {
        type: this.type(),
        data: chartData,
        options: this.options
      }
    );
  }
}
